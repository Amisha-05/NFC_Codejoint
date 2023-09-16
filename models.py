#C:\flask_dev\flaskreact\models.py
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
 
db = SQLAlchemy()
 
def get_uuid():
    return uuid4().hex
 
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    username = db.Column(db.String(20), unique=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)

class Teacher(db.Model):
    __tablename__ = "Teacher"
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    name = db.Column(db.String(20))
    email = db.Column(db.String(150), unique=True)
    contact_no = db.Column(db.String(11))
    hospital = db.Column(db.String(20))

class youtube_links(db.Model):
    __Tablename__ = "youtube_links"
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    link = db.Column(db.String(50))
    tags = db.Column(db.String(50))
