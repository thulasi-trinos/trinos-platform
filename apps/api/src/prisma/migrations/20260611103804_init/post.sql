-- Post-migration SQL — report field-length CHECK constraints (PRD §5).
--
-- NOTE: these statements are ALSO embedded at the end of migration.sql, which is
-- the authoritative, auto-applied source (Prisma runs migration.sql; it does not
-- run post.sql). This file is kept as a standalone, human-readable record of the
-- raw constraints and is NOT meant to be executed separately against a DB that
-- already ran migration.sql (the ADD CONSTRAINT calls would fail as duplicates).
--
--   field 1 (fieldDidToday) — mandatory, min 20 chars after trim
--   field 2 (fieldNext)     — mandatory, min 10 chars after trim
--   field 3 (fieldBlockers) — mandatory, "None" if no blockers (min 1 char)

ALTER TABLE "reports" ADD CONSTRAINT "reports_fieldDidToday_minlen_chk" CHECK (char_length(btrim("fieldDidToday")) >= 20);
ALTER TABLE "reports" ADD CONSTRAINT "reports_fieldNext_minlen_chk"     CHECK (char_length(btrim("fieldNext"))     >= 10);
ALTER TABLE "reports" ADD CONSTRAINT "reports_fieldBlockers_minlen_chk" CHECK (char_length(btrim("fieldBlockers")) >= 1);
