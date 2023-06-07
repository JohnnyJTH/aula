<script>
  import { LightSwitch } from "$components/light-switch";
  import { MainNav, MobileNav } from "./nav";
</script>

<header class="bg-background/60 sticky top-0 z-40 w-full border-b shadow-sm backdrop-blur">
    <div class="container flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div class="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
            <div class="flex items-center space-x-1">
                <LightSwitch />
            </div>
        </div>
    </div>
</header>