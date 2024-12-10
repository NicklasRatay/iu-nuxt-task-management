CREATE OR REPLACE VIEW vw_pending_tasks_per_priority WITH (SECURITY_INVOKER = TRUE) AS
SELECT
    tp.id AS priority_id,
    tp.name AS priority_name,
    COUNT(t.id) AS task_count
FROM 
    public.task t
JOIN 
    public.task_priority tp
ON 
    t.task_priority_id = tp.id
WHERE
    t.task_status_id <> 3
GROUP BY 
    tp.id
ORDER BY 
    tp.id ASC;
