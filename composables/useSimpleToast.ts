import { useToast } from "primevue/usetoast";

/**
 * Composable for showing different types of toast messages.
 * @returns {Object} Object containing functions to show toast messages.
 */
export const useSimpleToast = () => {
    const toast = useToast();

    /**
     * Shows a blue information toast message.
     * @param message The message to display.
     */
    const info = (message: string) => {
        toast.add({
            severity: "info",
            summary: "Info",
            detail: message,
            life: 5000,
        });
    };

    /**
     * Shows a green success toast message.
     * @param message The message to display.
     */
    const success = (message: string) => {
        toast.add({
            severity: "success",
            summary: "Success",
            detail: message,
            life: 5000,
        });
    };

    /**
     * Shows a yellow warning toast message.
     * @param message The message to display.
     */
    const warn = (message: string) => {
        toast.add({
            severity: "warn",
            summary: "Warning",
            detail: message,
            life: 5000,
        });
    };

    /**
     * Shows a red error toast message that does not disappear automatically.
     * @param message The message to display.
     */
    const error = (message: string) => {
        toast.add({ severity: "error", summary: "Error", detail: message });
        console.error(message);
    };

    /**
     * Shows a green success toast message for saving data.
     */
    const saveSuccess = () => {
        toast.add({
            severity: "success",
            summary: "Data Saved",
            life: 2500,
        });
    };

    /**
     * Shows a yellow warning toast message for invalid input fields.
     */
    const validationWarn = () => {
        toast.add({
            severity: "warn",
            summary: "Invalid Input",
            detail: "Please review the input fields.",
            life: 5000,
        });
    };

    return { info, success, warn, error, saveSuccess, validationWarn };
};
