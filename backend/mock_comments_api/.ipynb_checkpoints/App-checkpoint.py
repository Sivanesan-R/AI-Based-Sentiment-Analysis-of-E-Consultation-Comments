import sqlite3
import uuid
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DB_NAME = "posts.db"
sessions = {}  # in-memory token store

# --------------------
# Initialize Database
# --------------------
def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # Users table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)
    
    # Posts table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            sub_text TEXT,
            link TEXT,
            status TEXT CHECK(status IN ('pending','active')) NOT NULL DEFAULT 'pending'
        )
    """)
    
    # Comments table (linked to posts)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            post_id INTEGER NOT NULL,
            comment TEXT NOT NULL,
            sentiment TEXT,
            FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
        )
    """)
    
    conn.commit()
    conn.close()

init_db()

# --------------------
# Helpers
# --------------------
def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def require_auth(func):
    """Decorator to enforce fake authentication"""
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token or token not in sessions:
            return jsonify({"error": "Unauthorized"}), 401
        return func(*args, **kwargs)
    wrapper.__name__ = func.__name__
    return wrapper

# --------------------
# Auth Endpoints
# --------------------
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data or "username" not in data or "password" not in data:
        return jsonify({"error": "Provide 'username' and 'password'"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", 
                       (data["username"], data["password"]))
        conn.commit()
        conn.close()
        return jsonify({"msg": "User registered successfully"})
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username already exists"}), 400

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data or "username" not in data or "password" not in data:
        return jsonify({"error": "Provide 'username' and 'password'"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=? AND password=?", 
                   (data["username"], data["password"]))
    user = cursor.fetchone()
    conn.close()

    if user:
        token = str(uuid.uuid4())
        sessions[token] = user["username"]
        return jsonify({"msg": "Login successful", "token": token})
    else:
        return jsonify({"error": "Invalid credentials"}), 401

# --------------------
# Post Endpoints
# --------------------
@app.route("/posts", methods=["POST"])
@require_auth
def add_post():
    data = request.get_json()
    if not data or "title" not in data:
        return jsonify({"error": "Provide 'title' in JSON"}), 400
    
    title = data["title"]
    sub_text = data.get("sub_text", "")
    link = data.get("link", "")
    status = data.get("status", "pending")

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO posts (title, sub_text, link, status) VALUES (?, ?, ?, ?)",
                   (title, sub_text, link, status))
    conn.commit()
    post_id = cursor.lastrowid
    conn.close()

    return jsonify({"id": post_id, "title": title, "sub_text": sub_text, "link": link, "status": status})

@app.route("/posts", methods=["GET"])
@require_auth
def get_posts():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM posts")
    rows = cursor.fetchall()
    conn.close()

    posts = [dict(r) for r in rows]
    return jsonify(posts)

@app.route("/posts/<int:post_id>", methods=["GET"])
@require_auth
def get_post(post_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM posts WHERE id=?", (post_id,))
    post = cursor.fetchone()

    if not post:
        conn.close()
        return jsonify({"error": "Post not found"}), 404

    cursor.execute("SELECT id, comment, sentiment FROM comments WHERE post_id=?", (post_id,))
    comments = [dict(r) for r in cursor.fetchall()]
    conn.close()

    post_data = dict(post)
    post_data["comments"] = comments
    return jsonify(post_data)

# --------------------
# Comment Endpoints
# --------------------
@app.route("/posts/<int:post_id>/comments", methods=["POST"])
@require_auth
def add_comment(post_id):
    data = request.get_json()
    if not data or "comment" not in data:
        return jsonify({"error": "Provide 'comment' in JSON"}), 400

    comment = data["comment"]
    sentiment = data.get("sentiment")

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO comments (post_id, comment, sentiment) VALUES (?, ?, ?)",
                   (post_id, comment, sentiment))
    conn.commit()
    comment_id = cursor.lastrowid
    conn.close()

    return jsonify({"id": comment_id, "post_id": post_id, "comment": comment, "sentiment": sentiment})

@app.route("/posts/<int:post_id>/comments", methods=["GET"])
@require_auth
def get_post_comments(post_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, comment, sentiment FROM comments WHERE post_id=?", (post_id,))
    rows = cursor.fetchall()
    conn.close()

    comments = [dict(r) for r in rows]
    return jsonify(comments)

# --------------------
if __name__ == "__main__":
    app.run(port=5002, debug=True)
