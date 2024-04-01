<script setup lang="ts">
  import {useForumStore} from '~/stores/forum.store';
  import type {ApiError} from '~/common/types/api';
  import {HTTP_OK} from '~/common/constants/api';

  const forumStore = useForumStore();
  const {displayCreationForm} = storeToRefs(forumStore);
  const {createForum, chargeForums, toggleCreationForm} = forumStore;

  const userStore = useUserStore();
  const {isLogged} = storeToRefs(userStore);

  const name = ref<string>('');
  const error = ref<string>('');

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    error.value = '';
    const creationResult = (await createForum(name.value)) as ApiError;

    if (creationResult && 'code' in creationResult && creationResult.code !== HTTP_OK) {
      error.value = creationResult.error;
      return;
    }

    toggleCreationForm();
    await chargeForums();
  };
</script>

<template>
  <form
    @submit="handleSubmit"
    v-show="displayCreationForm"
    class="relative shadow-md shadow-gray-200 bg-gray-200 rounded-lg space-x-20 p-4 h-fit text-slate-800 flex flex-row w-2/3 justify-center items-center"
  >
    <div
      @click="toggleCreationForm"
      class="cursor-pointer size-8 font-black rounded-lg bg-red-500 flex flex-col items-center justify-center absolute top-4 left-4"
    >
      X
    </div>
    <h2 v-show="!isLogged" class="text-2xl text-red-500 font-bold">Vous devez être connecté pour créer un forum</h2>
    <div v-show="isLogged" class="space-x-20 p-4 h-fit flex flex-row w-full justify-center items-center">
      <div>
        <h2 class="text-2xl">Créer un nouveau forum</h2>
        <h2 class="text-xl text-red-500">{{ error }}</h2>
      </div>
      <div class="relative">
        <label for="Nom" class="absolute -top-3 left-4 bg-gray-200 px-1">Nom</label>
        <input
          type="text"
          name="pseudo"
          placeholder="Mon forum"
          v-model="name"
          class="border border-slate-900 rounded-md p-2 pt-3 focus:outline-slate-800"
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
