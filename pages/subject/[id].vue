<script setup lang="ts">
  import goBack from '~/common/functions/goBack';
  import formatDate from '../../common/functions/formatDate';

  const route = useRoute();
  const subjectId = route.params.id as string;

  const userStore = useUserStore();
  const {isLogged, isAdmin} = storeToRefs(userStore);

  const subjectStore = useSubjectStore();
  const {subject} = storeToRefs(subjectStore);
  const {getSubject, deleteSubject} = subjectStore;

  const {toggleAnswerForm} = useMessageStore();

  await getSubject(Number(subjectId));

  const submitDeletion = async () => {
    await deleteSubject(Number(subjectId));
    goBack();
  };
</script>

<template>
  <section
    class="min-h-screen h-fit py-8 w-full flex flex-col items-center justify-center space-y-8 bg-slate-900 text-gray-200"
  >
    <button
      @click="goBack"
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
    </button>
    <div
      class="relative cursor-pointer border-b-2 border-purple-400 rounded-lg p-4 h-fit flex flex-row w-2/3 justify-center items-center"
    >
      <h1 class="text-4xl font-bold">Sujet {{ subject.subject.name }}</h1>
      <svg
        v-show="isAdmin"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="absolute right-6 stroke-red-500 cursor-pointer"
        @click="submitDeletion"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
    </div>
    <div class="flex flex-row items-center justify-between w-2/3">
      <h2>Créé le {{ formatDate(subject.subject.created_at) }}</h2>
      <div class="flex flex-row items-center justify-between">
        <button @click="toggleAnswerForm" v-show="isLogged" class="text-purple-900 font-bold text-xl">Répondre</button>
      </div>
    </div>
    <MessageForm :subjectId="subjectId" />
    <Message v-for="message in subject.messages" :message="message" />
  </section>
</template>
