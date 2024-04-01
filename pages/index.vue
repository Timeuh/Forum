<script setup lang="ts">
  import NoForums from '~/components/forum/NoForums.vue';
  import ForumForm from '~/components/forum/ForumForm.vue';
  import ForumsView from '~/components/forum/ForumsView.vue';

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
  <section
    id="home"
    class="flex flex-col w-full min-h-screen h-fit py-8 bg-slate-900 text-gray-300 justify-center items-center space-y-12"
  >
    <NoForums />
    <ForumForm />
    <ForumsView />
    <h1 v-show="appError !== ''" class="text-4xl text-red-300">{{ appError }}</h1>
    <h1 v-show="creationStatus !== ''" class="text-4xl text-green-300">{{ creationStatus }}</h1>
  </section>
</template>
