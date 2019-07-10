from flask import Flask
from Database import Database

app = Flask(__name__)


@app.route('/')
def hello_world():
    users = Database().list_user()
    return users[0]['name']


if __name__ == '__main__':
    app.run()
