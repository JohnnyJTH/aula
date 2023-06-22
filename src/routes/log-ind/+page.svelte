<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$components/ui/card";
  import { Input } from "$components/ui/input";
  import { Label } from "$components/ui/label";
  import { Switch } from "$components/ui/switch";
  import { authStore } from "$lib/stores";
  import { Loader } from "lucide-svelte";
  import { DateTime } from "luxon";
  import { onMount } from "svelte";

  let saveSchool = true;
  $: if (saveCredentials) {
    saveCredentials = saveCredentials; // reactivity :)
    saveSchool = true;
  }
  let saveCredentials = false;

  let schools: any[] = [];
  let school = 0;
  onMount(async () => {
    schools = await fetch("https://api.betterlectio.dk/skoler").then((res) =>
      res.json()
    );
    school = $authStore.school;
  });

  let username = "";
  let password = "";
  let loading = false;
  async function login() {
    loading = true;
    const response = await fetch("https://api.betterlectio.dk/auth", {
      headers: {
        brugernavn: username,
        adgangskode: password,
        skoleid: String(school),
      },
    });
    if (response.ok) {
      if (saveSchool) $authStore.school = school;
      if (saveCredentials) {
        $authStore.username = username;
        $authStore.password = password;
      }
      $authStore.cookie = response.headers.get("set-lectio-cookie") ?? "";
      $authStore.lastLogin = DateTime.now().toISO();
      loading = false;
      goto("/");
    }
    username = "";
    password = "";
    school = 0;
    loading = false;
  }
</script>

<div class="page-container">
  <Card>
    <CardHeader>
      <CardTitle>Log ind</CardTitle>
      <CardDescription>Log ind med din Lectio konto nedenfor.</CardDescription>
    </CardHeader>
    <CardContent class="grid gap-4">
      <div class="grid gap-2">
        <Label for="username">Brugernavn</Label>
        <Input
          bind:value={username}
          id="username"
          type="text"
          autocomplete="username"
        />
      </div>
      <div class="grid gap-2">
        <Label for="password">Kodeord</Label>
        <Input
          bind:value={password}
          id="password"
          type="password"
          autocomplete="current-password"
        />
      </div>
      <div class="grid gap-2">
        <Label for="school">Skole</Label>
        <select bind:value={school} id="school">
          <option value="0" disabled selected={school == 0}
            >Vælg skole...</option
          >
          {#each Object.entries(schools) as [key, data]}
            <option value={data.id} selected={school == data.id}
              >{data.skole}</option
            >
          {/each}
        </select>
      </div>
      <div class="mt-4 flex items-center justify-between space-x-2">
        <Label for="save-school" class="flex flex-col space-y-1">
          <span>Gem Skole</span>
          <span class="font-normal leading-snug text-muted-foreground">
            Gem skolen, så du ikke behøver at vælge den næste gang du logger
            ind.
          </span>
        </Label>
        <Switch
          id="save-school"
          bind:rootChecked={saveSchool}
          rootDisabled={saveCredentials}
        />
      </div>
      <div class="mt-4 flex items-center justify-between space-x-2">
        <Label for="save-credentials" class="flex flex-col space-y-1">
          <span>Gem Oplysninger</span>
          <span class="font-normal leading-snug text-muted-foreground">
            Gem dine oplysninger, så du ikke behøver at skrive dem næste gang du
            logger ind.
          </span>
        </Label>
        <Switch id="save-credentials" bind:rootChecked={saveCredentials} />
      </div>
    </CardContent>
    <CardFooter>
      <Button
        on:click={login}
        disabled={loading || !username || !password || !school}
        class="w-full"
      >
        {#if loading}
          <Loader class="mr-2" />
        {/if}
        Log ind
      </Button>
    </CardFooter>
  </Card>
</div>
