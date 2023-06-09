<script lang="ts">
  import { Badge } from "$components/ui/badge";
  import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$components/ui/card";
  import { Skeleton } from "$components/ui/skeleton";
  import { authStore } from "$lib/stores";
  import type { Homework, RawHomework } from "$lib/types/homework";
  import { DateTime } from "luxon";
  import { onMount } from "svelte";

  let loading = true;
  let homework: Homework[] = [];
  onMount(async () => {
    await new Promise((r) => setTimeout(r, 2000));
    // const response = await fetch("https://api.betterlectio.dk/skema", {
    //   headers: {
    //     "lectio-cookie": $authStore.cookie,
    //   },
    // });
    // const data = (await response.json()) as RawHomework[];
    // console.log(data);
    // list of dummy rawhomework
    homework = [
      {
        date: DateTime.now()
          .plus({ days: Math.random() * 10 })
          .setLocale("da"),
        lesson: {
          id: "1234",
          name: "Perspektivering bla bla",
          class: "L1d DA",
        },
        homework: "Lav en opgave",
      },
      {
        date: DateTime.now()
          .plus({ days: Math.random() * 10 })
          .setLocale("da"),
        lesson: {
          id: "1234",
          name: "Perspektivering bla bla",
          class: "L1d DA",
        },
        homework: "Lav en opgave",
      },
      {
        date: DateTime.now()
          .plus({ days: Math.random() * 10 })
          .setLocale("da"),
        lesson: {
          id: "1234",
          name: "Perspektivering bla bla",
          class: "L1d DA",
        },
        homework: "Lav en opgave",
      },
    ];
    loading = false;
  });
</script>

<div class="page-container">
  <h1>Lektier</h1>
  {#if loading}
    <Skeleton class="w-full h-24 rounded-xl" />
  {:else if homework.length > 0}
    {#each homework as item}
      <div class="not-prose">
        <a href="/lektier/{item.lesson.id}">
          <Card>
            <CardHeader>
              <CardTitle>{item.lesson.name}</CardTitle>
              <CardDescription>{item.homework}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Badge>{item.date.toRelative()}</Badge>
            </CardFooter>
          </Card>
        </a>
      </div>
    {/each}
  {:else}
    <p class="text-center">Ingen lektier</p>
  {/if}
</div>
