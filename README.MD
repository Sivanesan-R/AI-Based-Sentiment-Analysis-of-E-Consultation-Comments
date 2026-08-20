# AI-Based Sentiment Analysis of E-Consultation Comments

A full-stack web application that performs **AI-powered sentiment analysis** on public consultation and feedback comments. Built with a **Flask** backend, **React.js** frontend, and **NLP/ML models** for intelligent text classification.

---

## 🚀 Features

- **Single & Bulk Analysis** — Analyze comments one at a time or upload files for batch processing.
- **Sentiment Classification** — Classifies each comment as **Positive**, **Negative**, or **Neutral** using trained ML models.
- **Keyword & Topic Extraction** — Automatically identifies key themes, topics, and entities from feedback.
- **Comment Summarization** — Condenses long-form feedback into concise, actionable summaries.
- **Interactive Dashboard** — Real-time charts and word clouds for visual insight into sentiment trends.

---

## 🛠️ Tech Stack

| Layer           | Technology                              |
| --------------- | --------------------------------------- |
| **Backend**     | Python, Flask REST API                  |
| **AI / ML**     | Scikit-learn, NLTK, Transformers        |
| **Frontend**    | React.js, Vite, TailwindCSS            |
| **Visualization** | Matplotlib, WordCloud, Chart.js      |
| **Deployment**  | Vercel (Frontend), Local (Backend)      |

---

## 📁 Project Structure

```
AI-Based-Sentiment-Analysis-of-E-Consultation-Comments/
├── backend/                  # Flask API + ML models
│   ├── App.py                # Main Flask application
│   ├── Model.py              # Sentiment model logic
│   ├── Models/               # Saved/trained model files
│   ├── dataset/              # Training datasets
│   ├── data_processing.ipynb # Data cleaning & preprocessing
│   ├── model.ipynb           # Model training notebook
│   └── requirements.txt     # Python dependencies
├── client/                   # React frontend (Vite)
│   ├── src/                  # React source code
│   ├── public/               # Static assets
│   ├── package.json          # Node dependencies
│   └── vite.config.js        # Vite configuration
├── images/                   # Architecture diagrams
├── README.MD
└── LICENSE
```

---

## ⚡ Getting Started

### Prerequisites

- **Python** 3.9 or higher
- **Node.js** 18 or higher
- **pip** and **npm** installed

### 1. Clone the Repository

```bash
git clone https://github.com/Sivanesan-R/AI-Based-Sentiment-Analysis-of-E-Consultation-Comments.git
cd AI-Based-Sentiment-Analysis-of-E-Consultation-Comments
```

### 2. Setup Backend (Flask API)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate        # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
python App.py
```

The Flask API will start at `http://127.0.0.1:5000`

### 3. Setup Frontend (React)

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

The React app will start at `http://127.0.0.1:5173`

> **Note:** The Vite dev server proxies API requests to Flask via the `/api/analyze` endpoint. Both servers must be running simultaneously.

### 4. Quick Launch (Windows Only)

```bash
run-backend.bat     # Starts Flask server
run-frontend.bat    # Starts React dev server
```

---

## 📊 How It Works

1. **Input** — User submits a comment (or uploads a file with multiple comments).
2. **Processing** — The Flask API preprocesses the text (tokenization, stopword removal, etc.).
3. **Classification** — The trained ML model predicts sentiment (Positive / Negative / Neutral).
4. **Extraction** — Keywords, topics, and named entities are extracted from the text.
5. **Visualization** — Results are displayed on the React dashboard with charts and word clouds.

