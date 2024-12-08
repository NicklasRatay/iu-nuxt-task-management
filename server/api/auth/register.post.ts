import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/supabase/types";

type Body = {
    user_id: string;
    email: string;
    password: string;
};

export default defineEventHandler(async (event) => {
    try {
        const body = (await readBody(event)) as Body;

        const supabase = createClient<Database>(
            process.env.SUPABASE_URL as string,
            process.env.SUPABASE_SERVICE_KEY as string,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false,
                },
            },
        );

        const { data, error } = await supabase.auth.admin.createUser({
            email: body.email,
            password: body.password,
            email_confirm: true,
        });

        return { data, error };
    } catch (error) {
        return { data: null, error: error };
    }
});
