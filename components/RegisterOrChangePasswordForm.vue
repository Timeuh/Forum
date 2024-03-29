<script setup lang="ts">
  const currentPassword = ref<string>('');
  const newPassword = ref<string>('');
  const repeatedPassword = ref<string>('');

  const props = defineProps(['error', 'handleSubmit', 'user']);
</script>

<template>
  <form
    @submit="props.handleSubmit($event, currentPassword, newPassword, repeatedPassword)"
    class="m-auto shadow-md shadow-gray-200 bg-gray-200 rounded-lg p-4 h-fit py-12 text-slate-800 flex flex-col w-1/3 justify-center space-y-12 items-center"
  >
    <h1 class="text-4xl font-bold">{{ props.user.pseudo }}</h1>
    <h2 class="text-3xl font-semibold">Changer de mot de passe</h2>
    <h2 v-show="props.error !== ''" class="text-2xl text-red-500 text-center">{{ props.error }}</h2>
    <div class="relative">
      <label for="pseudo" class="absolute -top-3 left-4 bg-gray-200 px-1">Mot de passe actuel</label>
      <input
        type="password"
        name="pseudo"
        placeholder="4ctu3elP4ss*"
        v-model="currentPassword"
        class="border border-slate-900 rounded-md p-2 pt-3 focus:outline-slate-800"
      />
    </div>
    <div class="relative">
      <label for="password" class="absolute -top-3 left-4 bg-gray-200 px-1">Nouveau mot de passe</label>
      <input
        type="password"
        name="password"
        placeholder="n3wP4ss*"
        v-model="newPassword"
        class="rounded-md p-2 pt-3 border-slate-900 border focus:outline-slate-800"
      />
    </div>
    <div class="relative">
      <label for="password" class="absolute -top-3 left-4 bg-gray-200 px-1">Répéter le mot de passe</label>
      <input
        type="password"
        name="password"
        placeholder="n3wP4ss*"
        v-model="repeatedPassword"
        class="rounded-md p-2 pt-3 border-slate-900 border focus:outline-slate-800"
      />
    </div>
    <button
      class="p-4 px-6 text-xl font-bold bg-purple-200 rounded-lg hover:shadow-lg hover:shadow-purple-400 transition duration-300 ease-in-out delay-100"
    >
      Modifier le mot de passe
    </button>
  </form>
</template>
