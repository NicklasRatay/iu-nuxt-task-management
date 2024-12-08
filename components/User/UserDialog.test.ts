import { it, expect, describe } from "vitest";
import { mount, config } from "@vue/test-utils";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import UserDialog from "./UserDialog.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("UserDialog", () => {
    it("can be mounted", () => {
        const wrapper = mount(UserDialog);
        expect(wrapper.exists()).toBe(true);
    });
});
