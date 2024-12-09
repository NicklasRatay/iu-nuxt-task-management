CREATE OR REPLACE VIEW public.vw_task_with_details WITH (SECURITY_INVOKER = TRUE) AS
SELECT
    t.id,
    t.name,
    t.description,
    t.deadline,
    t.created_at,
    t.updated_at,
    p.id AS project_id,
    p.name AS project_name,
    tp.name AS priority_name,
    ts.name AS status_name,
    pr.email AS assigned_user_email,
    CONCAT(pr.first_name, ' ', pr.last_name) AS assigned_user_name
FROM
    public.task t
JOIN
    public.project p ON t.project_id = p.id
JOIN
    public.task_status ts ON t.task_status_id = ts.id
JOIN
    public.task_priority tp ON t.task_priority_id = tp.id
JOIN
    public.profile pr ON t.assigned_user_id = pr.user_id
ORDER BY
    t.deadline ASC;
