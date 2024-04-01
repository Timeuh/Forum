<script setup lang="ts">
  import {useForumStore} from '~/stores/forum.store';
  import formatDate from '../../common/functions/formatDate';

  const forumStore = useForumStore();
  const {forums, hasForums} = storeToRefs(forumStore);
  const {chargeForums, toggleCreationForm} = forumStore;

  onMounted(async () => {
    await chargeForums();
  });
</script>

<template>
  <section v-show="hasForums" class="w-full h-fit flex flex-col items-center justify-center space-y-8 text-slate-900">
    <div class="flex flex-row space-x-2 items-center">
      <h2 class="text-2xl text-gray-200">Si vous ne trouvez pas un forum,</h2>
      <button class="text-2xl text-purple-300 font-bold" @click="toggleCreationForm">créez-le !</button>
    </div>
    <NuxtLink
      :href="`/forum/${forum.id}`"
      v-for="forum in forums"
      class="hover:scale-110 transition duration-300 ease-in-out shadow-md cursor-pointer shadow-gray-200 bg-gray-200 rounded-lg space-x-20 p-4 h-fit text-slate-800 flex flex-row w-2/3 justify-around items-center"
    >
      <div>
        <h1 class="text-2xl font-bold">{{ forum.name }}</h1>
        <h2 class="text-md">créé le {{ formatDate(forum.created_at) }}</h2>
      </div>
      <h2 class="text-xl">{{ forum.subject_count === 0 ? 'Aucun' : forum.subject_count }} sujet</h2>
    </NuxtLink>
  </section>
</template>
