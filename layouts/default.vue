<template>
  <div>
    <TheNavbar />
    <main>
      <slot />
    </main>
    <TheFooter />
    <!-- Fixed guide sits where hero cards + bot live; hide on home to avoid clutter / scrollbar-like cue -->
    <ClientOnly>
      <ScrollRobotGuide v-if="route.path !== '/'" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
