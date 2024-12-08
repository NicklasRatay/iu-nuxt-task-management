import { defineVitestConfig } from "@nuxt/test-utils/config";
import dotenv from "dotenv";

dotenv.config(); // Explicitly load environment variables

export default defineVitestConfig({
    test: {
        environment: "nuxt",
        setupFiles: ["./vitest.setup.ts"],
        globals: true,
    },
});
