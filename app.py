from flask import Flask, request, session, redirect, url_for, render_template, jsonify
from database.Database import Database

app = Flask(__name__)

app.secret_key = "BAZINGA"

db = Database()


@app.route('/')
def home():
    return render_template('Index.html')


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


@app.route('/message/<room_id>')
def get_message(room_id):
    message = db.get_user_messages(room_id)
    return jsonify(message)


@app.route('/create_room', methods=['POST'])
def create_room():
    if request.method == "POST" and 'name' in request.form:
        db.add_room(request.form['name'])
        return jsonify({'status': True})
    else:
        return jsonify({'status': False})


@app.route('/add_participant', methods=['POST'])
def add_participant():
    if request.method == "POST" and 'room_id' in request.form and 'user_id' in request.form:
        room_id = request.form['room_id']
        user_id = request.form['user_id']

        db.add_participant(room_id, user_id)
        return jsonify({'status': True})

    else:
        return jsonify({'status': False})


@app.route('/send', methods=['POST'])
def send_message():
    if request.method == "POST" and 'room_id' in request.form and 'user_id' in request.form and 'message' in request.form:
        room_id = request.form['room_id']
        user_id = request.form['user_id']
        message = request.form['message']

        db.send_message(room_id, user_id, message)
        return jsonify({'status': True})

    else:
        return jsonify({'status': False})


if __name__ == '__main__':
    app.run()
