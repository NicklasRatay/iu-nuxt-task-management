CREATE OR REPLACE VIEW vw_profile_with_full_name WITH (SECURITY_INVOKER = TRUE) AS
SELECT
    *,
    CONCAT(first_name, ' ', last_name) AS full_name
FROM
    profile
ORDER BY
    last_name ASC;
