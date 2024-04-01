<script setup lang="ts">
  import {useForumStore} from '~/stores/forum.store';

  const forumStore = useForumStore();
  const {hasForums} = storeToRefs(forumStore);
  const {toggleCreationForm} = forumStore;
</script>

<template>
  <div v-show="!hasForums" class="flex flex-col items-center space-y-8">
    <h1 class="text-4xl">Bienvenue sur Nuxt Forum !</h1>
    <div class="flex flex-row space-x-2 items-center">
      <h2 class="text-2xl">Il n'y a aucun forum pour le moment,</h2>
      <button class="text-2xl text-purple-300 font-bold" @click="toggleCreationForm">créez-en un !</button>
    </div>
  </div>
</template>
