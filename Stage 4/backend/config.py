import os
from dotenv import load_dotenv

# Load variables from the .env file into the environment
load_dotenv()


class Config:
    """
    Base configuration for the FlexSight Flask application.
    Reads all sensitive values from environment variables (.env),
    never hardcode credentials here.
    """

    # --- Flask ---
    SECRET_KEY = os.getenv("SECRET_KEY", "change-me-in-production")
    DEBUG = os.getenv("FLASK_DEBUG", "False") == "True"

    # --- Database (MySQL) ---
    # These names match the schema created in database/schema.sql
    # (temperature_monitoring_system) and the tables defined in models.py
    DB_USER = os.getenv("DB_USER", "root")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "")
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_PORT = os.getenv("DB_PORT", "3306")
    DB_NAME = os.getenv("DB_NAME", "temperature_monitoring_system")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # --- Email Alerts (used when Alert severity = WARNING / CRITICAL) ---
    MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
    MAIL_USE_TLS = os.getenv("MAIL_USE_TLS", "True") == "True"
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER", MAIL_USERNAME)

    # --- Temperature Thresholds (fallback defaults; real values come from
    # the threshold_configs table, these are only used if the table is empty) ---
    DEFAULT_WARNING_TEMP = float(os.getenv("DEFAULT_WARNING_TEMP", 35.0))
    DEFAULT_CRITICAL_TEMP = float(os.getenv("DEFAULT_CRITICAL_TEMP", 45.0))


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False


config_by_name = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
}
