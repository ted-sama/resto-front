<template>
  <div class="h-screen bg-gray-200 p-2 lg:p-8">   
      <div class="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg mx-auto">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Inscription</h2>
          <p class="text-gray-700 mb-6">Veuillez remplir les informations ci-dessous pour créer un nouveau compte.</p>
          <form @submit.prevent="register">
            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2" for="email">Adresse mail</label>
              <input v-model="email" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Adresse e-mail">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2" for="password">Mot de passe</label>
              <input v-model="password" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Mot de passe">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2" for="firstName">Nom</label>
              <input v-model="firstName" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="Prénom">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2" for="lastName">Prénom</label>
              <input v-model="lastName" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Nom de famille">
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 font-bold mb-2" for="phoneNumber">Numéro de téléphone</label>
              <input v-model="phoneNumber" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phoneNumber" type="text" placeholder="Numéro de téléphone">
            </div>
            <div class="flex items-center justify-between">
              <button type="submit" class="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">S'inscrire</button>
              <router-link to="/login" class="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-gray-800">Déjà un compte ? Se connecter</router-link>
            </div>
          </form>
          <p v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const firstName = ref('');
  const lastName = ref('');
  const phoneNumber = ref('');
  const errorMessage = ref('');
  const router = useRouter();
  
  const register = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
          first_name: firstName.value,
          last_name: lastName.value,
          phone_number: phoneNumber.value
        })
      });
  
      if (response.ok) {
        router.push('/login');
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          errorMessage.value = data.message || 'Une erreur s\'est produite lors de l\'inscription.';
        } else {
          errorMessage.value = 'Une erreur s\'est produite lors de l\'inscription.';
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      errorMessage.value = 'Une erreur s\'est produite lors de l\'inscription.';
    }
  };
  </script>
  