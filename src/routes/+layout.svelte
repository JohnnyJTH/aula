<script lang="ts">
  import { RenderInterceptor, SiteHeader } from "$components";
  import { setInitialClassState } from "$components/light-switch/light-switch";
  import "../app.postcss";
</script>

<svelte:head>
  <!-- This causes the new eslint-plugin-svelte: https://github.com/sveltejs/eslint-plugin-svelte/issues/492 -->
  {@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<SiteHeader />
<div class="prose dark:prose-invert max-w-none">
  <RenderInterceptor>
    <slot />
  </RenderInterceptor>
</div>
