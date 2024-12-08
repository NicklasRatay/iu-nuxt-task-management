BEGIN;

SELECT plan(23);

SELECT has_table('public', 'role', 'Role table exists');

SELECT has_column('public', 'role', 'id', 'id column exists');
SELECT col_type_is('public', 'role', 'id', 'bigint', 'id column is of type bigint');
SELECT col_not_null('public', 'role', 'id', 'id column is not null');
SELECT col_is_pk('public', 'role', 'id', 'id column is pk');

SELECT has_column('public', 'role', 'name', 'name column exists');
SELECT col_type_is('public', 'role', 'name', 'text', 'name column is of type text');
SELECT col_not_null('public', 'role', 'name', 'name column is not null');
SELECT col_is_unique('public', 'role', 'name', 'name column is unique');

SELECT test_audit_columns('public', 'role');

SELECT * FROM finish();

ROLLBACK;