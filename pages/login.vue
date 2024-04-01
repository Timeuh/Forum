<script setup lang="ts">
  import {HTTP_OK} from '~/common/constants/api';

  const pseudo = ref<string>('');
  const password = ref<string>('');
  const error = ref<string>('');

  const {login} = useUserStore();

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    const loginResponse = await login(pseudo.value, password.value);

    if (loginResponse.code !== HTTP_OK && 'error' in loginResponse) {
      error.value = loginResponse.error;
      return;
    }

    navigateTo('/');
  };

  const goToRegister = () => {
    navigateTo('/register');
  };
</script>

<template>
  <section class="flex h-screen w-full bg-slate-900 text-gray-200">
    <form
      @submit="handleSubmit"
      class="relative m-auto shadow-md shadow-gray-200 bg-gray-200 rounded-lg p-4 h-1/2 text-slate-800 flex flex-col w-1/3 justify-center space-y-12 items-center"
    >
      <h1 class="text-3xl font-bold">Connexion</h1>
      <h2 v-show="error !== ''" class="text-3xl text-red-500">{{ error }}</h2>
      <div class="relative">
        <label for="pseudo" class="absolute -top-3 left-4 bg-gray-200 px-1">Pseudo</label>
        <input
          type="text"
          name="pseudo"
          placeholder="johndoe"
          v-model="pseudo"
          class="border border-slate-900 rounded-md p-2 pt-3 focus:outline-slate-800"
          required
        />
      </div>
      <div class="relative">
        <label for="password" class="absolute -top-3 left-4 bg-gray-200 px-1">Mot de passe</label>
        <input
          type="password"
          name="password"
          placeholder="j0hnP4ss*"
          v-model="password"
          class="rounded-md p-2 pt-3 border-slate-900 border focus:outline-slate-800"
          required
        />
      </div>
      <button
        class="p-4 px-6 text-xl font-bold bg-purple-200 rounded-lg hover:shadow-lg hover:shadow-purple-400 transition duration-300 ease-in-out delay-100"
      >
        Se connecter
      </button>
      <div class="absolute bottom-2 flex flex-row items-center space-x-2">
        <h3>Pas encore de compte ?</h3>
        <button class="text-purple-800" @click="goToRegister">s'inscrire</button>
      </div>
    </form>
  </section>
</template>
