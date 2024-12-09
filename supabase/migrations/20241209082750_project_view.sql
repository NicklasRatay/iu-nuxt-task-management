CREATE OR REPLACE VIEW vw_project_with_task_summary WITH(SECURITY_INVOKER=TRUE) AS
SELECT 
    p.*,
    COUNT(t.id) AS total_tasks,
    COUNT(t.id) FILTER (WHERE t.task_status_id = 3) AS completed_tasks,
    COUNT(t.id) FILTER (WHERE t.task_status_id = 3)::float / NULLIF(COUNT(t.id), 0)::float * 100 AS completion_percentage
FROM 
    project p
LEFT JOIN 
    task t ON t.project_id = p.id
GROUP BY 
    p.id
ORDER BY
    p.created_at DESC;
