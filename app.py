from flask import Flask, request, session, redirect, url_for, render_template, jsonify
from database.Database import Database
from flask_socketio import SocketIO

app = Flask(__name__)

app.secret_key = "BAZINGA"

# Database() = Database()
socketio = SocketIO(app)

@app.route('/')
def home():
    return render_template('Index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    msg = ''
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if username and password:

            account = Database().get_user(username, password)

            if account:
                session['loggedin'] = True
                session['id'] = account['id']
                session['username'] = account['username']

                return redirect(url_for('chat'))
            else:
                msg = "Usuario não encontrado"
        else:
            msg = "Digite todos os campos"

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
        username = request.form['username']
        password = request.form['password']

        if username and password:

            account = Database().get_user(username)

            if account:
                msg = "Nome de usuario já existente"
            else:
                Database().add_user(username, password)
                msg = 'Você se cadastrou com sucesso'
                return render_template('Login.html', error_msg=msg)
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
        rooms = Database().get_user_rooms(account['id'])
        return render_template('Chat.html', account=account)
    else:
        return redirect(url_for('login'))


@app.route('/rooms')
def get_rooms():
    rooms = Database().get_user_rooms(session['id'])
    return jsonify(rooms)


@app.route('/message/<room_id>')
def get_message(room_id):
    if not 'loggedin' in session:
        message = {
            'status': False,
            'message': "Voce precisa estar autenticado para fazer isso"
        }
    elif not check_if_user_is_participant_of_group(session['id'], room_id):
        message = {
            'status': False,
            'message': "Voce nao participa desse grupo"
        }
    else:
        message = {
            'status': True,
            'room_id': room_id,
            'messages': []
        }
        users = Database().get_users()
        messages_raw = Database().get_user_messages(room_id)

        for _message in messages_raw:
            message['messages'].append({
                'id': _message['id'],
                'message': _message['message'],
                'username': find_user_name_by_id(_message['user_id'], users),
                'user_id': _message['user_id']
            })
    return jsonify(message)


@app.route('/create_room', methods=['POST'])
def create_room():
    if not 'loggedin' in session:
        return jsonify({'status': False, 'message': "Voce precisa estar autenticado para fazer isso"})
    elif 'name' in request.form:
        name = request.form['name']
        room_id = Database().add_room(name)
        Database().add_participant(room_id, session['id'])
        return jsonify({'status': True})
    else:
        return jsonify({'status': False})


@app.route('/delete_room', methods=['POST'])
def delete_room():
    if 'room_id' in request.form:
        room_id = request.form['room_id']
        Database().delete_room(room_id)
        return jsonify({'status': True})
    else:
        return jsonify({'status': False})


@app.route('/add_participant', methods=['POST'])
def add_participant():

    room_id = request.form['room_id']
    user_id = request.form['user_id']

    if room_id and user_id:
        Database().add_participant(room_id, user_id)
        return jsonify({'status': True})

    else:
        return jsonify({'status': False})


@app.route('/remove_participant', methods=['POST'])
def remove_participant():
    room_id = request.form['room_id']
    user_id = request.form['user_id']

    if room_id and user_id:
        Database().remove_participant(room_id, user_id)
        return jsonify({'status': True})
    else:
        return jsonify({'status': False})


@app.route('/send', methods=['POST'])
def send_message():
    room_id = request.form['room_id']
    message = request.form['message']

    if room_id and message:

        Database().send_message(room_id, session['id'], message)
        socketio.emit('nm', {'room_id': room_id})
        return jsonify({'status': True})

    else:
        return jsonify({'status': False})


@app.route('/get_participants_users/<room_id>')
def get_participants_users(room_id):
    participants = Database().get_participants(room_id)
    users = Database().get_users()
    for participant in participants:
        participant['username'] = find_user_name_by_id(participant['user_id'], users)
        participant['id'] = participant['user_id']
        del participant['room_id']
        del participant['user_id']
    return jsonify({'status': True, 'participants': participants})


@app.route('/get_not_participant_users/<room_id>')
def get_not_participant_users(room_id):
    participants = Database().get_not_participant_users(room_id)
    for participan in participants:
        del participan['password']
    return jsonify({'status': True, 'participants': participants})


def find_user_name_by_id(user_id, users):
    for user in users:
        if user['id'] == user_id:
            return user['username']
    return None


def check_if_user_is_participant_of_group(user_id, room_id):
    rooms = Database().get_user_rooms(user_id)
    for room in rooms:
        if int(room['id']) == int(room_id):
            return True
    return False


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')
