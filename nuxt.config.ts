import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";
import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "@primevue/auto-import-resolver";
import { APP_NAME, APP_DESCRIPTION } from "./utils/constants";

const customPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: "{blue.50}",
            100: "{blue.100}",
            200: "{blue.200}",
            300: "{blue.300}",
            400: "{blue.400}",
            500: "{blue.500}",
            600: "{blue.600}",
            700: "{blue.700}",
            800: "{blue.800}",
            900: "{blue.900}",
            950: "{blue.950}",
        },
    },
});

export default defineNuxtConfig({
    modules: [
        "@primevue/nuxt-module",
        "@nuxtjs/supabase",
        "@vueuse/nuxt",
        "@nuxtjs/tailwindcss",
        "@nuxt/test-utils/module",
        "nuxt-lodash",
        "@nuxt/eslint",
    ],
    devtools: {
        enabled: true,
    },
    app: {
        head: {
            title: APP_NAME,
            meta: [
                {
                    name: APP_DESCRIPTION,
                    content: APP_NAME,
                },
            ],
        },
    },
    build: {
        transpile: ["primevue"],
    },
    css: ["@/assets/css/main.css", "primeicons/primeicons.css"],
    primevue: {
        options: {
            theme: {
                preset: customPreset,
            },
            pt: {
                global: {
                    css: `
                      .p-datatable-header {
                          border: none !important;
                          border-bottom: 1px solid var(--p-datatable-header-border-color) !important;
                          border-top-left-radius: 0.5rem !important;
                          border-top-right-radius: 0.5rem !important;
                      }
                      .p-datatable-paginator-bottom {
                          border: none !important;
                          border-top: 1px solid var(--p-datatable-header-border-color) !important;
                          border-bottom-left-radius: 0.5rem !important;
                          border-bottom-right-radius: 0.5rem !important;
                      }
                  `,
                },
            },
        },
    },
    vite: {
        plugins: [
            Components({
                resolvers: [PrimeVueResolver()],
            }),
        ],
    },
    eslint: {
        config: {
            stylistic: {
                indent: 4,
                semi: true,
                quotes: "double",
                braceStyle: "1tbs",
                arrowParens: true,
            },
        },
    },
    compatibilityDate: "2024-12-06",
});
