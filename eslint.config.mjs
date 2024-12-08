import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
    {
        files: ["**/*.js", "**/*.ts", "**/*.vue"],
        rules: {
            "vue/singleline-html-element-content-newline": "off",
            "nuxt/nuxt-config-keys-order": "off",
            "@stylistic/operator-linebreak": "off",
        },
    },
    {
        files: ["seed.ts"],
        rules: {
            "@stylistic/indent": "off",
        },
    },
    {
        ignores: [
            "supabase/types.ts",
        ],
    },
);
