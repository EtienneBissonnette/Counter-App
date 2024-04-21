from app import init_app
from dotenv import load_dotenv
import os

if os.environ.get("FLASK_ENV") == "production":
    load_dotenv(".env.prod")
else:
    load_dotenv(".env.dev")

app = init_app()
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port="8081")
