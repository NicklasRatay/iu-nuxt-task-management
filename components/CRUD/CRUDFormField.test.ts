import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import * as PrimeVue from "primevue";
import * as yup from "yup";
import CRUDFormField from "./CRUDFormField.vue";

describe("CRUDFormField", () => {
    const mockAddField = vi.fn();
    const mockStates = {
        testField: {
            value: "test value",
            errors: [{ message: "Error message" }],
        },
    };

    // Mock $fcCRUDForm and $pcForm injections
    const global = {
        provide: {
            $fcCRUDForm: { addField: mockAddField },
            $pcForm: { states: mockStates },
        },
    };

    it("renders label and component correctly", () => {
        const wrapper = mount(CRUDFormField, {
            props: {
                id: "testField",
                label: "Test Label",
                component: "InputText",
            },
            global,
        });

        // Check label rendering
        const label = wrapper.find("label");
        expect(label.exists()).toBe(true);
        expect(label.text()).toBe("Test Label");

        // Check PrimeVue component rendering
        const inputComponent = wrapper.findComponent(PrimeVue.InputText);
        expect(inputComponent.exists()).toBe(true);
    });

    it("registers field in $fcCRUDForm on mount", () => {
        const schema = yup.string().required();
        const initialValue = "initial value";

        mount(CRUDFormField, {
            props: {
                id: "testField",
                label: "Test Label",
                component: "InputText",
                schema,
                initialValue,
            },
            global,
        });

        // Check if addField was called with correct arguments
        expect(mockAddField).toHaveBeenCalledWith(
            "testField",
            schema,
            initialValue,
        );
    });

    it("displays validation error message correctly", async () => {
        const wrapper = mount(CRUDFormField, {
            props: {
                id: "testField",
                label: "Test Label",
                component: "InputText",
            },
            global,
        });

        // Check if the error message is displayed
        const errorMessageDiv = wrapper.find(".c-text-error");
        expect(errorMessageDiv.exists()).toBe(true);
        expect(errorMessageDiv.text()).toBe("Error message");
    });
});
