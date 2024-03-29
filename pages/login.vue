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
</script>

<template>
  <section class="flex h-screen w-full bg-slate-900 text-gray-200">
    <form @submit="handleSubmit" class="m-auto">
      <h1>Connexion</h1>
      <h2 v-show="error !== ''">{{ error }}</h2>
      <label for="pseudo">Pseudo</label>
      <input type="text" name="pseudo" placeholder="johndoe" v-model="pseudo" />
      <label for="password">Mot de passe</label>
      <input type="password" name="password" placeholder="j0hnP4ss*" v-model="password" />
      <button>Se connecter</button>
    </form>
  </section>
</template>
