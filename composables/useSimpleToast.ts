import { useToast } from "primevue/usetoast";

export const useSimpleToast = () => {
    const toast = useToast();

    const info = (message: string) => {
        toast.add({
            severity: "info",
            summary: "Info",
            detail: message,
            life: 5000,
        });
    };

    const success = (message: string) => {
        toast.add({
            severity: "success",
            summary: "Success",
            detail: message,
            life: 5000,
        });
    };

    const warn = (message: string) => {
        toast.add({
            severity: "warn",
            summary: "Warning",
            detail: message,
            life: 5000,
        });
    };

    const error = (message: string) => {
        toast.add({ severity: "error", summary: "Error", detail: message });
        console.error(message);
    };

    const validationWarn = () => {
        toast.add({
            severity: "warn",
            summary: "Invalid Input",
            detail: "Please review the input fields.",
            life: 5000,
        });
    };

    return { info, success, warn, error, validationWarn };
};
