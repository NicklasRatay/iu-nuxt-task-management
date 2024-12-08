CREATE OR REPLACE FUNCTION public.test_audit_columns(schema_name TEXT, table_name TEXT)
RETURNS SETOF TEXT AS $$
BEGIN
    RETURN QUERY SELECT has_column(schema_name, table_name, 'created_at', 'created_at column exits');
    RETURN QUERY SELECT col_type_is(schema_name, table_name, 'created_at', 'timestamp with time zone', 'created_at column is of type timestamp with time zone');
    RETURN QUERY SELECT col_not_null(schema_name, table_name, 'created_at', 'created_at column is not null');

    RETURN QUERY SELECT has_column(schema_name, table_name, 'created_by', 'created_by column exists');
    RETURN QUERY SELECT col_type_is(schema_name, table_name, 'created_by', 'uuid', 'created_by column is of type uuid');
    RETURN QUERY SELECT col_is_fk(schema_name, table_name, 'created_by', 'created_by column is fk');
    RETURN QUERY SELECT fk_ok(schema_name, table_name, 'created_by', 'public', 'profile', 'user_id', 'created_by column is fk to public.profile.user_id');

    RETURN QUERY SELECT has_column(schema_name, table_name, 'updated_at', 'updated_at column exists');
    RETURN QUERY SELECT col_type_is(schema_name, table_name, 'updated_at', 'timestamp with time zone', 'updated_at column is of type timestamp with time zone');
    RETURN QUERY SELECT col_not_null(schema_name, table_name, 'updated_at', 'updated_at column is not null');

    RETURN QUERY SELECT has_column(schema_name, table_name, 'updated_by', 'updated_by column exists');
    RETURN QUERY SELECT col_type_is(schema_name, table_name, 'updated_by', 'uuid', 'updated_by column is of type uuid');
    RETURN QUERY SELECT col_is_fk(schema_name, table_name, 'updated_by', 'updated_by column is fk');
    RETURN QUERY SELECT fk_ok(schema_name, table_name, 'updated_by', 'public', 'profile', 'user_id', 'updated_by column is fk to public.profile.user_id');
END;
$$ LANGUAGE PLPGSQL;