<script setup lang="ts">
  useHead({
    title: 'Nuxt Forum',
  });

  const appError = ref<string>('');
  const creationStatus = ref<string>('');

  onMounted(async () => {
    try {
      const databaseCreation = await $fetch('/api/handleDatabase');

      if (databaseCreation.code === 201 && 'message' in databaseCreation) {
        creationStatus.value = databaseCreation.message;
      }
    } catch (error: any) {
      appError.value = error.data.error;
    }
  });
</script>

<template>
  <section id="home" class="flex flex-col w-full h-screen bg-slate-900 text-gray-300">
    <h1 v-show="appError !== ''" class="m-auto text-4xl text-red-300">{{ appError }}</h1>
    <h1 v-show="creationStatus !== ''" class="m-auto text-4xl text-green-300">{{ creationStatus }}</h1>
    <h1 class="m-auto text-4xl">Welcome !</h1>
  </section>
</template>
