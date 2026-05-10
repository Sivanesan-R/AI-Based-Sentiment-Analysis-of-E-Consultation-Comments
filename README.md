# AI-Based Sentiment Analysis of E-Consultation Comments

A comprehensive web-based application that uses Artificial Intelligence, Machine Learning, and Natural Language Processing (NLP) to analyze public feedback and complaints from e-consultation platforms. The system intelligently classifies comments as positive, negative, neutral, or irrelevant and provides actionable insights through visual analytics.

## 🎯 Features

- **Sentiment Classification**: Classifies comments into 4 categories:
  - ✅ Positive
  - ❌ Negative
  - ⚪ Neutral
  - 🔄 Irrelevant

- **AI-Powered Text Summarization**: Automatically generates concise summaries of long comments using transformer-based models (MT5)

- **Dynamic Visualizations**:
  - Word Cloud: Visual representation of the most frequent terms in comments
  - Sentiment Distribution Bar Chart: Shows the breakdown of sentiment across all comments
  - Confusion Matrix: Performance evaluation metrics (optional)

- **RESTful API**: Easy-to-use endpoints for sentiment analysis and data management

- **Multi-Source Comment Management**: Mock API for managing posts and comments with authentication

- **Database Integration**: SQLite backend for persistent data storage

## 🛠️ Tech Stack

### Backend
- **Python 3.x**: Core programming language
- **Flask**: Lightweight web framework
- **Flask-CORS**: Cross-Origin Resource Sharing support
- **scikit-learn**: Machine learning library for sentiment classification
- **Transformers (Hugging Face)**: Pre-trained models for text summarization

### Data Processing & Visualization
- **Pandas & NumPy**: Data manipulation and numerical computing
- **Matplotlib**: Visualization library
- **WordCloud**: Word cloud generation
- **Joblib**: Model serialization and loading

### Database
- **SQLite**: Lightweight relational database

## 📋 Requirements

```
flask
flask-cors
joblib
matplotlib
numpy
scikit-learn
wordcloud
transformers (optional, for advanced text summarization)
```

Install dependencies:
```bash
pip install -r requirements.txt
```

## 📁 Project Structure

```
AI-Based-Sentiment-Analysis-of-E-Consultation-Comments/
├── App.py                          # Main sentiment analysis API
├── requirements.txt                # Python dependencies
├── data_processing.ipynb           # Data preprocessing and EDA notebook
├── model.ipynb                     # Model training and evaluation notebook
├── Models/                         # Pre-trained models directory
│   ├── SentimentAnalyser.pkl      # Trained sentiment classifier
│   └── Vectorizor.pkl             # TF-IDF vectorizer
├── client/                         # Frontend client code
├── mock_comments_api/              # Mock API server
│   └── App.py                      # Comment management backend
├── dataset/                        # Training datasets
└── README.md                       # This file
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Sivanesan-R/AI-Based-Sentiment-Analysis-of-E-Consultation-Comments.git
cd AI-Based-Sentiment-Analysis-of-E-Consultation-Comments
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Prepare Pre-trained Models

Ensure the following files are present in the `Models/` directory:
- `SentimentAnalyser.pkl`: Trained sentiment classification model
- `Vectorizor.pkl`: TF-IDF vectorizer for text transformation

*Note: Train these models using the Jupyter notebooks if not already available.*

### 4. Run the Sentiment Analysis API

```bash
python App.py
```

The API will start on `http://127.0.0.1:5000`

### 5. (Optional) Run the Mock Comments API

```bash
python mock_comments_api/App.py
```

The mock API will start on `http://127.0.0.1:5002`

## 📡 API Endpoints

### Sentiment Analysis API

#### 1. Health Check
```http
GET /
```

**Response:**
```json
{
  "status": 200,
  "msg": "api is live"
}
```

#### 2. Analyze Comments
```http
POST /analyze
Content-Type: application/json

{
  "comments": [
    "This service is excellent!",
    "Very disappointed with the response",
    "It's okay, nothing special"
  ],
  "true_labels": ["positive", "negative", "neutral"]  // Optional
}
```

**Response:**
```json
{
  "results": [
    {
      "comment": "This service is excellent!",
      "sentiment": "Positive",
      "summary": "The service received positive feedback."
    },
    {
      "comment": "Very disappointed with the response",
      "sentiment": "Negative",
      "summary": "User expressed disappointment with the response."
    },
    {
      "comment": "It's okay, nothing special",
      "sentiment": "Neutral",
      "summary": "Service is average with mixed experience."
    }
  ],
  "graphs": {
    "wordcloud": "data:image/png;base64,...",
    "bar_graph": "data:image/png;base64,...",
    "confusion_matrix": "data:image/png;base64,..." // Only if true_labels provided
  }
}
```

### Mock Comments API

#### 1. Register User
```http
POST /register
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "password123"
}
```

#### 2. Login
```http
POST /login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "msg": "Login successful",
  "token": "uuid-token-here"
}
```

#### 3. Create Post
```http
POST /posts
Authorization: uuid-token-here
Content-Type: application/json

{
  "title": "E-consultation Request",
  "sub_text": "Feedback on healthcare services",
  "link": "https://example.com/post/1",
  "status": "active"
}
```

#### 4. Get All Posts
```http
GET /posts
Authorization: uuid-token-here
```

#### 5. Get Single Post with Comments
```http
GET /posts/<post_id>
Authorization: uuid-token-here
```

#### 6. Add Comment to Post
```http
POST /posts/<post_id>/comments
Authorization: uuid-token-here
Content-Type: application/json

{
  "comment": "This is my feedback",
  "sentiment": "Positive"
}
```

#### 7. Get Post Comments
```http
GET /posts/<post_id>/comments
Authorization: uuid-token-here
```

## 📊 Model Training

The project includes Jupyter notebooks for model development:

### `data_processing.ipynb`
- Data loading and exploration
- Text cleaning and preprocessing
- Feature engineering
- Train-test split

### `model.ipynb`
- Model training with scikit-learn
- Model evaluation metrics
- Hyperparameter tuning
- Model serialization

## 🔧 Configuration

### Flask Settings
- **Host**: 127.0.0.1 (Sentiment API), 0.0.0.0 (Mock API)
- **Port**: 5000 (Sentiment API), 5002 (Mock API)
- **Debug Mode**: Enabled

### Text Summarization
- **Model**: `google/mt5-small` (MT5 Transformer)
- **Max Length**: 100 tokens
- **Min Length**: 10 tokens

## 🎨 Visualization Outputs

All graphs are returned as base64-encoded PNG images for easy integration into web frontends:

- **Word Cloud**: Shows frequency distribution of terms
- **Bar Graph**: Sentiment count distribution
- **Confusion Matrix**: True vs predicted sentiment labels (optional)

## 📝 Usage Example

### Python Client Example
```python
import requests
import json

# Sentiment Analysis
url = "http://127.0.0.1:5000/analyze"
payload = {
    "comments": [
        "Excellent service and support",
        "Terrible experience",
        "Average service"
    ]
}

response = requests.post(url, json=payload)
results = response.json()

print(json.dumps(results, indent=2))
```

## 🔒 Security Considerations

- **Authentication**: The mock API uses token-based authentication
- **Database**: Plain text passwords (for demo purposes; use hashing in production)
- **Input Validation**: Comments are stripped and validated before processing
- **CORS**: Enabled for cross-origin requests

**⚠️ Note**: This project is for demonstration purposes. For production use:
- Implement proper password hashing (bcrypt)
- Use environment variables for sensitive data
- Add rate limiting and request validation
- Implement proper error handling
- Use HTTPS

## 📈 Performance Metrics

The model evaluation includes:
- Accuracy Score
- Precision, Recall, F1-Score
- Confusion Matrix
- ROC-AUC Curves (from notebooks)

## 🐛 Troubleshooting

### Issue: Model files not found
**Solution**: Ensure `Models/SentimentAnalyser.pkl` and `Models/Vectorizor.pkl` exist in the Models directory.

### Issue: Transformer model unavailable
**Solution**: The app gracefully falls back to simple text truncation if transformers aren't available. Install with:
```bash
pip install transformers torch
```

### Issue: CORS errors
**Solution**: CORS is enabled by default. Ensure requests include proper headers.

### Issue: Database locked
**Solution**: Close any open database connections and restart the mock API.

## 📚 Dataset Structure

The `dataset/` directory should contain CSV or JSON files with the following columns:
- `comment` or `text`: The comment text
- `sentiment`: Label (positive, negative, neutral, irrelevant)
- Additional metadata (optional)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report issues
- Suggest improvements
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source. Check the repository for license details.

## 👨‍💻 Author

**Sivanesan R**
- GitHub: [@Sivanesan-R](https://github.com/Sivanesan-R)

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact via repository discussions

## 🔄 Future Enhancements

- [ ] Multi-language sentiment analysis
- [ ] Real-time comment streaming
- [ ] Advanced NLP features (emotion detection, aspect-based sentiment)
- [ ] Dashboard UI
- [ ] Docker containerization
- [ ] Advanced authentication (OAuth, JWT)
- [ ] API rate limiting
- [ ] Sentiment trend analysis over time

---

**Last Updated**: May 10, 2026

For more information, visit the [GitHub Repository](https://github.com/Sivanesan-R/AI-Based-Sentiment-Analysis-of-E-Consultation-Comments)
