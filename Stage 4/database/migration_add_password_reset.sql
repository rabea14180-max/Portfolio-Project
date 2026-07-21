-- Adds password-reset-token storage to users, for the "forgot password"
-- flow (backend/routes.py: POST /api/auth/forgot-password, POST
-- /api/auth/reset-password).
--
-- Target: Supabase Postgres - this is what the app actually connects to
-- (see backend/config.py DATABASE_URL and database/migration_multi_tenant.sql).
-- Run this by hand in the Supabase SQL editor (there is no Alembic/
-- Flask-Migrate in this project).
--
-- Safe to run against a database that already has user rows:
--   - Both new columns are added as nullable, so existing rows are left
--     exactly as they are (no reset in progress until a user requests one).
--   - No table is dropped or recreated, no data is deleted.
--
-- Only the SHA-256 hash of the reset token is stored, never the raw token
-- (the raw token only ever appears in the emailed link) - so a database
-- leak alone can't be used to reset an account's password.

ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token_hash VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token_expires_at TIMESTAMP;
