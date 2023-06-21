<script lang="ts">
  import { Skeleton } from "$components/ui/skeleton";
  import { Timeline, TimelineItem } from "$components/ui/timeline";
  import { authStore } from "$lib/stores";
  import type { Document, RawDocument } from "$lib/types/documents";
  import type { Form, RawForm } from "$lib/types/forms";
  import type { Lesson, RawLesson } from "$lib/types/lesson";
  import type { Message, RawMessage } from "$lib/types/messages";
  import type { News, RawNews } from "$lib/types/news";
  import { constructInterval } from "$lib/utilities";
  import { decodeUserID } from "$lib/utilities/cookie";
  import { DateTime } from "luxon";
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";

  let loading = true;
  let lessons: Lesson[] = [];
  let news: News[] = [];
  let messages: Message[] = [];
  let documents: Document[] = [];
  let forms: Form[] = [];
  onMount(async () => {
    const response = await fetch("https://api.betterlectio.dk/forside", {
      headers: {
        "lectio-cookie": $authStore.cookie,
      },
    });
    const data = (await response.json()) as {
      skema: RawLesson[];
      aktuelt: RawNews[];
      kommunikation: {
        beskeder: RawMessage[];
        dokumenter: RawDocument[];
      };
      undervisning: {
        spørgeskemaer: RawForm[];
      };
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

    messages = data.kommunikation.beskeder.map((message) => {
      return {
        sender: message.afsender,
        date: DateTime.fromFormat(message.dato, "d/M-yyyy HH:mm", {
          locale: "da",
        }),
        id: +message.id,
        title: message.navn,
      };
    });

    documents = data.kommunikation.dokumenter.map((document) => {
      return {
        author: document.afsender,
        date: DateTime.fromFormat(document.dato, "d/M-yyyy HH:mm", {
          locale: "da",
        }),
        id: +document.id,
        title: document.navn,
      };
    });

    forms = data.undervisning.spørgeskemaer.map((form) => {
      return {
        date: DateTime.fromFormat(form.dato, "d/M-yyyy HH:mm", {
          locale: "da",
        }),
        id: +form.id,
        title: form.navn,
      };
    });

    loading = false;
  });
</script>

<div class="page-container">
  <div class="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4">
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
    <div
      class="lg:col-span-1 lg:row-start-2 bg-white dark:bg-black rounded-2xl p-6"
    >
      <h1>Beskeder</h1>
      {#if loading}
        loading
      {:else if messages.length > 0}
        {#each messages as message}
          <a
            target="_blank"
            href={`https://www.lectio.dk/lectio/${
              $authStore.school
            }/beskeder2.aspx?type=showthread&id=${
              message.id
            }&elevid=${decodeUserID($authStore.cookie)}`}
            class="no-underline flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-900 hover:rounded-2xl px-4"
          >
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-semibold text-gray-900 truncate dark:text-white"
              >
                {message.title}
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                {message.sender}
              </p>
            </div>
            <div
              class="inline-flex items-center text-sm text-gray-900 dark:text-white"
            >
              {message.date.toLocaleString(DateTime.DATE_SHORT)}
            </div>
          </a>
        {/each}
      {:else}
        <p class="text-center">Ingen nye beskeder.</p>
      {/if}
    </div>
    <div
      class="lg:col-span-1 lg:row-start-2 bg-white dark:bg-black rounded-2xl p-6"
    >
      <h1>Dokumenter</h1>
      {#if loading}
        loading
      {:else if documents.length > 0}
        {#each documents as document}
          <a
            target="_blank"
            href={`https://www.lectio.dk/lectio/${$authStore.school}/dokumenthent.aspx?documentid=${document.id}`}
            class="no-underline flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-900 hover:rounded-2xl px-4"
          >
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-semibold text-gray-900 truncate dark:text-white"
              >
                {document.title}
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                {document.author}
              </p>
            </div>
            <div
              class="inline-flex items-center text-sm text-gray-900 dark:text-white"
            >
              {document.date.toLocaleString(DateTime.DATE_SHORT)}
            </div>
          </a>
        {/each}
      {:else}
        <p class="text-center">Ingen nye dokumenter.</p>
      {/if}
    </div>
    <div
      class="lg:col-span-1 lg:row-start-2 bg-white dark:bg-black rounded-2xl p-6"
    >
      <h1>Spørgeskemaer</h1>
      {#if loading}
        loading
      {:else if forms.length > 0}
        {#each forms as form}
          <a
            target="_blank"
            href={`https://www.lectio.dk/lectio/681/spoergeskema/spoergeskema_besvar.aspx?id=${form.id}`}
            class="no-underline flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-900 hover:rounded-2xl px-4"
          >
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-semibold text-gray-900 truncate dark:text-white"
              >
                {form.title}
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                {form.date.toLocaleString(DateTime.DATETIME_MED)} ({form.date.toRelative()})
              </p>
            </div>
          </a>
        {/each}
      {:else}
        <p class="text-center">Ingen nye spørgeskemaer.</p>
      {/if}
    </div>
  </div>
</div>
