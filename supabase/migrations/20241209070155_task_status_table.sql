CREATE TABLE public.task_status (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

DO $$
BEGIN
    PERFORM public.add_audit_columns('public', 'task_status');
END $$;

ALTER TABLE public.task_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable select for authenticated users" ON public.task_status FOR SELECT TO authenticated USING (TRUE);