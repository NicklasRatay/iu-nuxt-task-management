export function useNavigationEntries() {
    const navigationEntries = ref([
        {
            label: "Dashboard",
            icon: "pi pi-home",
            route: "/",
        },
    ]);

    const role = useRole();

    const populateNavigationEntries = async () => {
        if (await role.hasRole(UserRole.TeamMember)) {
            navigationEntries.value.push({
                label: "Your Tasks",
                icon: "pi pi-list-check",
                route: "/task",
            });
        }
        if (await role.hasRole(UserRole.ProjectManager)) {
            navigationEntries.value.push({
                label: "Your Projects",
                icon: "pi pi-folder",
                route: "/project",
            });
        }
        if (await role.hasRole(UserRole.Administrator)) {
            navigationEntries.value.push({
                label: "Users",
                icon: "pi pi-users",
                route: "/user",
            });
        }
    };

    onMounted(() => {
        populateNavigationEntries();
    });

    return { navigationEntries };
}
