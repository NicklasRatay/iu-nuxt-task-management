CREATE OR REPLACE FUNCTION public.populate_audit_columns()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        new.created_at := current_timestamp;
        new.created_by := (SELECT auth.uid());
        new.updated_at := current_timestamp;
        new.updated_by := (SELECT auth.uid());
    ELSIF (TG_OP = 'UPDATE') THEN
        new.updated_at := current_timestamp;
        new.updated_by := (SELECT auth.uid());
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;


CREATE OR REPLACE FUNCTION public.create_audit_trigger(schema_name TEXT, table_name TEXT)
RETURNS VOID AS $$
DECLARE
    trigger_name TEXT;
BEGIN
    trigger_name := 'trig_' || table_name || '_audit';
    EXECUTE FORMAT(
        'CREATE OR REPLACE TRIGGER %I BEFORE INSERT OR UPDATE ON %I.%I FOR EACH ROW EXECUTE FUNCTION public.populate_audit_columns()',
        trigger_name, schema_name, table_name
    );
END;
$$ LANGUAGE PLPGSQL;


CREATE OR REPLACE FUNCTION public.add_audit_columns(schema_name TEXT, table_name TEXT)
RETURNS VOID AS $$
BEGIN
    EXECUTE FORMAT('ALTER TABLE %I.%I ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL', schema_name, table_name);
    EXECUTE FORMAT('ALTER TABLE %I.%I ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES public.profile(user_id)', schema_name, table_name);
    EXECUTE FORMAT('ALTER TABLE %I.%I ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL', schema_name, table_name);
    EXECUTE FORMAT('ALTER TABLE %I.%I ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES public.profile(user_id)', schema_name, table_name);

    PERFORM public.create_audit_trigger(schema_name, table_name);
END;
$$ LANGUAGE PLPGSQL;