from flask import Flask, request, session, redirect, url_for, render_template
from database.Database import Database

app = Flask(__name__)

app.secret_key = "BAZINGA"

db = Database()


@app.route('/')
def index():
    return "<h1>OI</h1>"


@app.route('/login', methods=['GET', 'POST'])
def login():
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']

        account = db.get_user(username, password)

        if account:
            session['loggedin'] = True
            session['id'] = account['id']
            session['username'] = account['username']

            return "ESSA POG FUNCIONOU"
        else:
            msg = "Usuario não encontrado"

    return render_template('Login.html', error_msg=msg)


@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)

    return redirect(url_for('login'))


@app.route('/cadastro')
def cadastro():
    return render_template('Cadastro.html')


@app.route('/chat')
def chat():
    return render_template('Chat.html')


if __name__ == '__main__':
    app.run()
