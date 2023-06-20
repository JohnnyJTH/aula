<script lang="ts">
  import { page } from "$app/stores";
  import { RenderInterceptor, SiteHeader } from "$components";
  import { setInitialClassState } from "$components/light-switch/light-switch";
  import "../lib/utilities/string";
  import "../app.postcss";

  $: title =
    $page.url.pathname == "/"
      ? "Aula"
      : `${$page.url.pathname
          .split("/")[1]
          .replace("-", " ")
          .toTitleCase()} - Aula`;
</script>

<svelte:head>
  <title>{title}</title>
  <!-- This causes the new eslint-plugin-svelte: https://github.com/sveltejs/eslint-plugin-svelte/issues/492 -->
  {@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<SiteHeader />
<div class="prose dark:prose-invert max-w-none">
  <RenderInterceptor>
    <slot />
  </RenderInterceptor>
</div>
