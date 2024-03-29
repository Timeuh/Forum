<script setup lang="ts">
  import {useUserStore} from '~/stores/user.store';

  const userStore = useUserStore();
  const {isLogged, user} = storeToRefs(userStore);

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
    <div class="p-2 px-4 bg-purple-200 rounded-lg text-slate-900 text-lg flex flex-row items-center">
      <div v-show="!isLogged">
        <svg
          @click="goToLogin"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="hover:scale-110 transition duration-300 ease-in-out cursor-pointer"
        >
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" x2="3" y1="12" y2="12" />
        </svg>
      </div>
      <div v-show="isLogged">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
      <h2 v-show="isLogged" class="px-4">{{ user.pseudo }}</h2>
      <div v-show="isLogged">
        <svg
          @click="handleLogout"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="hover:scale-110 transition duration-300 ease-in-out cursor-pointer"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
      </div>
    </div>
  </nav>
</template>
