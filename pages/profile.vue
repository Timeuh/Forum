<script setup lang="ts">
  const {user} = useUserStore();
</script>

<template>
  <section class="bg-slate-900 flex w-full h-screen text-gray-200">
    <h1 class="m-auto">{{ user.pseudo }}</h1>
  </section>
</template>
