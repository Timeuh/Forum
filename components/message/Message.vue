<script setup lang="ts">
  import formatDate from '~/common/functions/formatDate';
  import type {SubjectMessage} from '~/common/types/app';

  const props = defineProps<{
    message: SubjectMessage;
  }>();
</script>

<template>
  <div
    class="shadow-md shadow-gray-200 bg-gray-200 rounded-lg space-x-20 p-4 h-fit text-slate-800 flex flex-row w-2/3 justify-around items-center"
  >
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
      </div>
      <div class="w-2/3">
        <h2 class="text-2xl">{{ message.text }}</h2>
      </div>
    </div>
  </div>
</template>
