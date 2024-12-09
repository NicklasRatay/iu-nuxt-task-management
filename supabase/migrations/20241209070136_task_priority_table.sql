CREATE TABLE public.task_priority (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

DO $$
BEGIN
    PERFORM public.add_audit_columns('public', 'task_priority');
END $$;

ALTER TABLE public.task_priority ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable select for authenticated users" ON public.task_priority FOR SELECT TO authenticated USING (TRUE);

INSERT INTO public.task_priority (name) VALUES ('Low');
INSERT INTO public.task_priority (name) VALUES ('Medium');
INSERT INTO public.task_priority (name) VALUES ('High');
INSERT INTO public.task_priority (name) VALUES ('Critical');