<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div
	class={cn("animate-pulse rounded-md bg-slate-300 dark:bg-gray-950", className)}
	{...$$restProps}
/>
