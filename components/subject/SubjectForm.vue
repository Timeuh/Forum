<script setup lang="ts">
  import {useSubjectStore} from '~/stores/subject.store';

  const props = defineProps<{
    forumId: string;
  }>();

  const subjectStore = useSubjectStore();
  const {displayCreationForm} = storeToRefs(subjectStore);
  const {toggleCreationForm, createSubject} = subjectStore;

  const userStore = useUserStore();
  const {isLogged, user} = storeToRefs(userStore);

  const {fetchForum} = useForumStore();

  const name = ref<string>('');
  const content = ref<string>('');
  const error = ref<string>('');

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    error.value = '';
    await createSubject(name.value, content.value, Number(props.forumId), user.value.id);
    toggleCreationForm();
    fetchForum(props.forumId);
  };
</script>

<template>
  <form
    @submit="handleSubmit"
    v-show="displayCreationForm"
    class="relative shadow-md shadow-gray-200 bg-gray-200 rounded-lg space-y-12 p-4 h-fit text-slate-800 flex flex-col w-2/3 justify-center items-center"
  >
    <div
      @click="toggleCreationForm"
      class="cursor-pointer size-8 font-black rounded-lg bg-red-500 flex flex-col items-center justify-center absolute top-4 left-4"
    >
      X
    </div>
    <h2 v-show="!isLogged" class="text-3xl text-red-500 font-bold">Vous devez être connecté pour créer un sujet</h2>
    <div v-show="isLogged" class="space-y-12 h-fit flex flex-col w-full justify-center items-center">
      <h2 class="text-2xl">Créer un nouveau sujet</h2>
      <h2 class="text-xl text-red-500">{{ error }}</h2>
      <div class="relative w-2/3">
        <label for="name" class="absolute -top-3 left-4 bg-gray-200 px-1">Nom</label>
        <input
          type="text"
          name="name"
          placeholder="Mon sujet"
          v-model="name"
          class="border border-slate-900 rounded-md p-2 pt-3 focus:outline-slate-800 w-full"
          required
        />
      </div>
      <div class="relative w-2/3">
        <label for="content" class="absolute -top-3 left-4 bg-gray-200 px-1">Contenu</label>
        <textarea
          name="content"
          placeholder="Mon sujet est formidable"
          v-model="content"
          class="border border-slate-900 rounded-md p-2 pt-3 focus:outline-slate-800 resize-none w-full min-h-[20vh]"
          required
        />
      </div>
      <button
        class="p-4 px-6 text-xl font-bold bg-purple-200 rounded-lg hover:shadow-lg hover:shadow-purple-400 transition duration-300 ease-in-out delay-100"
      >
        Créer
      </button>
    </div>
  </form>
</template>
