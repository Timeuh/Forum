<script setup lang="ts">
  import {useForumStore} from '~/stores/forum.store';

  const forumStore = useForumStore();
  const {forums, hasForums} = storeToRefs(forumStore);
  const {chargeForums} = forumStore;

  onMounted(async () => {
    await chargeForums();
  });
</script>

<template>
  <section v-show="hasForums" class="w-full h-full flex flex-col items-center justify-center space-y-8 text-slate-900">
    <div
      v-for="forum in forums"
      class="shadow-md shadow-gray-200 bg-gray-200 rounded-lg space-x-20 p-4 h-fit text-slate-800 flex flex-row w-2/3 justify-center items-center"
    >
      <h1 class="text-2xl font-bold">{{ forum.name }}</h1>
    </div>
  </section>
</template>
