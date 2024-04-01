<script setup lang="ts">
  const route = useRoute();

  const forumStore = useForumStore();
  const {currentForum} = storeToRefs(forumStore);
  const {fetchForum} = forumStore;

  onMounted(async () => {
    await fetchForum(route.params.id as string);
  });
</script>

<template>
  <section class="h-screen w-full flex flex-col items-center justify-center space-y-8 bg-slate-900 text-gray-200">
    <NuxtLink
      href="/"
      class="align-self-start ps-12 flex flex-row items-center justify-center space-x-4 hover:scale-110 transition duration-300 ease-in-out"
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
    </NuxtLink>
    <div
      class="cursor-pointer border-b-2 border-purple-400 rounded-lg p-4 h-fit flex flex-row w-2/3 justify-center items-center"
    >
      <h1 class="text-4xl font-bold">Forum {{ currentForum.forum.name }}</h1>
    </div>
  </section>
</template>
