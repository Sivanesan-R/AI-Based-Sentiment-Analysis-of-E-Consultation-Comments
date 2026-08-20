# SAMIKSHA – Sentiment Analysis of E-Consultation Comments

## 📌 Problem Statement
**ID:** 25035  
**Title:** Sentiment analysis of comments received through E-consultation module  
**Theme:** Miscellaneous  
**Team ID:** VJITIH-15  
**Team Name:** SAMIKSHA  

----

## 💡 Proposed Solution
We aim to build a **modular, multi-tier web application** for analyzing feedback comments.  
The key features include:

- Process comments individually or in bulk (via file uploads).  
- Classify comments into **Positive, Negative, or Neutral** sentiment.  
- Extract keywords, topics, and entities from feedback.  
- Summarize long comments into concise summaries.  
- Provide a **web-based dashboard** for real-time visualization.  

----

## ⚙️ Technical Approach
- **Backend:** Python, Flask API  
- **AI/ML:** Scikit-learn, NLTK, Transformers (NLP models)  
- **Frontend:** React.js, TailwindCSS  
- **Visualization:** Matplotlib, WordCloud  
- **Deployment:** Vercel  

----

## ✅ Feasibility & Challenges
1. **Misunderstood comments** → Sarcasm/complex language can confuse AI.  
2. **Badly written comments** → Poor input reduces accuracy.  
3. **AI dependency** → May miss important insights.  
4. **Setup time** → Requires effort to train models initially.  

----

## 🌍 Impact & Benefits
- ⏳ **Saves Time:** Handles thousands of comments quickly.  
- ⚖️ **Fair & Consistent:** AI removes personal bias.  
- 🔎 **Easy Insights:** Word clouds highlight key issues.  
- ✂️ **Quick Summaries:** Long inputs → concise insights.  
- 📊 **Scalable:** Works efficiently even with huge volumes of data.  

----

## 📊 Dataset & References
- **Dataset:** [Twitter Entity Sentiment Analysis – Kaggle](https://www.kaggle.com/datasets/jp797498e/twitter-entity-sentiment-analysis)  
- **Twitter API Docs:** [X API Docs](https://developer.x.com/en/docs/x-api)  
- **Scikit-learn Docs:** [v1.7 Release](https://scikit-learn.org/stable/whats_new/v1.7.html)  
- **NLTK Installation:** [NLTK Docs](https://www.nltk.org/install.html)  
- **Research Paper:** [Sentiment Analysis in Social Media Using Deep Learning](https://ijisae.org/index.php/IJISAE/article/view/5557)  

----

## 🚀 How to Run

### Backend (Flask)
```bash
cd backend
pip install -r requirements.txt
python App.py
```

### Frontend (React)
```bash
cd client
npm install
npm run dev
```

On this Windows setup, you can also run the project with the included launch files:

```bash
run-backend.bat
run-frontend.bat
```

Open the frontend at:

```bash
http://127.0.0.1:5173
```

The React app sends requests to Flask through the Vite proxy at `/api/analyze`.

----

## 👥 Team – SAMIKSHA
- Team ID: VJITIH-15  
- Contribution: AI/ML, Web Development, Data Analysis  
