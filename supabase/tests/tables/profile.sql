BEGIN;

SELECT plan(34);

SELECT has_table('public', 'profile', 'User table exists');

SELECT has_column('public', 'profile', 'user_id', 'user_id column exists');
SELECT col_type_is('public', 'profile', 'user_id', 'bigint', 'user_id column is of type bigint');
SELECT col_not_null('public', 'profile', 'user_id', 'user_id column is not null');
SELECT col_is_pk('public', 'profile', 'user_id', 'user_id column is pk');
SELECT col_is_fk('public', 'profile', 'user_id', 'user_id column is fk');
SELECT fk_ok('public', 'profile', 'user_id', 'auth', 'users', 'id', 'user_id column is fk to auth.users.id');

SELECT has_column('public', 'profile', 'email', 'email column exists');
SELECT col_type_is('public', 'profile', 'email', 'text', 'email column is of type text');
SELECT col_not_null('public', 'profile', 'email', 'email column is not null');
SELECT col_is_unique('public', 'profile', 'email', 'email column is unique');

SELECT has_column('public', 'profile', 'first_name', 'first_name column exists');
SELECT col_type_is('public', 'profile', 'first_name', 'text', 'first_name column is of type text');
SELECT col_not_null('public', 'profile', 'first_name', 'first_name column is not null');

SELECT has_column('public', 'profile', 'last_name', 'last_name column exists');
SELECT col_type_is('public', 'profile', 'last_name', 'text', 'last_name column is of type text');
SELECT col_not_null('public', 'profile', 'last_name', 'last_name column is not null');

SELECT has_column('public', 'profile', 'is_active', 'is_active column exists');
SELECT col_type_is('public', 'profile', 'is_active', 'boolean', 'is_active column is of type boolean');
SELECT col_not_null('public', 'profile', 'is_active', 'is_active column is not null');
SELECT col_default_is('public', 'profile', 'is_active', 'true', 'is_active column defaults to true');

SELECT test_audit_columns('public', 'profile');

SELECT * FROM finish();

ROLLBACK;