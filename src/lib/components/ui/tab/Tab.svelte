<script lang="ts">
  import { cn } from "$lib/utils";

  export let selected: boolean = false;
  let className: string | undefined | null = undefined;
  export { className as class };
</script>

{#if selected}
  <span
    on:click
    on:keydown={() => {}}
    class={cn(
      "relative inline-block overflow-hidden rounded-full p-[1px]",
      className
    )}
  >
    <span
      class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1E40AF_0%,#1090ef_50%,#1E40AF_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
    />
    <div
      class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-50/90 dark:bg-slate-950/90 px-[11px] py-[3px] text-base font-medium text-black dark:text-white backdrop-blur-3xl"
    >
      <slot />
    </div>
  </span>
{:else}
  <span
    on:click
    on:keydown={() => {}}
    class={cn(
      "tab-bg inline-flex h-full animate-background-shine cursor-pointer items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-[length:250%_100%] px-3 py-1 text-base font-medium text-slate-700 dark:text-slate-300 backdrop-blur-3xl",
      className
    )}
  >
    <slot />
  </span>
{/if}

<style>
  .tab-bg {
    background-image: linear-gradient(110deg,#fff,45%,#e3ffe7,55%,#fff);
  }
  :is(.dark .tab-bg) {
    background-image: linear-gradient(110deg,#000,45%,#4D4B4B,55%,#000);
  }
</style>
