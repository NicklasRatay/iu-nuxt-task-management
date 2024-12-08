BEGIN;

SELECT plan(23);

SELECT has_table('public', 'task_status', 'Task_Status table exists');

SELECT has_column('public', 'task_status', 'id', 'id column exists');
SELECT col_type_is('public', 'task_status', 'id', 'bigint', 'id column is of type bigint');
SELECT col_not_null('public', 'task_status', 'id', 'id column is not null');
SELECT col_is_pk('public', 'task_status', 'id', 'id column is pk');

SELECT has_column('public', 'task_status', 'name', 'name column exists');
SELECT col_type_is('public', 'task_status', 'name', 'text', 'name column is of type text');
SELECT col_not_null('public', 'task_status', 'name', 'name column is not null');
SELECT col_is_unique('public', 'task_status', 'name', 'name column is unique');

SELECT test_audit_columns('public', 'task_status');

SELECT * FROM finish();

ROLLBACK;