CREATE TABLE public.profile (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);


DO $$
BEGIN
    PERFORM public.add_audit_columns('public', 'profile');
END $$;


ALTER TABLE "public"."profile" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable select for authenticated users" ON "public"."profile" FOR SELECT TO "authenticated" USING (TRUE);
CREATE POLICY "Enable insert for authenticated owners" ON "public"."profile" FOR INSERT TO "authenticated" WITH CHECK (user_id = (SELECT auth.uid()));
CREATE POLICY "Enable update for authenticated owners" ON "public"."profile" FOR UPDATE TO "authenticated" USING (user_id = (SELECT auth.uid())) WITH CHECK (user_id = (SELECT auth.uid()));
CREATE POLICY "Enable delete for authenticated owners" ON "public"."profile" FOR DELETE TO "authenticated" USING (user_id = (SELECT auth.uid()));
GRANT ALL ON TABLE public.profile TO supabase_auth_admin;


CREATE OR REPLACE FUNCTION public.create_profile_from_email()
RETURNS TRIGGER SECURITY DEFINER AS $$
DECLARE
    full_name TEXT;
    first_name TEXT;
    last_name TEXT;
BEGIN
    full_name := split_part(NEW.email, '@', 1);
    first_name := split_part(full_name, '.', 1);
    last_name := split_part(full_name, '.', 2);

    INSERT INTO
        public.profile (user_id, email, first_name, last_name, is_active)
    VALUES
        (
            NEW.id,
            NEW.email,
            initcap(first_name),
            initcap(last_name),
            TRUE
        );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER trig_users_create_profile AFTER
INSERT
    ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_profile_from_email();