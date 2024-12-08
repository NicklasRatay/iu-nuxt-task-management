import type { Database } from "~/supabase/types";

export default defineNuxtRouteMiddleware(async (to) => {
    // Prevent infinite redirect loop
    if (["/unauthorized", "/login"].includes(to.path)) {
        return;
    }

    // Use Supabase composables to get the user
    const user = useSupabaseUser();

    // If no user is logged in, redirect to login
    if (!user.value) {
        return navigateTo("/login");
    }

    // Check the user's active status
    const { data, error } = await useSupabaseClient<Database>()
        .from("profile")
        .select("is_active")
        .eq("user_id", user.value.id)
        .single();

    // Handle error or inactive user
    if (error || !data?.is_active) {
        return navigateTo("/unauthorized");
    }
});
