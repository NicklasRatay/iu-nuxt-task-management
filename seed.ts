import { createSeedClient } from "@snaplet/seed";
import { APP_NAME } from "./utils/constants";

const main = async () => {
    const seed = await createSeedClient({ dryRun: true, connect: true });

    // Truncate all tables in the database
    await seed.$resetDatabase();

    const currentTime = new Date();
    let userCounter = 1;

    // Test users to login with and to reference from other tables
    await seed.users((x) =>
        x(25, {
            instance_id: "00000000-0000-0000-0000-000000000000",
            aud: "authenticated",
            role: "authenticated",
            email: () =>
                `test.user${userCounter++}@${APP_NAME.toLowerCase().replace(
                    "-",
                    "",
                )}.com`,
            invited_at: null,
            confirmation_token: null,
            confirmation_sent_at: null,
            recovery_token: null,
            recovery_sent_at: currentTime,
            email_change: null,
            email_change_sent_at: null,
            last_sign_in_at: currentTime,
            raw_app_meta_data: { provider: "email", providers: ["email"] },
            raw_user_meta_data: {},
            is_super_admin: null,
            created_at: currentTime,
            updated_at: currentTime,
            email_change_token_new: null,
            phone_confirmed_at: null,
            phone_change_sent_at: null,
            email_confirmed_at: currentTime,
            phone_change_token: null,
            phone: null,
            phone_change: null,
            email_change_token_current: null,
            email_change_confirm_status: 0,
            banned_until: null,
            reauthentication_token: null,
            reauthentication_sent_at: null,
            is_sso_user: false,
            deleted_at: null,
            is_anonymous: false,
            identities: (x) =>
                x(1, {
                    provider_id: (ctx) => ctx.data.user_id || "",
                    identity_data: (ctx) => {
                        return {
                            sub: ctx.data.user_id || "",
                            email:
                                seed.$store.users.find(
                                    (u) => u.id === ctx.data.user_id,
                                )?.email || null,
                        };
                    },
                    provider: "email",
                    last_sign_in_at: currentTime,
                    created_at: currentTime,
                    updated_at: currentTime,
                }),
        }),
    );

    // Update password for all users to 123
    console.log(
        `UPDATE AUTH.USERS
        SET
            ENCRYPTED_PASSWORD = extensions.crypt('123', extensions.gen_salt('bf'));`,
    );

    // Set all tokens to empty string (does not work via snaplet)
    console.log(
        `UPDATE AUTH.USERS
        SET
            CONFIRMATION_TOKEN = '',
            RECOVERY_TOKEN = '',
            EMAIL_CHANGE = '',
            EMAIL_CHANGE_TOKEN_NEW = '',
            PHONE_CHANGE_TOKEN = '',
            PHONE_CHANGE = '',
            EMAIL_CHANGE_TOKEN_CURRENT = '',
            REAUTHENTICATION_TOKEN = '';`,
    );

    process.exit();
};

main();
