import { it, expect, describe } from "vitest";
import { mount, config } from "@vue/test-utils";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import UserPasswordDialog from "./UserPasswordDialog.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("UserPasswordDialog", () => {
    it("can be mounted", () => {
        const wrapper = mount(UserPasswordDialog);
        expect(wrapper.exists()).toBe(true);
    });
});
