CREATE OR REPLACE FUNCTION upsert_project_with_tasks(
    p_project_id BIGINT,
    p_project_name TEXT,
    p_tasks JSONB
) RETURNS BIGINT AS $$
DECLARE
    task_data JSONB;
    v_task_id BIGINT;
    v_name TEXT;
    v_description TEXT;
    v_deadline DATE;
    v_status_id BIGINT;
    v_priority_id BIGINT;
    v_assigned_user_id UUID;
    existing_task_ids BIGINT[];
    provided_task_ids BIGINT[] := ARRAY(SELECT (task_data->>'id')::BIGINT FROM jsonb_array_elements(p_tasks));
BEGIN
    -- Upsert the project
    IF p_project_id IS NOT NULL THEN
        -- Update the existing project
        UPDATE public.project
        SET name = p_project_name
        WHERE id = p_project_id;
    ELSE
        -- Insert a new project
        INSERT INTO public.project (name) 
        VALUES (p_project_name) 
        RETURNING id INTO p_project_id;
    END IF;

    -- Get existing task IDs for the project
    SELECT ARRAY_AGG(id) INTO existing_task_ids 
    FROM public.task
    WHERE project_id = p_project_id;

    -- Insert or update tasks
    FOR task_data IN SELECT * FROM jsonb_array_elements(p_tasks) LOOP
        -- Extract task details
        v_task_id := (task_data->>'id')::BIGINT;
        v_name := task_data->>'name';
        v_description := task_data->>'description';
        v_deadline := (task_data->>'deadline')::DATE;
        v_status_id := (task_data->>'task_status_id')::BIGINT;
        v_priority_id := (task_data->>'task_priority_id')::BIGINT;
        v_assigned_user_id := (task_data->>'assigned_user_id')::UUID;

        IF v_task_id IS NOT NULL THEN
            -- Update existing task
            UPDATE public.task
            SET 
                name = v_name,
                description = v_description,
                deadline = v_deadline,
                task_status_id = v_status_id,
                task_priority_id = v_priority_id,
                assigned_user_id = v_assigned_user_id
            WHERE id = v_task_id AND project_id = p_project_id;
        ELSE
            -- Insert new task
            INSERT INTO public.task (
                project_id, name, description, deadline, 
                task_status_id, task_priority_id, assigned_user_id
            ) VALUES (
                p_project_id, v_name, v_description, v_deadline,
                v_status_id, v_priority_id, v_assigned_user_id
            );
        END IF;
    END LOOP;

    -- Delete tasks not included in the provided list
    DELETE FROM public.task
    WHERE project_id = p_project_id AND id = ANY(existing_task_ids) AND NOT (id = ANY(provided_task_ids));

    -- Return the project ID
    RETURN p_project_id;
END;
$$ LANGUAGE plpgsql;
