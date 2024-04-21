from flask import Blueprint, request, jsonify, current_app
from MySQLdb.cursors import DictCursor

get_count = Blueprint("get_count", __name__)
update_count = Blueprint("update_count", __name__)


@get_count.route("/user/getcount", methods=["POST"])
def handle_get_count():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    try:
        token = data.get("token")
        mysql = current_app.db
        cursor = mysql.connection.cursor(DictCursor)
        cursor.execute("SELECT * FROM users WHERE token = %s", (token,))
        user = cursor.fetchone()

        # check if a user match with provided session token
        if not user:
            return (
                jsonify(
                    {
                        "error": "User not allowed. Invalid session token.",
                    }
                ),
                401,
            )
        # retrieving count for authenticated user
        cursor.execute(
            "SELECT count FROM usercount WHERE name = %s", (user.get("name"),)
        )
        count = cursor.fetchone().get("count")
        cursor.close()

        return (
            jsonify(
                {
                    "count": count,
                    "message": "Successfully authenticated user.",
                }
            ),
            200,
        )

    except Exception as e:
        return jsonify({"error": e}), 500


@update_count.route("/user/count", methods=["POST"])
def handle_update_count():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    try:
        token = data.get("token")
        mysql = current_app.db
        cursor = mysql.connection.cursor(DictCursor)
        cursor.execute("SELECT * FROM users WHERE token = %s", (token,))
        user = cursor.fetchone()

        # check if a user match with provided session token
        if not user:
            return (
                jsonify(
                    {
                        "success": False,
                        "error": "User not allowed. Invalid session token.",
                    }
                ),
                401,
            )

        count = data.get("count")
        cursor.execute(
            "UPDATE usercount SET count = %s WHERE name = %s",
            (count, user.get("name")),
        )
        mysql.connection.commit()
        cursor.close()

        return (
            jsonify(
                {
                    "count": user.get("name"),
                    "message": "Successfully authenticated user.",
                }
            ),
            200,
        )

    except Exception as e:
        return jsonify({"success": False, "error": e})
