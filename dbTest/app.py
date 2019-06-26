from flask import Flask
from Database import Database

app = Flask(__name__)


@app.route('/')
def hello_world():
    Database().add_user("sla", "123")
    return "Hello world"


if __name__ == '__main__':
    app.run()
