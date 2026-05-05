# 🗣️ TamilSign AI - Speech-to-Sign Language Bridge

**TamilSign AI** is a premium, responsive web application designed to bridge the communication gap for the hearing impaired. It translates live **Tamil Speech** into **Indian Sign Language (ISL)** animations and finger-spelling in real-time.

![TamilSign AI Banner](/backend/signlang.png)

## ✨ Features

- 🎙️ **Real-time Tamil Speech Recognition**: Uses the Web Speech API for high-accuracy Tamil voice capture.
- 🔄 **Smart Translation**: Automatically translates Tamil phrases into English for mapping to the ISL dictionary.
- 🤟 **Dynamic ISL Display**:
  - **Phrase Matching**: Displays specialized GIF animations for recognized whole words or phrases.
  - **Finger-spelling**: Automatically falls back to spelling out words letter-by-letter if a phrase GIF isn't available.
- 📜 **Translation History**: Securely stores your recent translations in a **Neon PostgreSQL** database.
- 🗑️ **History Management**: View, track, and delete your translation history with a clean, minimalist interface.
- 🌓 **Dark & Light Mode**: Premium UI with smooth transitions and glassmorphism aesthetics.
- 📱 **Mobile Optimized**: Fully responsive design tailored for both desktop and mobile users.
- ⏰ **Real-time Clock**: Live local time display in the header for tracking your sessions.

## 🚀 Tech Stack

### Frontend
- **React 18** (Vite)
- **Tailwind CSS** (Modern Styling)
- **Framer Motion** (Smooth Animations)
- **Lucide React** (Beautiful Icons)
- **Axios** (API Requests)

### Backend
- **Flask** (Python Web Framework)
- **SQLAlchemy** (Database ORM)
- **Deep-Translator** (Tamil to English Logic)
- **Neon PostgreSQL** (Cloud Database)

## 📁 Project Structure

```text
TamilSign AI/
├── frontend/                # React + Vite Application
│   ├── src/
│   │   ├── components/      # UI Components (Header, History, etc.)
│   │   └── App.jsx          # Main application logic
│   └── public/              # Static assets (Logo, Favicon)
├── backend/                 # Flask Server
│   ├── server.py            # Main API & Database logic
│   ├── animations/          # ISL Phrase GIF animations
│   ├── letters/             # ISL Alphabet hand-sign images
│   └── .env                 # Environment variables (Database URL)
└── README.md                # Project documentation
```

## 🏗️ System Architecture

The following flowchart illustrates the end-to-end process of **TamilSign AI**, from speech capture to sign language output and persistent history storage.

```mermaid
graph TD
    A[🎤 User Speech - Tamil] --> B[🌐 Web Speech API]
    B --> C[📝 Tamil Text Recognition]
    C --> D[⚙️ Flask Backend API]
    D --> E[🔄 Deep-Translator - ta to en]
    E --> F[🔍 Asset Matching Logic]
    
    F -->|Match Found| G[📽️ ISL Phrase GIF]
    F -->|No Match| H[🖖 Finger-spelling - Letters]
    
    G --> I[🖥️ React Frontend Display]
    H --> I
    
    E --> J[💾 Neon PostgreSQL]
    J --> K[📜 Translation History]
```

## 🛠️ Installation & Setup

### 1. Prerequisites
- **Python 3.8+**
- **Node.js 16+**
- **Neon.tech Account** (for PostgreSQL database)

### 2. Backend Configuration
Navigate to the `backend/` directory:
```bash
cd backend
pip install flask flask-cors flask-sqlalchemy deep-translator python-dotenv
```
Create a `.env` file in the `backend/` folder and add your Neon connection string:
```env
DATABASE_URL=postgresql://user:password@your-neon-host/neondb?sslmode=require
```
Run the server:
```bash
python server.py
```

### 3. Frontend Configuration
Navigate to the `frontend/` directory:
```bash
cd frontend
npm install
npm run dev
```


## 📖 Usage
1. Open your browser to `http://localhost:5173`.
2. Click the **Microphone** icon to start listening.
3. Speak a word in **Tamil** (e.g., "வணக்கம்" - Vanakkam).
4. Watch the **Sign Language Output** section for the animation.
5. Check the **Recent Translations** tab to view your history.

## 🔒 Security
- Database connections are managed via environment variables.
- Translation history is private and can be managed/deleted by the user.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.

---
**Created by Nithyaganesh**
