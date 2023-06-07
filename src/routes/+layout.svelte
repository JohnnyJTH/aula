<script>
  import { SiteHeader } from "$components";
  import "../app.postcss";
</script>

<div class="bg-light dark:bg-dark relative flex min-h-screen flex-col">
  <SiteHeader />
  <div class="prose">
    <slot />
  </div>
</div>
