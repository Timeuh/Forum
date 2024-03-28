<script setup lang="ts">
  const pseudo = ref<string>('');
  const password = ref<string>('');

  const {login} = useUserStore();

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    const loginResult = await login(pseudo.value, password.value);
    console.log(loginResult);
  };
</script>

<template>
  <section class="flex h-screen w-full bg-slate-900 text-gray-200">
    <form @submit="handleSubmit" class="m-auto">
      <h1>Connexion</h1>
      <label for="pseudo">Pseudo</label>
      <input type="text" name="pseudo" placeholder="johndoe" v-model="pseudo" />
      <label for="password">Mot de passe</label>
      <input type="password" name="password" placeholder="j0hnP4ss*" v-model="password" />
      <button>Se connecter</button>
    </form>
  </section>
</template>
