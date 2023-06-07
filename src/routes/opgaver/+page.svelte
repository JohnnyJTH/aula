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

  let opgaver = [
    {
      title: "Opgave 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultrices, nunc nunc ali",
      status: "finished",
      hold: "L1d kit",
      link: "https://google.com",
    },
    {
      title: "Opgave 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultrices, nunc nunc ali",
      status: "missing",
      hold: "L1d En",
      link: "https://google.com",
    },
    {
      title: "Opgave 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultrices, nunc nunc ali",
      status: "finished",
      hold: "L1d kit",
      link: "https://google.com",
    },
  ];

  let selected: "upcoming" | "finished" | "missing" = "upcoming";
</script>

<div class="container">
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
    {#each opgaver as opgave}
      <div class="not-prose">
        <HoverCard>
          <HoverCardTrigger>
            <Card
              class="mb-4"
              on:click={() => goto(opgave.link)}
              animate={true}
            >
              <CardHeader>
                <CardTitle>{opgave.title}</CardTitle>
                <CardDescription>{opgave.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Badge>om 3 dage</Badge>
              </CardFooter>
            </Card>
          </HoverCardTrigger>
          <HoverCardContent>
            <Card class="mb-4">
              <CardHeader>
                <CardTitle>{opgave.title}</CardTitle>
                <CardDescription>{opgave.description}</CardDescription>
              </CardHeader>
              <CardContent>
                Status: {opgave.status} <br />
                Hold: {opgave.hold} <br />
                Frist: 4/6-2023 22:00 (om 3 dage) <br />
              </CardContent>
            </Card>
          </HoverCardContent>
        </HoverCard>
      </div>
    {/each}
  </div>
</div>
