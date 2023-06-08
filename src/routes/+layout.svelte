<script lang="ts">
  import { RenderInterceptor, SiteHeader } from "$components";
  import "../app.postcss";


</script>

<div class="bg-light dark:bg-dark relative flex min-h-screen flex-col">
  <SiteHeader />
  <div class="prose dark:prose-invert">
    <RenderInterceptor>
      <slot />
    </RenderInterceptor>
  </div>
</div>
