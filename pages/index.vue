<script setup lang="ts">
  useHead({
    title: 'Nuxt Forum',
  });

  onMounted(async () => {
    const databaseCreation = await $fetch('/api/handleDatabase');
    console.log(databaseCreation);
  });
</script>

<template>
  <section id="home" class="flex w-full h-screen bg-slate-900 text-gray-300">
    <h1 class="m-auto text-4xl">Welcome !</h1>
  </section>
</template>
