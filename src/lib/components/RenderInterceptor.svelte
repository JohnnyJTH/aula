<script lang="ts">
  import { Loader } from "lucide-svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  type Request =
    | {
        type: "GET" | "DELETE";
        url: string;
        headers?: any;
      }
    | {
        type: "POST" | "PATCH" | "PUT";
        url: string;
        headers?: any;
        body?: any;
      };

  const sendRequest = async (request: Request): Promise<boolean> => {
    if (request.type == "GET" || request.type == "DELETE") {
      const [, error] = await api["a" + request.type](
        request.url,
        request.headers
      );

      return !!error;
    } else {
      const [, error] = await api["a" + request.type](
        request.url,
        request["body"],
        request.headers
      );

      return !!error;
    }
  };

  export let redirectIfFail: string = "/log-ind";
  export let requestValidations: Request[] = [];

  const showContent = writable(false);
  onMount(async () => {
    showContent.set(true);
  });
</script>

{#if $showContent}
  <slot />
{:else}
  <Loader class="w-12 h-12 mx-auto" />
{/if}
