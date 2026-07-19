import os

from flask import Flask, jsonify
from flask_cors import CORS
from flask_mail import Mail

from config import config_by_name
from models import db
from routes import api, auth, users_bp, dashboard_bp


def create_app(env="development"):
    app = Flask(__name__)
    app.config.from_object(config_by_name[env])

    # --- Extensions ---
    db.init_app(app)
    Mail(app)  # registers itself in app.extensions["mail"], used in routes.py
    CORS(app)  # allows the frontend (served separately) to call the API

    # --- Routes ---
    app.register_blueprint(api)
    app.register_blueprint(auth)
    app.register_blueprint(users_bp)
    app.register_blueprint(dashboard_bp)

    @app.route("/api/health", methods=["GET"])
    def health_check():
        return jsonify({"success": True, "message": "FlexSight API is running"}), 200

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"success": False, "message": "Resource not found"}), 404

    @app.errorhandler(500)
    def server_error(error):
        return jsonify({"success": False, "message": "Internal server error"}), 500

    return app


app = create_app(os.getenv("FLASK_ENV", "production"))

if __name__ == "__main__":
    with app.app_context():
        # Creates any tables defined in models.py that don't exist yet.
        # The core schema should still be created via database/schema.sql.
        db.create_all()

    app.run(host="0.0.0.0", port=5000, debug=app.config["DEBUG"])
