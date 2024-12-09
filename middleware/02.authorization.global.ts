import { useRole } from "~/composables/useRole"; // Adjust the path to your useRole composable

export default defineNuxtRouteMiddleware(async (to) => {
    // Prevent infinite redirect loop
    if (to.path === "/unauthorized") {
        return;
    }

    // Define roles for parent routes (applies to subroutes as well)
    const pageRoles: Record<string, UserRole[]> = {
        "/user": [UserRole.Administrator],
        "/project": [UserRole.ProjectManager],
        "/task": [UserRole.TeamMember],
    };

    // Find the closest parent route with role restrictions
    const matchedRoles = Object.entries(pageRoles).find(([path]) =>
        to.path.startsWith(path),
    );

    // No roles required for this route or its parent, allow navigation
    if (!matchedRoles) {
        return;
    }

    const [, requiredRoles] = matchedRoles;

    // Use the useRole composable to check if the user has the required roles
    const { hasAnyRole } = useRole();
    const hasAccess = await hasAnyRole(requiredRoles);

    // Redirect the user to the unauthorized page if they lack the required roles
    if (!hasAccess) {
        return navigateTo("/unauthorized");
    }
});
