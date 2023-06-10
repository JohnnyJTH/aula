<script lang="ts">
  import { Skeleton } from "$components/ui/skeleton";
  import { Timeline, TimelineItem } from "$components/ui/timeline";
  import { authStore } from "$lib/stores";
  import type { Lesson, RawLesson } from "$lib/types/lesson";
  import type { News, RawNews } from "$lib/types/news";
  import { constructInterval } from "$lib/utilities";
  import { DateTime } from "luxon";
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";

  let loading = true;
  let lessons: Lesson[] = [];
  let news: News[] = [];
  onMount(async () => {
    const response = await fetch("https://api.betterlectio.dk/forside", {
      headers: {
        "lectio-cookie": $authStore.cookie,
      },
    });
    const data = (await response.json()) as {
      skema: RawLesson[];
      aktuelt: RawNews[];
    };

    lessons = data.skema.map((lesson) => {
      return {
        id: lesson.absid,
        name:
          lesson.navn
            ?.replace("prv.", "prøve")
            .replace("mdt.", "mundtlig")
            .replace("skr.", "skriftlig") ?? "",
        class: lesson.hold ?? "",
        status: lesson.status,
        room: lesson.lokale ?? "",
        note: lesson.andet ?? "",
        interval: constructInterval(lesson.tidspunkt ?? ""),
      };
    });

    news = data.aktuelt.map((item) => {
      return {
        description: item.text.replace("@", "@<!-- -->"), // Without this, the email gets obfuscated with random hex characters. https://github.com/github/markup/issues/1168
      };
    });

    loading = false;
  });
</script>

<div class="page-container">
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <div class="lg:col-span-2 bg-white dark:bg-black rounded-2xl p-6">
      <h1>Skema</h1>
      {#if loading}
        <Skeleton class="mb-[0.25em] w-2/4 h-6 rounded-xl" />
        <Skeleton class="mb-2 w-1/4 h-[0.875em] rounded-xl" />
        <Skeleton class="mt-[1.25em] mb-[0.5em] w-3/4 h-[1em] rounded-xl" />
        <Skeleton class="w-3/4 h-[1em] rounded-xl" />
        <Skeleton class="mt-8 mb-[0.25em] w-2/4 h-6 rounded-xl" />
        <Skeleton class="mb-2 w-1/4 h-[0.875em] rounded-xl" />
        <Skeleton class="mt-[1.25em] mb-[0.5em] w-3/4 h-[1em] rounded-xl" />
        <Skeleton class="w-3/4 h-[1em] rounded-xl" />
        <Skeleton class="mt-8 mb-[0.25em] w-2/4 h-6 rounded-xl" />
        <Skeleton class="mb-2 w-1/4 h-[0.875em] rounded-xl" />
        <Skeleton class="mt-[1.25em] mb-[0.5em] w-3/4 h-[1em] rounded-xl" />
        <Skeleton class="w-3/4 h-[1em] rounded-xl" />
      {:else if lessons.length > 0}
        {#each lessons as lesson}
          <Timeline class="ml-3">
            <TimelineItem
              class="mb-10"
              title={lesson.name != "" ? lesson.name : lesson.class}
              description={`${
                lesson.note != ""
                  ? `${lesson.note}<br>${lesson.room}`
                  : lesson.room
              }`}
              time={lesson.interval.toLocaleString(DateTime.DATETIME_MED)}
            />
          </Timeline>
        {/each}
      {:else}
        <p class="text-center">Ingen kommende lektioner.</p>
      {/if}
    </div>
    <div class="lg:col-span-1 bg-white dark:bg-black rounded-2xl p-6">
      <h1>Aktuelt</h1>
      {#if loading}
        <Skeleton class="mt-[2.25em] w-3/4 h-[1em]" />
        <Skeleton class="mt-[1em] w-full h-[1em]" />
        <Skeleton class="mt-[1em] w-full h-[1em]" />
        <Skeleton class="mt-[2.25em] w-3/4 h-[1em]" />
        <Skeleton class="mt-[1em] w-full h-[1em]" />
        <Skeleton class="mt-[1em] w-full h-[1em]" />
        <Skeleton class="mt-[2.25em] w-3/4 h-[1em]" />
        <Skeleton class="mt-[1em] w-full h-[1em]" />
        <Skeleton class="mt-[1em] w-full h-[1em]" />
      {:else if news.length > 0}
        {#each news as item}
          <SvelteMarkdown source={item.description} />
        {/each}
      {:else}
        <p class="text-center">Ingen aktuelle nyheder.</p>
      {/if}
    </div>
  </div>
</div>
