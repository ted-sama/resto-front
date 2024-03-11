<template>
  <div class="h-screen bg-gray-200 py-20 p-4 md:p-20 lg:p-32">
    <div class="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg mx-auto">
      <div class="p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Bienvenue !</h2>
        <p class="text-gray-700 mb-6">Veuillez vous connecter à votre compte.</p>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="username">Nom d'utilisateur</label>
            <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nom d'utilisateur">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 font-bold mb-2" for="password">Mot de passe</label>
            <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Mot de passe">
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Se connecter</button>
            <router-link to="/register" class="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-gray-800">Première connexion ?</router-link>
          </div>
        </form>
        <p v-if="errorMessage" class="mt-4 text-red-500">Mot de passe ou identifiant incorrect.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/login_check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email.value,
        password: password.value
      })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      router.push('/');
    } else {
      errorMessage.value = 'Mot de passe ou identifiant incorrect.';
    }
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    errorMessage.value = 'Une erreur s\'est produite lors de la connexion.';
  }
};
</script>
