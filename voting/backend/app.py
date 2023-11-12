from flask import Flask, session, request

app = Flask(__name__)
app.secret_key = "secret ooo"


@app.route('/login')
def login():
    return