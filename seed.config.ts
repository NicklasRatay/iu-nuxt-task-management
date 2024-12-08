import { SeedPostgres } from "@snaplet/seed/adapter-postgres";
import { defineConfig } from "@snaplet/seed/config";
import postgres from "postgres";

export default defineConfig({
    adapter: () => {
        const client = postgres(process.env.SUPABASE_DB_URL || "");
        return new SeedPostgres(client);
    },
    select: [
        "!*", // Exclude all tables not specified here
        "public*",
        "auth.users",
        "auth.identities",
        "auth.sessions",
    ],
});
