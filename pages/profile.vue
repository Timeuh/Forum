<script setup lang="ts">
  const {user, changePassword, logout, isLogged} = useUserStore();
  const error = ref<string>('');

  const handleSubmit = async (event: Event, currentPassword: string, newPassword: string, repeatedPassword: string) => {
    event.preventDefault();
    const response = await changePassword(currentPassword, newPassword, repeatedPassword);

    if (response.code !== 200 && 'error' in response) {
      error.value = response.error;
      return;
    }

    logout();
    navigateTo('/login');
  };

  onMounted(() => {
    if (!isLogged) {
      navigateTo('/login');
    }
  });
</script>

<template>
  <section class="bg-slate-900 flex w-full h-screen text-gray-200">
    <RegisterOrChangePasswordForm :user="user" :error="error" :handleSubmit="handleSubmit" />
  </section>
</template>
