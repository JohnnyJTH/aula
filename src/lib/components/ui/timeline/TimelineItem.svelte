<script lang="ts">
  import { Calendar } from "lucide-svelte";

  let className: string | undefined | null = undefined;
  export { className as class };

  export let title: string;
  export let titleNote: string | undefined = undefined;
  export let time: string;
  export let description: string;
  export let link: { url: string; name: string } | undefined = undefined;
</script>

<li class={className}>
  <span
    class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
  >
    <Calendar class="w-4 h-4 text-blue-800 dark:text-blue-300" />
  </span>
  <h3
    class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white"
  >
    {title}
    {#if titleNote}<span
        class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3"
        >{titleNote}</span
      >{/if}
  </h3>
  <time
    class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
    >{time}</time
  >
  <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
    {@html description}
  </p>
  {#if link}
    <a
      href={link.url}
      class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      >
      {link.name}</a
    >
  {/if}
</li>
