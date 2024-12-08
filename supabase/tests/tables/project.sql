BEGIN;

SELECT plan(23);

SELECT has_table('public', 'project', 'Project table exists');

SELECT has_column('public', 'project', 'id', 'id column exists');
SELECT col_type_is('public', 'project', 'id', 'bigint', 'id column is of type bigint');
SELECT col_not_null('public', 'project', 'id', 'id column is not null');
SELECT col_is_pk('public', 'project', 'id', 'id column is pk');

SELECT has_column('public', 'project', 'name', 'name column exists');
SELECT col_type_is('public', 'project', 'name', 'text', 'name column is of type text');
SELECT col_not_null('public', 'project', 'name', 'name column is not null');
SELECT col_is_unique('public', 'project', 'name', 'name column is unique');

SELECT test_audit_columns('public', 'project');

SELECT * FROM finish();

ROLLBACK;