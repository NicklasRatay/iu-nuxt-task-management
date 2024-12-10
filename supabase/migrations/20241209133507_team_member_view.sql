CREATE OR REPLACE VIEW vw_team_member_lov WITH (SECURITY_INVOKER = TRUE) AS
SELECT
    p.user_id,
    CONCAT(p.first_name, ' ', p.last_name) AS full_name
FROM
    profile p
INNER JOIN
    user_role ur
ON
    p.user_id = ur.user_id
WHERE
    ur.role_id = 3
ORDER BY
    p.last_name ASC;
