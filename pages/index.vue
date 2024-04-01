<script setup lang="ts">
  import {useForumStore} from '~/stores/forum.store';
  import NoForums from '~/components/forum/NoForums.vue';
  import ForumForm from '~/components/forum/ForumForm.vue';

  useHead({
    title: 'Nuxt Forum',
  });

  const appError = ref<string>('');
  const creationStatus = ref<string>('');

  const {chargeForums} = useForumStore();

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
    <NoForums />
    <ForumForm />
    <h1 v-show="appError !== ''" class="text-4xl text-red-300">{{ appError }}</h1>
    <h1 v-show="creationStatus !== ''" class="text-4xl text-green-300">{{ creationStatus }}</h1>
  </section>
</template>
