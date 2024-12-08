import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import CRUDForm from "./CRUDForm.vue";

describe("CRUDForm", () => {
    it("can be mounted", () => {
        const wrapper = mount(CRUDForm);

        const formComponent = wrapper.findComponent({ name: "Form" });
        expect(formComponent.exists()).toBe(true);
    });

    it("emits submit event", async () => {
        const submitHandler = vi.fn();
        const wrapper = mount(CRUDForm, {
            props: {
                onSubmit: submitHandler,
            },
        });

        await wrapper.find("form").trigger("submit.prevent");

        expect(submitHandler).toHaveBeenCalled();
        const emittedEvents = wrapper.emitted("submit");
        expect(emittedEvents).toBeTruthy();
    });
});
