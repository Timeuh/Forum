<script setup lang="ts">
  import {useUserStore} from '~/stores/user.store';

  const userStore = useUserStore();
  const {isLogged} = storeToRefs(userStore);

  const goToLogin = () => {
    navigateTo('/login');
  };

  const goToHome = () => {
    navigateTo('/');
  };

  const handleLogout = () => {
    userStore.logout();
    navigateTo('/');
  };
</script>

<template>
  <nav
    class="flex flex-row justify-around text-gray-300 items-center bg-slate-900 shadow-gray-300/50 shadow-sm fixed top-0 w-full h-14"
  >
    <h2
      class="text-xl font-bold text-purple-200 cursor-pointer hover:scale-105 transition duration-500"
      @click="goToHome"
    >
      NuxtForum
    </h2>
    <button
      @click="goToLogin"
      v-show="!isLogged"
      class="p-2 px-4 bg-purple-200 rounded-lg text-slate-900 text-lg hover:bg-purple-300 transition duration-500"
    >
      Connexion
    </button>
    <button
      @click="handleLogout"
      v-show="isLogged"
      class="p-2 px-4 bg-purple-200 rounded-lg text-slate-900 text-lg hover:bg-purple-300 transition duration-500"
    >
      Déconnexion
    </button>
  </nav>
</template>
