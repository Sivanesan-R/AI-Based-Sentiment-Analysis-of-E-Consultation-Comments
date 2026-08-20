import base64
import io
import os
from collections import Counter
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from wordcloud import WordCloud
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS

BASE_DIR = Path(__file__).resolve().parent

# --------------------
# Load pre-trained model & vectorizer
# --------------------
model = joblib.load(BASE_DIR / "Models" / "SentimentAnalyser.pkl")
vectorizer = joblib.load(BASE_DIR / "Models" / "Vectorizor.pkl")

# --------------------
# Summarizer
# --------------------
tokenizer = None
summarizer = None

try:
    from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

    SUMM_MODEL = "google/mt5-small"
    tokenizer = AutoTokenizer.from_pretrained(SUMM_MODEL, local_files_only=True)
    summarizer = AutoModelForSeq2SeqLM.from_pretrained(SUMM_MODEL, local_files_only=True)
except Exception as exc:
    print(f"Transformer summarizer unavailable, using fallback summaries: {exc}")

def generate_summary(text, task="summarize: "):
    if not text.strip():
        return ""
    if tokenizer is None or summarizer is None:
        return text.strip()[:220]
    inputs = tokenizer(task + text, return_tensors="pt", truncation=True)
    outputs = summarizer.generate(
        **inputs, max_length=100, min_length=10, num_beams=4, early_stopping=True
    )
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

# --------------------
# Helper to convert figure to base64
# --------------------
def fig_to_base64(fig):
    buf = io.BytesIO()
    fig.savefig(buf, format="png", bbox_inches='tight')
    buf.seek(0)
    return base64.b64encode(buf.getvalue()).decode('utf-8')

# --------------------
# Flask API
# --------------------
app = Flask(__name__)
allowed_origins = os.environ.get("CORS_ORIGINS", "*")
CORS(app, origins=allowed_origins if allowed_origins == "*" else allowed_origins.split(","))

@app.route("/", methods=["GET"])
def main():
    return jsonify({"status":200,"msg":"api is live"})

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    if not data or "comments" not in data:
        return jsonify({"error": "Provide 'comments' in JSON"}), 400
    
    comments = [str(comment).strip() for comment in data["comments"] if str(comment).strip()]

    if not comments:
        return jsonify({"error": "Provide at least one non-empty comment"}), 400
    
    # --------------------
    # Sentiment Prediction
    # --------------------
    vec = vectorizer.transform(comments)
    preds = model.predict(vec)
    
    results = []
    for i, text in enumerate(comments):
        label = {1:'Positive', 2:'Neutral', 0:'Negative', 3:'Irrelevant'}.get(preds[i], 'Unknown')
        summary = generate_summary(text)
        results.append({
            "comment": text,
            "sentiment": label,
            "summary": summary
        })
    
    # --------------------
    # Dynamic Wordcloud
    # --------------------
    wc_text = " ".join(comments)
    wc = WordCloud(width=800, height=400, background_color="white").generate(wc_text)
    fig_wc = plt.figure(figsize=(8,6))
    plt.imshow(wc, interpolation="bilinear")
    plt.axis("off")
    wordcloud_b64 = fig_to_base64(fig_wc)
    plt.close(fig_wc)
    
    # --------------------
    # Dynamic Bar Graph
    # --------------------
    label_map = {1:'Positive', 2:'Neutral', 0:'Negative', 3:'Irrelevant'}
    sentiment_counts = Counter(label_map.get(pred, 'Unknown') for pred in preds)
    fig_bar = plt.figure(figsize=(6,4))
    plt.bar(sentiment_counts.keys(), sentiment_counts.values(), color=["orange", "blue", "green", "red"])
    plt.title("Sentiment Distribution")
    plt.xlabel("Sentiment")
    plt.ylabel("Count")
    bar_b64 = fig_to_base64(fig_bar)
    plt.close(fig_bar)
    
    # --------------------
    # Dynamic Confusion Matrix (optional)
    # --------------------
    cm_b64 = None
    if "true_labels" in data:
        y_true = [ { "positive":1,"negative":0,"irrelevant":2 }[l] for l in data["true_labels"] ]
        from sklearn.metrics import confusion_matrix
        cm = confusion_matrix(y_true, preds)
        fig_cm = plt.figure(figsize=(5,4))
        plt.imshow(cm, cmap="Blues")
        plt.title("Confusion Matrix")
        plt.colorbar()
        cm_b64 = fig_to_base64(fig_cm)
        plt.close(fig_cm)
    
    response = {
        "results": results,
        "graphs": {
            "wordcloud": wordcloud_b64,
            "bar_graph": bar_b64,
            "confusion_matrix": cm_b64
        }
    }
    
    return jsonify(response)

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=os.environ.get("FLASK_DEBUG", "false").lower() == "true",
    )
