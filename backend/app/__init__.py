from flask import Flask
from flask_cors import CORS
from .database import init_db
from .API.authentication import login, authenticate
from .API.user import get_count, update_count


def init_app():
    app = Flask(__name__)
    CORS(app)

    app.db = init_db(app)

    app.register_blueprint(login)
    app.register_blueprint(authenticate)
    app.register_blueprint(get_count)
    app.register_blueprint(update_count)

    return app
