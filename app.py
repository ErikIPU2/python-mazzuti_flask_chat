from flask import Flask
from flask import render_template

app = Flask(__name__)


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
