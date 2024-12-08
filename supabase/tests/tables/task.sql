BEGIN;

SELECT plan(48);

SELECT has_table('public', 'task', 'Task table exists');

SELECT has_column('public', 'task', 'id', 'id column exists');
SELECT col_type_is('public', 'task', 'id', 'bigint', 'id column is of type bigint');
SELECT col_not_null('public', 'task', 'id', 'id column is not null');
SELECT col_is_pk('public', 'task', 'id', 'id column is pk');

SELECT has_column('public', 'task', 'project_id', 'project_id column exists');
SELECT col_type_is('public', 'task', 'project_id', 'bigint', 'project_id column is of type bigint');
SELECT col_not_null('public', 'task', 'project_id', 'project_id column is not null');
SELECT col_is_fk('public', 'task', 'project_id', 'project_id column is fk');
SELECT fk_ok('public', 'task', 'project_id', 'public', 'project', 'id', 'project_id column is fk to public.project.id');

SELECT has_column('public', 'task', 'task_status_id', 'task_status_id column exists');
SELECT col_type_is('public', 'task', 'task_status_id', 'bigint', 'task_status_id column is of type bigint');
SELECT col_not_null('public', 'task', 'task_status_id', 'task_status_id column is not null');
SELECT col_is_fk('public', 'task', 'task_status_id', 'task_status_id column is fk');
SELECT fk_ok('public', 'task', 'task_status_id', 'public', 'task_status', 'id', 'task_status_id column is fk to public.task_status.id');

SELECT has_column('public', 'task', 'task_priority_id', 'task_priority_id column exists');
SELECT col_type_is('public', 'task', 'task_priority_id', 'bigint', 'task_priority_id column is of type bigint');
SELECT col_not_null('public', 'task', 'task_priority_id', 'task_priority_id column is not null');
SELECT col_is_fk('public', 'task', 'task_priority_id', 'task_priority_id column is fk');
SELECT fk_ok('public', 'task', 'task_priority_id', 'public', 'task_priority', 'id', 'task_priority_id column is fk to public.task_priority.id');

SELECT has_column('public', 'task', 'assigned_user_id', 'assigned_user_id column exists');
SELECT col_type_is('public', 'task', 'assigned_user_id', 'uuid', 'assigned_user_id column is of type uuid');
SELECT col_not_null('public', 'task', 'assigned_user_id', 'assigned_user_id column is not null');
SELECT col_is_fk('public', 'task', 'assigned_user_id', 'assigned_user_id column is fk');
SELECT fk_ok('public', 'task', 'assigned_user_id', 'public', 'user', 'id', 'assigned_user_id column is fk to public.user.id');

SELECT has_column('public', 'task', 'name', 'name column exists');
SELECT col_type_is('public', 'task', 'name', 'text', 'name column is of type text');
SELECT col_not_null('public', 'task', 'name', 'name column is not null');

SELECT has_column('public', 'task', 'description', 'description column exists');
SELECT col_type_is('public', 'task', 'description', 'text', 'description column is of type text');
SELECT col_not_null('public', 'task', 'description', 'description column is not null');

SELECT has_column('public', 'task', 'deadline', 'deadline column exists');
SELECT col_type_is('public', 'task', 'deadline', 'date', 'deadline column is of type date');
SELECT col_not_null('public', 'task', 'deadline', 'deadline column is not null');

SELECT test_audit_columns('public', 'task');

SELECT * FROM finish();

ROLLBACK;