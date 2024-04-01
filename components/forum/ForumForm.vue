<script setup lang="ts">
  import {useForumStore} from '~/stores/forum.store';

  const forumStore = useForumStore();
  const {displayCreationForm} = storeToRefs(forumStore);
</script>

<template>
  <div v-show="displayCreationForm">
    <h2>Formulaire de création</h2>
  </div>
</template>
