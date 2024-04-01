<script setup lang="ts">
  const route = useRoute();
</script>

<template>
  <section class="h-screen w-full flex flex-col items-center justify-center space-y-8 bg-slate-900 text-gray-200">
    <h1>forum {{ route.params.id }}</h1>
  </section>
</template>
