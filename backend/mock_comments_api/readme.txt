Got it 👍 You want a simpler **Posts + Comments API** without the `sentiment` field.
I’ll remove it from the database schema, endpoints, and responses.

---

## 📌 `mock_posts_api.py` (sentiment removed)

```python
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
    
    # Comments table (linked to posts) – no sentiment
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            post_id INTEGER NOT NULL,
            comment TEXT NOT NULL,
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

    cursor.execute("SELECT id, comment FROM comments WHERE post_id=?", (post_id,))
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

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO comments (post_id, comment) VALUES (?, ?)",
                   (post_id, comment))
    conn.commit()
    comment_id = cursor.lastrowid
    conn.close()

    return jsonify({"id": comment_id, "post_id": post_id, "comment": comment})

@app.route("/posts/<int:post_id>/comments", methods=["GET"])
@require_auth
def get_post_comments(post_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, comment FROM comments WHERE post_id=?", (post_id,))
    rows = cursor.fetchall()
    conn.close()

    comments = [dict(r) for r in rows]
    return jsonify(comments)

# --------------------
if __name__ == "__main__":
    app.run(port=5002, debug=True)
```

---

## 📌 Example Usage

### 1. Register

```bash
POST http://127.0.0.1:5002/register
{
  "username": "alice",
  "password": "1234"
}
```

### 2. Login

```bash
POST http://127.0.0.1:5002/login
{
  "username": "alice",
  "password": "1234"
}
```

Response:

```json
{
  "msg": "Login successful",
  "token": "a3f5c88d-4e7f-4f3c-9a66-9a8fca12ef45"
}
```

### 3. Create a Post

```bash
POST http://127.0.0.1:5002/posts
Authorization: a3f5c88d-4e7f-4f3c-9a66-9a8fca12ef45

{
  "title": "Draft Amendment on Compliance",
  "sub_text": "Proposed changes to compliance reporting",
  "link": "http://example.com/amendment1",
  "status": "active"
}
```

### 4. Add a Comment

```bash
POST http://127.0.0.1:5002/posts/1/comments
Authorization: a3f5c88d-4e7f-4f3c-9a66-9a8fca12ef45

{
  "comment": "This draft looks solid, but needs more clarity."
}
```

### 5. Get Post with Comments

```bash
GET http://127.0.0.1:5002/posts/1
Authorization: a3f5c88d-4e7f-4f3c-9a66-9a8fca12ef45
```

Response:

```json
{
  "id": 1,
  "title": "Draft Amendment on Compliance",
  "sub_text": "Proposed changes to compliance reporting",
  "link": "http://example.com/amendment1",
  "status": "active",
  "comments": [
    {
      "id": 1,
      "comment": "This draft looks solid, but needs more clarity."
    }
  ]
}
```

---

👉 Do you also want me to add an **"update status" endpoint** so you can easily flip a post between `"pending"` and `"active"`?
