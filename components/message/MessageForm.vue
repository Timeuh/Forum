<script setup lang="ts">
  const props = defineProps<{
    subjectId: string;
  }>();

  const messageStore = useMessageStore();
  const {displayAnswerForm} = storeToRefs(messageStore);
  const {toggleAnswerForm, createMessage} = messageStore;

  const userStore = useUserStore();
  const {isLogged, user} = storeToRefs(userStore);

  const {getSubject} = useSubjectStore();

  const content = ref<string>('');
  const error = ref<string>('');

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    error.value = '';
    await createMessage(content.value, Number(props.subjectId), user.value.id);
    await getSubject(Number(props.subjectId));
    content.value = '';
    toggleAnswerForm();
  };
</script>

<template>
  <form
    @submit="handleSubmit"
    v-show="displayAnswerForm"
    class="relative shadow-md shadow-gray-200 bg-gray-200 rounded-lg space-y-12 p-4 h-fit text-slate-800 flex flex-row w-2/3 justify-center items-center"
  >
    <div
      @click="toggleAnswerForm"
      class="cursor-pointer size-8 font-black rounded-lg bg-red-500 flex flex-col items-center justify-center absolute top-4 left-4"
    >
      X
    </div>
    <h2 v-show="!isLogged" class="text-3xl text-red-500 font-bold">Vous devez être connecté pour créer un sujet</h2>
    <div v-show="isLogged" class="space-x-12 h-fit flex flex-row w-full justify-center items-center">
      <h2 class="text-xl text-red-500">{{ error }}</h2>
      <div class="relative w-2/3">
        <label for="content" class="absolute -top-3 left-4 bg-gray-200 px-1">Message</label>
        <textarea
          name="content"
          placeholder="J'ai quelque chose à dire..."
          v-model="content"
          class="border border-slate-900 rounded-md p-2 pt-3 focus:outline-slate-800 resize-none w-full min-h-[20vh]"
          required
        />
      </div>
      <button
        class="p-4 px-6 text-xl font-bold bg-purple-200 rounded-lg hover:shadow-lg hover:shadow-purple-400 transition duration-300 ease-in-out delay-100"
      >
        Poster
      </button>
    </div>
  </form>
</template>
