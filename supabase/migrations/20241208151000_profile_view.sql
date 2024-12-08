CREATE OR REPLACE VIEW public.vw_profile_with_roles WITH(SECURITY_INVOKER=TRUE) AS
SELECT 
    p.user_id,
    p.email,
    p.first_name,
    p.last_name,
    p.is_active,
    STRING_AGG(r.name, ', ' ORDER BY r.name) AS roles
FROM 
    public.profile p
LEFT JOIN
    public.user_role ur ON ur.user_id = p.user_id
LEFT JOIN
    public.role r ON r.id = ur.role_id
GROUP BY
    p.user_id,
    p.email,
    p.first_name,
    p.last_name,
    p.is_active
ORDER BY
    p.last_name ASC,
    p.first_name ASC;