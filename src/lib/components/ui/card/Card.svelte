<script lang="ts">
  import { cn } from "$lib/utils";

  let className: string | undefined | null = undefined;
  export { className as class };

  export let animate: boolean = false;
</script>

<div
  class={cn(`glass-morphism ${animate ? "glass-morphism-3d cursor-pointer" : ""}`, className)}
  {...$$restProps}
  on:click
  on:focusin
  on:focusout
  on:mouseenter
  on:mouseleave
>
  <slot />
</div>

<style>
  .glass-morphism {
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    transition: all 0.3s ease-in-out;
  }

  :is(.dark .glass-morphism) {
    background: rgba(0, 0, 0, 0.25);
    box-shadow: 0 8px 32px 0 #27253a7a;
  }

  .glass-morphism-3d:hover {
    transform: rotateX(10deg) rotateY(4deg);
  }
</style>
