<script setup lang="ts">
  import formatDate from '../../common/functions/formatDate';
  import {useSubjectStore} from '~/stores/subject.store';
  import SubjectForm from '~/components/subject/SubjectForm.vue';

  const route = useRoute();

  const forumStore = useForumStore();
  const {currentForum} = storeToRefs(forumStore);
  const {fetchForum} = forumStore;

  const {toggleCreationForm} = useSubjectStore();

  await fetchForum(route.params.id as string);
</script>

<template>
  <section
    class="min-h-screen h-fit py-8 w-full flex flex-col items-center justify-center space-y-8 bg-slate-900 text-gray-200"
  >
    <NuxtLink
      href="/"
      class="align-self-start ps-12 pt-20 flex flex-row items-center justify-center space-x-4 hover:scale-110 transition duration-300 ease-in-out"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
      <span class="text-lg">Retour</span>
    </NuxtLink>
    <div
      class="cursor-pointer border-b-2 border-purple-400 rounded-lg p-4 h-fit flex flex-row w-2/3 justify-center items-center"
    >
      <h1 class="text-4xl font-bold">Forum {{ currentForum.forum.name }}</h1>
    </div>
    <div class="flex flex-row items-center justify-between w-2/3">
      <h2>Créé le {{ formatDate(currentForum.forum.created_at) }}</h2>
      <div class="flex flex-row items-center justify-between space-x-2">
        <h1>Vous ne trouvez pas un sujet ?</h1>
        <button @click="toggleCreationForm" class="text-purple-900 font-bold">Créez-le !</button>
      </div>
    </div>
    <div
      v-show="currentForum.subjects.length === 0"
      class="space-x-2 shadow-md justify-center shadow-gray-200 bg-gray-200 rounded-lg p-4 h-fit text-slate-800 flex flex-row w-2/3 items-center"
    >
      <h1 class="text-2xl">Il n'y a aucun sujet dans ce forum,</h1>
      <button @click="toggleCreationForm" class="text-2xl text-purple-900 font-bold">créez-en un !</button>
    </div>
    <SubjectForm :forum-id="route.params.id as string" />
    <NuxtLink
      :href="`/subject/${subject.id}`"
      v-for="subject in currentForum.subjects"
      class="hover:scale-110 transition duration-300 ease-in-out shadow-md cursor-pointer shadow-gray-200 bg-gray-200 rounded-lg space-x-20 p-4 h-fit text-slate-800 flex flex-row w-2/3 justify-around items-center"
    >
      <div>
        <h1 class="text-2xl font-bold">{{ subject.name }}</h1>
        <h2 class="text-md text-center">Mis à jour le {{ formatDate(subject.created_at) }}</h2>
      </div>
    </NuxtLink>
  </section>
</template>
