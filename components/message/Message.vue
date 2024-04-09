<script setup lang="ts">
  import type {SubjectMessage} from '~/common/types/app';
  import formatDate from '../../common/functions/formatDate';

  const props = defineProps<{
    message: SubjectMessage;
  }>();

  const isModifying = ref<boolean>(false);
  const modifiedText = ref<string>(props.message.text);

  const userStore = useUserStore();
  const {isAdmin} = storeToRefs(userStore);
  const {isAuthor} = userStore;

  const {modifyMessage, deleteMessage} = useMessageStore();
  const {getSubject} = useSubjectStore();

  const toggleModification = () => {
    isModifying.value = !isModifying.value;
  };

  const submitModification = async () => {
    await modifyMessage(modifiedText.value, props.message.id);
    await getSubject(props.message.subject_id);
    isModifying.value = false;
  };

  const submitDeletion = async () => {
    await deleteMessage(props.message.id);
    await getSubject(props.message.subject_id);
  };
</script>

<template>
  <div
    class="relative shadow-md shadow-gray-200 bg-gray-200 rounded-lg p-4 h-fit text-slate-800 flex flex-row w-2/3 items-center"
  >
    <svg
      v-show="isAdmin || isAuthor(props.message.user_id)"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="absolute right-6 top-6 stroke-red-500 cursor-pointer"
      @click="submitDeletion"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
    <div class="flex flex-row items-center justify-between space-x-12 w-full">
      <div class="space-y-2">
        <div class="flex flex-row items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-8 object-cover"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="10" r="3" />
            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
          </svg>
          <h2 class="text-xl font-bold">{{ message.pseudo }}</h2>
        </div>
        <h2 class="text-sm">Dernière mise à jour le {{ formatDate(message.last_updated) }}</h2>
        <button
          @click="toggleModification"
          v-show="(isAdmin || isAuthor(props.message.user_id)) && !isModifying"
          class="text-purple-900 font-bold text-xl"
        >
          Modifier
        </button>
        <button @click="submitModification" v-show="isModifying" class="text-purple-900 font-bold text-xl">
          Valider
        </button>
      </div>
      <div class="w-2/3 overflow-hidden">
        <p v-show="!isModifying" class="text-2xl w-full">{{ message.text }}</p>
        <textarea
          v-show="isModifying"
          class="text-2xl w-full p-2 resize-none bg-white rounded-md"
          v-model="modifiedText"
        ></textarea>
      </div>
    </div>
  </div>
</template>
