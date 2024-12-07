import { config } from "dotenv";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import { RouterLinkStub, config as testUtilsConfig } from "@vue/test-utils";

config();

testUtilsConfig.global.plugins = [PrimeVue, ToastService];
testUtilsConfig.global.stubs = {
    RouterLink: RouterLinkStub,
};
