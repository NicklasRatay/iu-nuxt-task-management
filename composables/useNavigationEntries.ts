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
        if (await role.hasRole(UserRole.Administrator)) {
            navigationEntries.value.push({
                label: "Nutzende",
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