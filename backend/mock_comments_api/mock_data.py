import sqlite3

conn = sqlite3.connect('posts.db')
cursor = conn.cursor()

cursor.executescript("""
INSERT INTO users (username, password) VALUES ('user1', 'pass123');
INSERT INTO users (username, password) VALUES ('user2', 'pass456');
INSERT INTO users (username, password) VALUES ('admin', 'adminpass');

INSERT INTO posts (title, sub_text, link, status) VALUES 
('MCA21 Draft Amendment - Annual Filing Deadlines', 'Proposed changes to annual filing deadlines for companies.', 'https://mca.gov.in/draft-amendments/filing-deadlines', 'active'),
('Transparency Enhancements in MCA21', 'Draft amendment focusing on transparency and penalty clauses.', 'https://mca.gov.in/draft-amendments/transparency', 'pending'),
('SMEs Compliance under MCA21', 'New rules affecting small and medium enterprises compliance.', 'https://mca.gov.in/draft-amendments/smes-compliance', 'active'),
('Digital Filing Procedures', 'Amendments introducing e-forms and digital filing mechanisms.', 'https://mca.gov.in/draft-amendments/digital-filing', 'active'),
('Directors Duties and Responsibilities', 'Stricter regulations proposed for directors’ legal obligations.', 'https://mca.gov.in/draft-amendments/directors-duties', 'pending');

INSERT INTO comments (post_id, comment, sentiment) VALUES 
(1, 'The recent draft amendments introduced under MCA21 seem to streamline compliance processes significantly.', 'Positive'),
(1, 'However, some of the proposed changes regarding annual filing deadlines could increase the burden on smaller companies.', 'Negative'),
(2, 'MCA21’s new amendments focus heavily on transparency which is a good move.', 'Positive'),
(2, 'I’m concerned about the feasibility of the stricter penalty clauses for non-compliance.', 'Negative'),
(3, 'Startups may face challenges understanding the new timelines.', 'Neutral'),
(3, 'The draft amendments could be tough on small businesses.', 'Negative'),
(4, 'The introduction of e-forms will simplify the filing process.', 'Positive'),
(4, 'There might be digital access issues for smaller firms.', 'Neutral'),
(5, 'The amendments for directors’ duties seem overly stringent.', 'Negative'),
(5, 'Qualified individuals might be discouraged from joining boards.', 'Negative');
""")

conn.commit()
conn.close()
