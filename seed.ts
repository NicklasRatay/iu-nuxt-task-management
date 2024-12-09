import { createSeedClient } from "@snaplet/seed";
import { copycat } from "@snaplet/copycat";
import { APP_NAME } from "./utils/constants";

const main = async () => {
    const seed = await createSeedClient({ dryRun: true, connect: true });

    // Truncate all tables in the database
    await seed.$resetDatabase();

    const currentTime = new Date();
    let userCounter = 1;

    // Test users to login with and to reference from other tables
    const users = await seed.users((x) =>
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

    for (let i = 0; i < users.users.length; i++) {
        const user = users.users[i];

        const firstName = copycat.firstName(user.id);
        const lastName = copycat.lastName(user.id);

        seed.$store.profile.push({
            user_id: user.id,
            email: user.email || "",
            first_name: firstName,
            last_name: lastName,
            is_active: true,
            created_at: currentTime,
            created_by: user.id,
            updated_at: currentTime,
            updated_by: user.id,
        });

        console.log(
            `UPDATE public.profile
            SET
                first_name = '${firstName.replace(/'/g, "''")}',
                last_name = '${lastName.replace(/'/g, "''")}'
            WHERE
                user_id = '${user.id}';`,
        );

        // Assign all roles if first user
        if (i === 0) {
            console.log(
                `INSERT INTO public.user_role (
                    user_id,
                    role_id
                ) VALUES (
                    '${user.id}',
                    1
                );`,
            );
            console.log(
                `INSERT INTO public.user_role (
                    user_id,
                    role_id
                ) VALUES (
                    '${user.id}',
                    2
                );`,
            );
            console.log(
                `INSERT INTO public.user_role (
                    user_id,
                    role_id
                ) VALUES (
                    '${user.id}',
                    3
                );`,
            );
            continue;
        }

        // Deactivate some users
        if ([4, 7, 20].includes(i)) {
            console.log(
                `UPDATE public.profile
                    SET
                        is_active = FALSE
                    WHERE
                        user_id = '${user.id}';`,
            );
        }

        // Assign a single role to user
        const roleId = copycat.int(user.id, { min: 1, max: 3 });
        console.log(
            `INSERT INTO public.user_role (
                user_id,
                role_id
            ) VALUES (
                '${user.id}',
                ${roleId}
            );`,
        );
    }

    await seed.project((x) =>
        x(50, {
            name: (ctx) => copycat.words(ctx.seed, { min: 1, max: 5 }),
        }),
    );

    // Put task priorities in seed store as they already are in the database
    seed.$store.task_priority.push(
        {
            id: 1,
            name: "Low",
            created_at: currentTime,
            created_by: null,
            updated_at: currentTime,
            updated_by: null,
        },
        {
            id: 2,
            name: "Medium",
            created_at: currentTime,
            created_by: null,
            updated_at: currentTime,
            updated_by: null,
        },
        {
            id: 3,
            name: "High",
            created_at: currentTime,
            created_by: null,
            updated_at: currentTime,
            updated_by: null,
        },
        {
            id: 4,
            name: "Critical",
            created_at: currentTime,
            created_by: null,
            updated_at: currentTime,
            updated_by: null,
        },
    );

    // Put task statuses in seed store as they already are in the database
    seed.$store.task_status.push(
        {
            id: 1,
            name: "To Do",
            created_at: currentTime,
            created_by: null,
            updated_at: currentTime,
            updated_by: null,
        },
        {
            id: 2,
            name: "In Progress",
            created_at: currentTime,
            created_by: null,
            updated_at: currentTime,
            updated_by: null,
        },
        {
            id: 3,
            name: "Done",
            created_at: currentTime,
            created_by: null,
            updated_at: currentTime,
            updated_by: null,
        },
    );

    await seed.task((x) =>
        x(500, {
            name: (ctx) => copycat.words(ctx.seed, { min: 1, max: 5 }),
            description: (ctx) => copycat.paragraph(ctx.seed),
            deadline: (ctx) =>
                copycat.dateString(ctx.seed, {
                    min: new Date(),
                    max: new Date(new Date().setDate(new Date().getDate() + 365)),
                }),
        }),
    );

    process.exit();
};

main();
