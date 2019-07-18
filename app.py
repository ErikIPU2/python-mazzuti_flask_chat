from flask import Flask, request, session, redirect, url_for, render_template, jsonify
from database.Database import Database

app = Flask(__name__)

app.secret_key = "BAZINGA"

db = Database()


@app.route('/')
def index():
    if 'loggedin' in session:
        return redirect(url_for('chat'))
    else:
        return redirect(url_for('login'))


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

            return redirect(url_for('chat'))
        else:
            msg = "Usuario não encontrado"

    return render_template('Login.html', error_msg=msg)


@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)

    return redirect(url_for('login'))


@app.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    msg = ''

    if request.method == 'POST':
        if 'username' in request.form and 'password' in request.form:
            username = request.form['username']
            password = request.form['password']

            account = db.get_user(username)

            print(account)

            if account:
                msg = "Nome de usuario já existente"
            else:
                db.add_user(username, password)
                msg = 'Você se cadastrou com sucesso'
        else:
            msg = 'Digite todos os campos'

    return render_template('Cadastro.html', error_msg=msg)


@app.route('/chat')
def chat():
    if 'loggedin' in session:
        account = {
            'id': session['id'],
            'username': session['username']
        }
        rooms = db.get_user_rooms(account['id'])
        return render_template('Chat.html', account=account, rooms=rooms)
    else:
        return redirect(url_for('login'))


@app.route('/rooms')
def get_rooms():
    rooms = db.get_user_rooms(session['id'])
    return jsonify(rooms)


if __name__ == '__main__':
    app.run()
