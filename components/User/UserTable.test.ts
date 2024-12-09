import { it, expect, describe } from "vitest";
import { mount, config } from "@vue/test-utils";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import UserTable from "./UserTable.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("UserTable", () => {
    it("can be mounted", () => {
        const wrapper = mount(UserTable);
        expect(wrapper.exists()).toBe(true);
    });
});
