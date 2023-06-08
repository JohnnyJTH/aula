<script lang="ts">
  import { goto } from "$app/navigation";
  import { authStore } from "$lib/stores";
  import { Loader } from "lucide-svelte";
  import { onMount } from "svelte";
  import { get, writable } from "svelte/store";

  export let redirectIfFail: string = "/log-ind";
  export let whitelisted: string[] = ["/log-ind"]

  const showContent = writable(false);
  onMount(async () => {
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
      console.log(valid);
      if (!valid) {
        return goto(redirectIfFail);
      }
    } else {
      return goto(redirectIfFail);
    }
    showContent.set(true);
  });
</script>

{#if $showContent}
  <slot />
{:else}
  <Loader class="w-12 h-12 mx-auto" />
{/if}
