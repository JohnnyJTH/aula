<script lang="ts">
  import { School, SidebarOpen } from "lucide-svelte";
  import { Button } from "$components/ui/button";
  import { Sheet, SheetContent, SheetTrigger } from "$components/ui/sheet";
  import MobileLink from "./MobileLink.svelte";
  import { navItems } from "./links";

  export let open = false;
</script>

<Sheet bind:open>
  <SheetTrigger>
    <Button
      variant="ghost"
      class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
    >
      <SidebarOpen class="h-6 w-6" />
      <span class="sr-only">Toggle Menu</span>
    </Button>
  </SheetTrigger>
  <SheetContent size="xl" position="left" class="pr-0">
    <MobileLink href="/" class="flex items-center !text-foreground" bind:open>
      <School class="mr-2 h-4 w-4" />
      <span class="font-bold">Aula</span>
    </MobileLink>
    <div class="my-4 h-[calc(100vh-8rem)] pb-10 pl-6 overflow-auto">
      <div class="flex flex-col space-y-3">
        {#each navItems as navItem, index (navItem + index.toString())}
          {#if navItem.href}
            <MobileLink href={navItem.href} bind:open>
              {navItem.title}
            </MobileLink>
          {/if}
        {/each}
      </div>
    </div>
  </SheetContent>
</Sheet>
