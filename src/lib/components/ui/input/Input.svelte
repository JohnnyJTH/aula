<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  let className: string | undefined | null = undefined;

  export let value: HTMLInputAttributes["value"] = undefined;
  export { className as class };

  let input: HTMLInputElement;
  let focused = false;
  let position = { x: 0, y: 0 };
  let opacity = 0;

  const handleMouseMove = (e: MouseEvent) => {
    if (!input || focused) return;

    const rect = input.getBoundingClientRect();

    position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleFocus = () => {
    focused = true;
    opacity = 1;
  };

  const handleBlur = () => {
    focused = false;
    opacity = 0;
  };

  const handleMouseEnter = () => {
    opacity = 1;
  };

  const handleMouseLeave = () => {
    opacity = 0;
  };
</script>

<div class="relative w-full">
  <input
    class={cn(
      "flex h-12 w-full rounded-md border border-slate-200 bg-neutral-50 text-slate-900 dark:border-slate-800 dark:bg-neutral-950 p-3.5 dark:text-slate-100 transition-colors duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[#adffb9] dark:focus:border-[#8678F9] focus:outline-none",
      className
    )}
    bind:value
    on:mousemove={handleMouseMove}
    on:focus={handleFocus}
    on:blur={handleBlur}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    {...$$restProps}
  />
  <input
    bind:this={input}
    disabled
    style={`
      -webkit-mask-image: radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent);
    `}
    style:opacity
    aria-hidden="true"
    class="pointer-events-none absolute left-0 top-0 z-10 h-12 w-full cursor-default rounded-md border border-[#adffb9] dark:border-[#8678F9] bg-[transparent] p-3.5 transition-opacity duration-500 placeholder:select-none"
  />
</div>
