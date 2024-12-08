import type { Database } from "~/supabase/types";

/**
 * Composable for checking authorization roles for the logged-in user.
 * @returns {Object} Object containing functions to check user roles.
 */
export const useRole = () => {
    const simpleToast = useSimpleToast();
    const supabase = useSupabaseClient<Database>();
    const user = useSupabaseUser();

    /**
     * Checks if the user has a specific role.
     * @param {UserRole} role The role to check for the current user.
     * @returns {Promise<boolean>} True if the user has the role, false otherwise.
     */
    const hasRole = async (role: UserRole): Promise<boolean> => {
        if (!user.value) return false;

        const { data, error } = await supabase.rpc("has_role", {
            role_name: role,
        });
        if (error) {
            simpleToast.error(error.message);
            return false;
        }

        return data;
    };

    /**
     * Checks if the user has at least one of the specified roles.
     * @param {UserRole[]} roles Array of roles to check for the current user.
     * @returns {Promise<boolean>} True if the user has at least one role, false otherwise.
     */
    const hasAnyRole = async (roles: UserRole[]): Promise<boolean> => {
        for (const role of roles) {
            const result = await hasRole(role);
            if (result) {
                return true;
            }
        }
        return false;
    };

    return {
        hasRole,
        hasAnyRole,
    };
};
