CREATE VIEW vw_tasks_per_status WITH (SECURITY_INVOKER = TRUE) AS
SELECT
    ts.id AS status_id,
    ts.name AS status_name,
    COUNT(t.id) AS task_count
FROM 
    public.task t
JOIN 
    public.task_status ts
ON 
    t.task_status_id = ts.id
GROUP BY 
    ts.id
ORDER BY 
    ts.id ASC;
