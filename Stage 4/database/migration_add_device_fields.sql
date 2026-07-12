-- Adds device identification fields (name, ip_address, location) to
-- embedded_devices for the Devices feature, and scopes IP uniqueness to
-- (dashboard_id, ip_address) so the same private IP can exist on two
-- different dashboards without conflicting.
--
-- Target: Supabase Postgres - this is what the app actually connects to
-- (see backend/config.py DATABASE_URL and database/migration_multi_tenant.sql),
-- even though database/schema.sql is written in MySQL-style syntax for
-- fresh/offline reference installs. Run this by hand in the Supabase SQL
-- editor (there is no Alembic/Flask-Migrate in this project).
--
-- Safe to run against a database that already has device rows:
--   - All three new columns are added as nullable, so existing rows are
--     left exactly as they are (they will just show blank name/IP/location
--     in the UI until someone edits them - nothing is deleted or renamed).
--   - Postgres treats NULL as distinct from NULL in a UNIQUE constraint, so
--     multiple pre-existing rows with no ip_address yet do not conflict
--     with each other or with the new constraint.
--   - No table is dropped or recreated, no data is deleted.

ALTER TABLE embedded_devices ADD COLUMN IF NOT EXISTS name VARCHAR(100);
ALTER TABLE embedded_devices ADD COLUMN IF NOT EXISTS ip_address VARCHAR(45);
ALTER TABLE embedded_devices ADD COLUMN IF NOT EXISTS location VARCHAR(255);

ALTER TABLE embedded_devices
  ADD CONSTRAINT uq_embedded_devices_dashboard_ip UNIQUE (dashboard_id, ip_address);
