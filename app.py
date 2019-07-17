from flask import Flask
from flask import render_template
from database.Database import Database

app = Flask(__name__)
db = Database()


@app.route('/')
def index():
    return "<h1>OI</h1>"

@app.route('/login')
def login():
    return render_template('Login.html')


@app.route('/cadastro')
def cadastro():
    return render_template('Cadastro.html')


@app.route('/chat')
def chat():
    return render_template('Chat.html')


if __name__ == '__main__':
    app.run()
