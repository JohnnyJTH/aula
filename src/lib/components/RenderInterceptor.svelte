<script lang="ts">
  import { afterNavigate, goto } from "$app/navigation";
  import { authStore } from "$lib/stores";
  import { DateTime } from "luxon";
  import { get, writable } from "svelte/store";

  export let redirectIfFail: string = "/log-ind";
  export let whitelisted: string[] = ["/log-ind"];

  const showContent = writable(false);
  afterNavigate(async () => {
    showContent.set(false);
    if (whitelisted.includes(window.location.pathname)) {
      return showContent.set(true);
    }

    const { cookie } = get(authStore);
    if (cookie) {
      const response = await fetch("https://api.betterlectio.dk/check-cookie", {
        headers: {
          "lectio-cookie": cookie,
        },
      });
      const { valid } = await response.json();
      if (!valid) {
        if ($authStore.username != "" && $authStore.password != "") {
          const response = await fetch("https://api.betterlectio.dk/auth", {
            headers: {
              brugernavn: $authStore.username,
              adgangskode: $authStore.password,
              skole_id: String($authStore.school),
            },
          });
          if (response.ok) {
            console.log("Succesful auto-login");
            $authStore.cookie = response.headers.get("set-lectio-cookie") ?? "";
          } else {
            console.error("Failed auto-login");
            $authStore.username = "";
            $authStore.password = "";
            $authStore.cookie = "";
            return goto(redirectIfFail);
          }
        } else {
          $authStore.cookie = "";
          return goto(redirectIfFail);
        }
      } else {
        if (
          $authStore.lastLogin &&
          DateTime.fromISO($authStore.lastLogin) <
            DateTime.now().minus({ minutes: 45 })
        ) {
          // I think after 45 minutes the cookie expires but the first validation still returns true
          console.log(
            "Cookie is valid, but last login was more than 45 minutes ago"
          );
          if ($authStore.username != "" && $authStore.password != "") {
            const response = await fetch("https://api.betterlectio.dk/auth", {
              headers: {
                brugernavn: $authStore.username,
                adgangskode: $authStore.password,
                skole_id: String($authStore.school),
              },
            });
            if (response.ok) {
              console.log("Succesful auto-login (45 minutes)");
              $authStore.cookie =
                response.headers.get("set-lectio-cookie") ?? "";
            } else {
              console.error("Failed auto-login (45 minutes)");
              $authStore.username = "";
              $authStore.password = "";
              $authStore.cookie = "";
              return goto(redirectIfFail);
            }
          } else {
            $authStore.cookie = "";
            return goto(redirectIfFail);
          }
        }
      }
    } else {
      return goto(redirectIfFail);
    }
    console.log("Valid cookie");
    $authStore.lastLogin = DateTime.now().toISO();
    showContent.set(true);
  });
</script>

{#if $showContent}
  <slot />
{:else}
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-2xl font-bold">Loading</h1>
    <p class="text-gray-500">
      Vent venligst, mens vi tjekker dine login-oplysninger.
    </p>
  </div>
{/if}
