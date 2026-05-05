from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from deep_translator import GoogleTranslator
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
# Enable CORS for the deployed frontend URL
frontend_url = os.getenv('FRONTEND_URL', '*')
CORS(app, origins=[frontend_url])

# Database Configuration (Neon PostgreSQL)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Model for Translation History
class Translation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tamil_text = db.Column(db.Text, nullable=False)
    english_text = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'tamil': self.tamil_text,
            'english': self.english_text,
            'timestamp': self.timestamp.isoformat() + 'Z'
        }
@app.route('/health')
def health_check():
    return jsonify({"status": "healthy"}), 200

# Create tables
with app.app_context():
    try:
        db.create_all()
        print("Database tables created successfully")
    except Exception as e:
        print(f"Error creating database tables: {e}")

# Path to ISL assets
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
GIF_DIR = os.path.join(BASE_DIR, 'animations')
LETTER_DIR = os.path.join(BASE_DIR, 'letters')

translator = GoogleTranslator(source='ta', target='en')

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.json
    tamil_text = data.get('text', '')
    if not tamil_text:
        return jsonify({'error': 'No text provided'}), 400
    
    try:
        english_text = translator.translate(tamil_text).lower()
        
        # Save to database if connected
        if app.config['SQLALCHEMY_DATABASE_URI']:
            try:
                new_translation = Translation(tamil_text=tamil_text, english_text=english_text)
                db.session.add(new_translation)
                db.session.commit()
            except Exception as db_err:
                print(f"Database error: {db_err}")
                # Don't fail the translation if database fails
        
        return jsonify({
            'tamil': tamil_text,
            'english': english_text
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/history', methods=['GET'])
def get_history():
    if not app.config['SQLALCHEMY_DATABASE_URI']:
        return jsonify({'error': 'Database not configured'}), 503
    
    try:
        translations = Translation.query.order_by(Translation.timestamp.desc()).limit(50).all()
        return jsonify([t.to_dict() for t in translations])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/history/<int:id>', methods=['DELETE'])
def delete_history(id):
    if not app.config['SQLALCHEMY_DATABASE_URI']:
        return jsonify({'error': 'Database not configured'}), 503
    
    try:
        translation = Translation.query.get(id)
        if not translation:
            return jsonify({'error': 'Translation not found'}), 404
        
        db.session.delete(translation)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Entry deleted'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/assets/gif/<filename>')
def serve_gif(filename):
    return send_from_directory(GIF_DIR, filename)

@app.route('/assets/letter/<filename>')
def serve_letter(filename):
    return send_from_directory(LETTER_DIR, filename)

@app.route('/check-asset/<type>/<name>')
def check_asset(type, name):
    if type == 'gif':
        path = os.path.join(GIF_DIR, f"{name}.gif")
        exists = os.path.exists(path)
        return jsonify({'exists': exists, 'url': f"/assets/gif/{name}.gif" if exists else None})
    elif type == 'letter':
        path = os.path.join(LETTER_DIR, f"{name}.jpg")
        exists = os.path.exists(path)
        return jsonify({'exists': exists, 'url': f"/assets/letter/{name}.jpg" if exists else None})
    return jsonify({'error': 'Invalid type'}), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
