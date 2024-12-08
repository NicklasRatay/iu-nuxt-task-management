import type { Config } from "tailwindcss";

export default {
    content: [],
    theme: {
        extend: {},
    },
    plugins: [require("tailwindcss-primeui")], // eslint-disable-line @typescript-eslint/no-require-imports
} satisfies Config;
