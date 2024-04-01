<script setup lang="ts">
  import {useForumStore} from '~/stores/forum.store';

  useHead({
    title: 'Nuxt Forum',
  });

  const appError = ref<string>('');
  const creationStatus = ref<string>('');
  const {chargeForums, hasForums} = useForumStore();

  onMounted(async () => {
    try {
      const databaseCreation = await $fetch('/api/handleDatabase');

      if (databaseCreation.code === 201 && 'message' in databaseCreation) {
        creationStatus.value = databaseCreation.message;
      }

      await chargeForums();
    } catch (error: any) {
      appError.value = error.data.error;
    }
  });
</script>

<template>
  <section
    id="home"
    class="flex flex-col w-full h-screen bg-slate-900 text-gray-300 justify-center items-center space-y-12"
  >
    <h1 class="text-4xl">Bienvenue sur Nuxt Forum !</h1>
    <h1 v-show="appError !== ''" class="text-4xl text-red-300">{{ appError }}</h1>
    <div v-show="!hasForums" class="flex flex-row space-x-2 items-center">
      <h2 class="text-2xl">Il n'y a aucun forum pour le moment,</h2>
      <button class="text-2xl text-purple-300 font-bold">créez-en un !</button>
    </div>
    <h1 v-show="creationStatus !== ''" class="text-4xl text-green-300">{{ creationStatus }}</h1>
  </section>
</template>
