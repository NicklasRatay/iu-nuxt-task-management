BEGIN;

SELECT plan(23);

SELECT has_table('public', 'task_priority', 'Task_Priority table exists');

SELECT has_column('public', 'task_priority', 'id', 'id column exists');
SELECT col_type_is('public', 'task_priority', 'id', 'bigint', 'id column is of type bigint');
SELECT col_not_null('public', 'task_priority', 'id', 'id column is not null');
SELECT col_is_pk('public', 'task_priority', 'id', 'id column is pk');

SELECT has_column('public', 'task_priority', 'name', 'name column exists');
SELECT col_type_is('public', 'task_priority', 'name', 'text', 'name column is of type text');
SELECT col_not_null('public', 'task_priority', 'name', 'name column is not null');
SELECT col_is_unique('public', 'task_priority', 'name', 'name column is unique');

SELECT test_audit_columns('public', 'task_priority');

SELECT * FROM finish();

ROLLBACK;