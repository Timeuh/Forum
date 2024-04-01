<script setup lang="ts">
  import {useUserStore} from '~/stores/user.store';
  import {HTTP_OK} from '~/common/constants/api';

  const {register} = useUserStore();

  const error = ref<string>('');

  const handleSubmit = async (event: Event, pseudo: string, password: string, repeatedPassword: string) => {
    event.preventDefault();
    const registerResponse = await register(pseudo, password, repeatedPassword);

    if (registerResponse.code !== HTTP_OK && 'error' in registerResponse) {
      error.value = registerResponse.error;
      return;
    }

    navigateTo('/login');
  };
</script>

<template>
  <section class="flex h-screen w-full bg-slate-900 text-gray-200">
    <RegisterForm
      :handleSubmit="handleSubmit"
      :error="error"
      :button-title="'S\'inscrire'"
      :title="'Créer un compte'"
    />
  </section>
</template>
