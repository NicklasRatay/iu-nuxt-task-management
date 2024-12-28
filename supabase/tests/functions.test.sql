BEGIN;

SELECT plan(5);

SELECT has_function('public', 'test_audit_columns', ARRAY['text', 'text'], 'test_audit_columns(text, text) function exists');
SELECT has_function('public', 'populate_audit_columns', ARRAY[NULL], 'populate_audit_columns() function exists');
SELECT has_function('public', 'create_audit_trigger', ARRAY['text', 'text'], 'create_audit_trigger(text, text) function exists');
SELECT has_function('public', 'get_total_project_count', ARRAY[NULL], 'get_total_project_count() function exists');
SELECT has_function('public', 'get_total_task_count', ARRAY[NULL], 'get_total_task_count() function exists');

SELECT * FROM finish();

ROLLBACK;
