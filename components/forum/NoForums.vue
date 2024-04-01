<script setup lang="ts">
  import {useForumStore} from '~/stores/forum.store';

  const {hasForums} = useForumStore();
</script>

<template>
  <div v-show="!hasForums" class="flex flex-row space-x-2 items-center">
    <h2 class="text-2xl">Il n'y a aucun forum pour le moment,</h2>
    <button class="text-2xl text-purple-300 font-bold">créez-en un !</button>
  </div>
</template>
