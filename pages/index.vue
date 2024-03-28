<script setup lang="ts">
  onMounted(async () => {
    const databaseCreation = await $fetch('/api/handleDatabase');
    console.log(databaseCreation);
  });
</script>

<template>
  <section id="home" class="flex w-full h-screen">
    <h1 class="m-auto text-4xl">Welcome !</h1>
  </section>
</template>
