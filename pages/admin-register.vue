<script setup lang="ts">
  import {useUserStore} from '~/stores/user.store';
  import {HTTP_OK} from '~/common/constants/api';

  const {register, isLogged} = useUserStore();

  const error = ref<string>('');

  const handleSubmit = async (event: Event, pseudo: string, password: string, repeatedPassword: string) => {
    event.preventDefault();
    const registerResponse = await register(pseudo, password, repeatedPassword, true);

    if (registerResponse.code !== HTTP_OK && 'error' in registerResponse) {
      error.value = registerResponse.error;
      return;
    }

    navigateTo('/login');
  };

  onMounted(() => {
    if (!isLogged) {
      navigateTo('/login');
    }
  });
</script>

<template>
  <section class="flex h-screen w-full bg-slate-900 text-gray-200">
    <RegisterForm
      :handleSubmit="handleSubmit"
      :error="error"
      :button-title="'Créer le compte'"
      :title="'Créer un compte administrateur'"
    />
  </section>
</template>
