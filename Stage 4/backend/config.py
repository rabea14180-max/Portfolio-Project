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

    # --- Database (Supabase Postgres, via SQLAlchemy) ---
    # DATABASE_URL comes from Supabase → Settings → Database → Connection
    # string → URI. Uses the 6543 transaction pooler.
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        # Supabase's transaction pooler (pgbouncer) already pools connections,
        # so SQLAlchemy shouldn't hold its own idle pool on top of it.
        "pool_size": 5,
        "max_overflow": 0,
        "pool_recycle": 280,
    }


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
