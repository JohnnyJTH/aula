import { authStore } from "$lib/stores";
import { redirect, type Handle } from "@sveltejs/kit";
import { get } from "svelte/store";

export const handle = (async ({ event, resolve }) => {
    if (!event.route.id?.startsWith("/log-ind")) {
        const { cookie } = get(authStore);
        console.log(cookie)
        if (cookie) {
            const response = await fetch("https://api.betterlectio.dk/check-cookie", {
                headers: {
                    "lectio-cookie": cookie
                }
            })
            const { valid } = await response.json();
            console.log(valid)
            if (!valid) {
              throw redirect(302, "/log-ind");
            }
        } else {
            throw redirect(302, "/log-ind");
        }
    }

    return await resolve(event);
}) satisfies Handle