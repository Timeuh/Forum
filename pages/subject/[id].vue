<script setup lang="ts">
  const route = useRoute();
  const router = useRouter();
  const subjectId = route.params.id as string;

  const goBack = () => {
    router.go(-1);
  };
</script>

<template>
  <section
    class="min-h-screen h-fit py-8 w-full flex flex-col items-center justify-center space-y-8 bg-slate-900 text-gray-200"
  >
    <button
      @click="goBack"
      class="align-self-start ps-12 pt-20 flex flex-row items-center justify-center space-x-4 hover:scale-110 transition duration-300 ease-in-out"
    >
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
        <path d="m15 18-6-6 6-6" />
      </svg>
      <span class="text-lg">Retour</span>
    </button>
    <h1>Subject {{ subjectId }}</h1>
  </section>
</template>
