BEGIN;

SELECT plan(1);

SELECT has_function('public', 'test_audit_columns', ARRAY['text', 'text'], 'test_audit_columns(text, text) function exists');

SELECT * FROM finish();

ROLLBACK;
