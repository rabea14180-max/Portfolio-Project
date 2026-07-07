-- Multi-tenant dashboard migration for FlexSight.
-- Target: Supabase Postgres. No migration tool (Alembic/Flask-Migrate) is used
-- in this project, so this script is meant to be run by hand in the Supabase
-- SQL editor, in two steps, with `python seed_db.py` run in between.
--
-- Step 1 below is safe to run against a database that already has rows in it:
-- every new column is added as nullable, so existing rows are not touched.
-- Step 2 tightens the new columns to NOT NULL and must only be run after
-- `seed_db.py` has repopulated embedded_devices / alerts / threshold_configs /
-- notifications with a dashboard_id on every row (seed_db.py deletes and
-- re-inserts all rows in those tables, so this is the easiest way to backfill).

-- ---------------------------------------------------------------------------
-- Step 1: add the new dashboard-scoping columns
-- ---------------------------------------------------------------------------

ALTER TABLE dashboards RENAME COLUMN current_user_id TO owner_id;
ALTER TABLE dashboards ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE dashboards ADD CONSTRAINT dashboards_owner_id_unique UNIQUE (owner_id);

-- Stays nullable permanently: an Owner row is inserted before its Dashboard
-- exists (the Dashboard needs the Owner's user_id first), so the app sets
-- this in a follow-up UPDATE within the same transaction.
ALTER TABLE users ADD COLUMN dashboard_id INTEGER REFERENCES dashboards(dashboard_id);

ALTER TABLE embedded_devices ADD COLUMN dashboard_id INTEGER REFERENCES dashboards(dashboard_id);
ALTER TABLE alerts ADD COLUMN dashboard_id INTEGER REFERENCES dashboards(dashboard_id);
ALTER TABLE threshold_configs ADD COLUMN dashboard_id INTEGER REFERENCES dashboards(dashboard_id);
ALTER TABLE notifications ADD COLUMN dashboard_id INTEGER REFERENCES dashboards(dashboard_id);

-- ---------------------------------------------------------------------------
-- Step 2: run `python seed_db.py` now, then run the statements below.
-- ---------------------------------------------------------------------------

ALTER TABLE embedded_devices ALTER COLUMN dashboard_id SET NOT NULL;
ALTER TABLE alerts ALTER COLUMN dashboard_id SET NOT NULL;
ALTER TABLE threshold_configs ALTER COLUMN dashboard_id SET NOT NULL;
ALTER TABLE notifications ALTER COLUMN dashboard_id SET NOT NULL;
