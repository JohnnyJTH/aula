<script lang="ts">
  import { RenderInterceptor, SiteHeader } from "$components";
  import { setInitialClassState } from "$components/light-switch/light-switch";
  import "../app.postcss";
</script>

<svelte:head>
	<!-- This causes the new eslint-plugin-svelte: https://github.com/sveltejs/eslint-plugin-svelte/issues/492 -->
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<div class="bg-light dark:bg-dark relative flex min-h-screen flex-col">
  <SiteHeader />
  <div class="prose dark:prose-invert">
    <RenderInterceptor>
      <slot />
    </RenderInterceptor>
  </div>
</div>
