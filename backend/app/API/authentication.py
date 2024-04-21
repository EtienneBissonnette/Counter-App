from flask import Blueprint, request, jsonify, current_app
from MySQLdb.cursors import DictCursor
import hashlib
import os

login = Blueprint("login", __name__)
authenticate = Blueprint("authenticate", __name__)


@login.route("/login", methods=["POST"])
def handle_login():

    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    username = data.get("username").strip()
    password = data.get("password")

    mysql = current_app.db
    cursor = mysql.connection.cursor(DictCursor)
    cursor.execute("SELECT * FROM users WHERE name = %s", (username,))
    user = cursor.fetchone()

    # check if user exist
    if user:
        try:

            hashpassword = hashlib.pbkdf2_hmac(
                "sha256", password.encode(), user["salt"], 100000
            ).hex()

            # compare passwords
            if not hashpassword == user["hashpassword"]:
                return (
                    jsonify({"user": username, "error": "Password incorrect."}),
                    401,
                )

            # login authentication successful, create and push token to DB and give to user
            token = os.urandom(32).hex()

            cursor.execute(
                "UPDATE users SET token = %s WHERE hashpassword = %s",
                (token, hashpassword),
            )
            mysql.connection.commit()
            cursor.close()

            return (
                jsonify(
                    {
                        "user": username,
                        "token": token,
                        "message": "Successfully authenticated user.",
                    }
                ),
                200,
            )

        except Exception as e:
            return (
                jsonify({"user": username, "error": f"Issue authenticating user: {e}"}),
                500,
            )

    # create new user
    try:
        salt = os.urandom(32)
        hashpassword = hashlib.pbkdf2_hmac(
            "sha256", password.encode(), salt, 100000
        ).hex()
        token = os.urandom(32).hex()

        # create user
        cursor.execute(
            "INSERT INTO users (name, hashpassword, salt, token) VALUES (%s, %s, %s, %s)",
            (username, hashpassword, salt, token),
        )

        # create user count
        cursor.execute(
            "INSERT INTO usercount (name) VALUES (%s)",
            (username,),
        )

        mysql.connection.commit()

        cursor.close()

        return (
            jsonify(
                {
                    "user": username,
                    "token": token,
                    "message": "Successfully created user.",
                }
            ),
            200,
        )

    except Exception as e:

        return (
            jsonify({"user": username, "error": f"Issue trying to create user: {e}"}),
            500,
        )


@authenticate.route("/authenticate", methods=["POST"])
def handle_authenticate():

    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    try:
        token = data.get("token")
        mysql = current_app.db
        cursor = mysql.connection.cursor(DictCursor)
        cursor.execute("SELECT * FROM users WHERE token = %s", (token,))
        user = cursor.fetchone()
        cursor.close()

        # check if user exist
        if not user:
            return (
                jsonify(
                    {
                        "error": "User not authenticated. Invalid session token.",
                    }
                ),
                401,
            )

        return (
            jsonify(
                {
                    "user": user.get("name"),
                    "message": "Successfully authenticated user.",
                }
            ),
            200,
        )

    except Exception as e:
        return jsonify({"error": e})
