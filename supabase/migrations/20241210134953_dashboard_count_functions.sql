CREATE OR REPLACE FUNCTION get_total_project_count()
RETURNS BIGINT AS $$
BEGIN
    RETURN (
        SELECT COUNT(*) 
        FROM public.project
    );
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_total_task_count()
RETURNS BIGINT AS $$
BEGIN
    RETURN (
        SELECT COUNT(*) 
        FROM public.task
    );
END;
$$ LANGUAGE plpgsql;
