<script lang="ts">
  import { goto } from "$app/navigation";
  import { Badge } from "$components/ui/badge";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$components/ui/card";
  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "$components/ui/hover-card";
  import { Skeleton } from "$components/ui/skeleton";
  import { authStore } from "$lib/stores";
  import { onMount } from "svelte";
  import { DateTime } from "luxon";
  import type { Assignment, RawAssignment } from "$lib/types/assignments";

  let loading = true;
  let rawAssignments: Assignment[] = [];
  let assignments: Assignment[] = [];

  onMount(async () => {
    const response = await fetch("https://api.betterlectio.dk/opgaver", {
      headers: {
        "lectio-cookie": $authStore.cookie,
      },
    });
    const data = await response.json();
    console.log(data);
    rawAssignments = data.map((assignment: RawAssignment) => ({
      title: assignment.opgavetitel,
      description: assignment.opgavenote,
      date: DateTime.fromFormat(assignment.frist, "d/M-yyyy HH:mm", {
        locale: "da",
      }),
      status: assignment.status,
      hold: assignment.hold,
      link: assignment.exerciseid,
    }));
    loading = false;
  });

  $: assignments = rawAssignments.filter((opgave) => {
    if (selected == "upcoming") {
      return opgave.status == "Afventer";
    } else if (selected == "finished") {
      return opgave.status == "Afleveret";
    } else if (selected == "missing") {
      return opgave.status == "Mangler";
    }
  });

  let selected: "upcoming" | "finished" | "missing" = "upcoming";
</script>

<div class="page-container">
  <div class="flex flex-col">
    <h1>Opgaver</h1>
    <div class="flex flex-row pb-4">
      <Badge
        on:click={() => {
          selected = "upcoming";
        }}
        class="text-base cursor-pointer mr-2"
        variant={selected == "upcoming" ? "default" : "outline"}>Kommende</Badge
      >
      <Badge
        on:click={() => {
          selected = "finished";
        }}
        class="text-base cursor-pointer"
        variant={selected == "finished" ? "default" : "outline"}>Færdige</Badge
      >
      <Badge
        on:click={() => {
          selected = "missing";
        }}
        class="text-base cursor-pointer mr-2"
        variant={selected == "missing" ? "default" : "outline"}>Mangler</Badge
      >
    </div>
    {#if loading}
      <Skeleton class="w-full h-36 rounded-[10px] mb-4" />
      <Skeleton class="w-full h-36 rounded-[10px] mb-4" />
      <Skeleton class="w-full h-36 rounded-[10px]" />
    {:else if assignments.length > 0}
      {#each assignments.reverse() as assignment}
        <div class="not-prose">
          <HoverCard>
            <HoverCardTrigger>
              <Card
                class="mb-4"
                on:click={() => goto(assignment.link)}
                animate={true}
              >
                <CardHeader>
                  <CardTitle>{assignment.title}</CardTitle>
                  <CardDescription>{assignment.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Badge>{assignment.date.toRelative()}</Badge>
                </CardFooter>
              </Card>
            </HoverCardTrigger>
            <HoverCardContent>
              <Card class="mb-4">
                <CardHeader>
                  <CardTitle>{assignment.title}</CardTitle>
                  <CardDescription>{assignment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  Status: {assignment.status} <br />
                  Hold: {assignment.hold} <br />
                  Frist: {assignment.date.toLocaleString(DateTime.DATETIME_MED)}
                  ({assignment.date.toRelative()}) <br />
                </CardContent>
              </Card>
            </HoverCardContent>
          </HoverCard>
        </div>
      {/each}
    {:else}
      <p class="text-center">Du har ingen opgaver.</p>
    {/if}
  </div>
</div>
