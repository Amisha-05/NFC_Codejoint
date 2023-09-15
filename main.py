# from flask import Flask, request
# from flask_sqlalchemy import SQLAlchemy
# import os, sqlite3
# from flask_restx import Api, Resource
# from forms import RegistrationForm, LoginForm
# from flask_cors import CORS, cross_origin


# basedir= os.path.abspath(os.path.dirname(__file__))

# app=Flask(__name__)
# app.config['SECRET_KEY']=""
# app.config['SQLALCHEMY_DATABASE_URI'] =\
#         'sqlite:///' + os.path.join(basedir, 'database.db')

# CORS(app, supports_credentials=True)

# db=SQLAlchemy(app)

# api = Api(app, doc='/docs')

# def get_db_connection():
#     conn = sqlite3.connect('database1.db')
#     conn.row_factory = sqlite3.Row
#     return conn

# # @app.post("/login")
# # def add_data():
# #     new_data = request.get_json()
# #     conn = get_db_connection()
# #     var = new_data["user"]
# #     print(var)
# #     users = conn.execute("SELECT * FROM suser WHERE sname = ?",(var,)).fetchone()
# #     if users == None:
# #             return{"message":"no user found"}
# #     else:
# #             # hash the password-field data and then compare it with hashed version stored 
# #             if users['passw'] == (new_data['pass']):
# #                 return{"message": "true data. redirecting to home page?"}
# #             else:
# #                 return{"message": "wrong data!!"}

# @app.route("/login", methods=["POST"])
# def login_user():
#     email = request.json["email"]
#     password = request.json["password"]
  
#     user = User.query.filter_by(email=email).first()
  
#     if user is None:
#         return jsonify({"error": "Unauthorized Access"}), 401
  
#     if not bcrypt.check_password_hash(user.password, password):
#         return jsonify({"error": "Unauthorized"}), 401
      
#     session["user_id"] = user.id
  
#     return jsonify({
#         "id": user.id,
#         "email": user.email
#     })
 

# @app.route('/register', methods=['GET', 'POST' ])
# def register():
#     # form = RegistrationForm()
#     if request.method == 'POST' :
#         new_data = request.get_json()
#         conn = get_db_connection()
#         cur = conn.cursor()
#         nuser = (new_data['username'], new_data['gr_no'], new_data['branch'], new_data['email'], new_data['password'])
#         # take password field data and hash it before storing
#         # put this in try error catch
#         cur.execute("INSERT INTO suser(sname, gr_no, branch, email, passw) VALUES (?, ?, ?, ?, ?)", nuser)
#         conn.commit()
#         conn.close()
         
#         return {"account created for": new_data['username']}
#     return "jingalala not allowed", 405
                

# '''
# @app.post("/data_please")
# def add_data():
#     new_data = request.get_json()
#     data_to_add = {"dict_name": new_data["dict_name"], "data_dictionaries": []}
#     USER.append(data_to_add)
#     return data_to_add, 201
# '''

# '''
# the script for gpt interface
# '''
# if __name__ == "__main__":
#     app.run(debug=True)

#C:\flask_dev\flaskreact\app.py
from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt #pip install Flask-Bcrypt = https://pypi.org/project/Flask-Bcrypt/
from flask_cors import CORS, cross_origin #ModuleNotFoundError: No module named 'flask_cors' = pip install Flask-Cors
from models import db, User
 
app = Flask(__name__)
 
app.config['SECRET_KEY'] = 'cairocoders-ednalan'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'
 
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
  
bcrypt = Bcrypt(app) 
CORS(app, supports_credentials=True)
db.init_app(app)
  
with app.app_context():
    db.create_all()
 
@app.route("/")
def hello_world():
    return "Hello, World!"
 
@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]
 
    user_exists = User.query.filter_by(email=email).first() is not None
 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
     
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
 
    session["user_id"] = new_user.id
 
    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })
 
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
  
    user = User.query.filter_by(email=email).first()
  
    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401
  
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
      
    session["user_id"] = user.id
  
    return jsonify({
        "id": user.id,
        "email": user.email
    })
 
if __name__ == "__main__":
    app.run(debug=True)