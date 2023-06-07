<script lang="ts">
	import type { HoverCardContentProps } from "radix-svelte";
	import { HoverCard as HoverCardPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let align: HoverCardContentProps["align"] = undefined;
	export let sideOffset: HoverCardContentProps["sideOffset"] = undefined;
</script>

<HoverCardPrimitive.Portal>
	<HoverCardPrimitive.Content
		{align}
		{sideOffset}
		class={cn(
			"z-50 w-96 animate-in zoom-in-90",
			className
		)}
		{...$$restProps}
	>
		<slot />
	</HoverCardPrimitive.Content>
</HoverCardPrimitive.Portal>
