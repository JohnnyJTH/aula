<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { Skeleton } from "$components/ui/skeleton";
  import type { Assignment, RawAssignment } from "$lib/types/assignments";
  import { authStore } from "$lib/stores";
  import { DateTime } from "luxon";
  import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$components/ui/card";
  import SvelteMarkdown from "svelte-markdown";

  export let data: PageData;

  let loading = true;
  let assignment: Assignment;
  onMount(async () => {
    const response = await fetch(
      `https://api.betterlectio.dk/opgave?exerciseid=${data.id}`,
      {
        headers: {
          "lectio-cookie": $authStore.cookie,
        },
      }
    );
    const json = (await response.json()) as RawAssignment;
    console.log(json.oplysninger.opgavebeskrivelse);
    assignment = {
      title: json.oplysninger.opgavetitel,
      description: json.oplysninger.opgavenote,
      details: json.oplysninger.opgavebeskrivelse.replace(")", ")<br>"),
      date: DateTime.fromFormat(
        json.oplysninger.afleveringsfrist,
        "d/M-yyyy HH:mm",
        {
          locale: "da",
        }
      ),
      class: json.oplysninger.hold,
      documents: json.opgave_indlæg.map((document) => ({
        // @ts-ignore
        name: document.dokument.match(/\[(.*?)\]/)[1],
        // @ts-ignore
        url: document.dokument.match(/\((.*?)\)/)[1],
        date: DateTime.fromFormat(document.tidspunkt, "d/M-yyyy HH:mm", {
          locale: "da",
        }),
        user: {
          id: document.bruger.bruger_id,
          name: document.bruger.navn,
        },
      })),
    };
    loading = false;
  });
</script>

<div class="page-container">
  {#if loading}
    <Skeleton class="w-1/2 rounded-xl h-[2.2em]" />
    <Skeleton class="!mt-1 w-3/4 rounded-xl h-[1em]" />
    <Skeleton class="!mt-1 w-3/4 rounded-xl h-[1em]" />
    <Skeleton class="!mt-2 w-1/4 rounded-xl h-[1.5em]" />
    <Skeleton class="!mt-1 w-3/4 rounded-xl h-[1em]" />
    <Skeleton class="!mt-24 w-1/4 rounded-xl h-[2em]" />
    <Skeleton class="!mt-1 w-1/2 rounded-xl h-[1em]" />
    <Skeleton class="!mt-4 w-full rounded-[10px] h-[8em]" />
    <Skeleton class="!mt-4 w-full rounded-[10px] h-[8em]" />
    <Skeleton class="!mt-4 w-full rounded-[10px] h-[8em]" />
  {:else}
    <section>
      <h1 class="!mb-0">{assignment.title}</h1>
      <p class="!mt-0 !mb-0">{assignment.description}</p>
      {#if assignment.details}
        <h3 class="!mt-1 !mb-0">Opgavebeskrivelse</h3>
        <SvelteMarkdown source={assignment.details} />
      {/if}
    </section>
    <section>
      <h2 class="!mb-0">Afleveringer</h2>
      <p>
        Afleveringsfrist er {assignment.date.toLocaleString(
          DateTime.DATETIME_MED
        )} ({assignment.date.toRelative()})
      </p>
      {#if assignment.documents}
        {#each assignment.documents as document}
          <a class="no-underline" href={document.url}>
            <Card class="mb-4">
              <CardHeader>
                <CardTitle>{document.name}</CardTitle>
                <CardDescription>
                  {document.user.name}
                  <br />
                  {document.date.toLocaleString(DateTime.DATETIME_MED)}
                </CardDescription>
              </CardHeader>
            </Card>
          </a>
        {/each}
      {:else}
        Ingen afleveringer endnu
      {/if}
    </section>
  {/if}
</div>
