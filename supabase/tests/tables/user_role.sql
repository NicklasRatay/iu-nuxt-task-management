BEGIN;

SELECT plan(24);

SELECT has_table('public', 'user_role', 'User_Role table exists');

SELECT has_column('public', 'user_role', 'user_id', 'user_id column exists');
SELECT col_type_is('public', 'user_role', 'user_id', 'bigint', 'user_id column is of type bigint');
SELECT col_is_fk('public', 'user_role', 'user_id', 'user_id column is fk');
SELECT fk_ok('public', 'user_role', 'user_id', 'public', 'user', 'id', 'user_id column is fk to public.user.id');

SELECT has_column('public', 'user_role', 'role_id', 'role_id column exists');
SELECT col_type_is('public', 'user_role', 'role_id', 'bigint', 'role_id column is of type bigint');
SELECT col_is_fk('public', 'user_role', 'role_id', 'role_id column is fk');
SELECT fk_ok('public', 'user_role', 'role_id', 'public', 'role', 'id', 'role_id column is fk to public.role.id');

SELECT col_is_pk('public', 'user_role', ARRAY['user_id', 'role_id'], 'user_id and role_id columns are pk');

SELECT test_audit_columns('public', 'user_role');

SELECT * FROM finish();

ROLLBACK;