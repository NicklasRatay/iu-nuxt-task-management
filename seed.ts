import { createSeedClient } from "@snaplet/seed";

const main = async () => {
    const seed = await createSeedClient({ dryRun: true, connect: true });

    // Truncate all tables in the database
    await seed.$resetDatabase();

    process.exit();
};

main();
