<template>
  <div>
    <div class="flex justify-center items-center min-h-screen">
      <div class="w-96">
        <div class="bg-white p-8 rounded-lg sm:shadow-lg">
          <div class="flex justify-center">
            <img :src="logo" alt="" class="w-24 items-center" />
          </div>
          <h1 class="text-3xl font-medium text-center mb-14">
            Créer un compte
          </h1>
          <Loading v-if="loading" class="h-[300px]" />
          <div v-else-if="success">
            <div class="text-center">
              <h2 class="text-2xl font-semibold mb-4">Inscription réussie</h2>
              <Button as-child class="w-full mt-8">
                <router-link to="/login"> Connectez-vous </router-link>
              </Button>
            </div>
          </div>
          <div v-else>
            <form @submit.prevent="signup" class="space-y-4">
              <div>
                <label for="firstname" class="block text- mb-1">Prénom</label>
                <input
                  type="text"
                  id="firstname"
                  v-model="firstName"
                  class="w-full p-2 border border-gray-500 rounded-lg"
                  :class="firstNameInputColor"
                />
                <p
                  v-show="firstNameWarning != ''"
                  class="mt-2 text-sm text-red-600"
                >
                  {{ emailWarning }}
                </p>
              </div>
              <div>
                <label for="lastname" class="block text- mb-1">Nom</label>
                <input
                  type="text"
                  id="lastname"
                  v-model="lastName"
                  class="w-full p-2 border border-gray-500 rounded-lg"
                  :class="lastNameInputColor"
                />
                <p
                  v-show="lastNameWarning != ''"
                  class="mt-2 text-sm text-red-600"
                >
                  {{ emailWarning }}
                </p>
              </div>
              <div>
                <label for="phone" class="block text- mb-1"
                  >Numéro de téléphone</label
                >
                <input
                  type="tel"
                  id="phone"
                  v-model="phone"
                  class="w-full p-2 border border-gray-500 rounded-lg"
                  :class="phoneInputColor"
                />
                <p
                  v-show="phoneWarning != ''"
                  class="mt-2 text-sm text-red-600"
                >
                  {{ emailWarning }}
                </p>
              </div>
              <div>
                <label for="email" class="block text- mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  class="w-full p-2 border border-gray-500 rounded-lg"
                  :class="emailInputColor"
                />
                <p
                  v-show="emailWarning != ''"
                  class="mt-2 text-sm text-red-600"
                >
                  {{ emailWarning }}
                </p>
              </div>
              <div>
                <label for="password" class="block mb-1">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  class="w-full p-2 border rounded-lg"
                  :class="passwordInputColor"
                />
                <p
                  v-show="passwordWarning != ''"
                  class="mt-2 text-sm text-red-600"
                >
                  {{ passwordWarning }}
                </p>
              </div>
              <div>
                <Button type="submit" class="w-full mt-8">
                  Créer un compte
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Loading from "@/components/Loading.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
import logo from "../assets/miamiam_logo_notext.png";

const router = useRouter();
const firstName = ref("");
const lastName = ref("");
const phone = ref("");
const email = ref("");
const password = ref("");
const firstNameWarning = ref("");
const lastNameWarning = ref("");
const phoneWarning = ref("");
const emailWarning = ref("");
const passwordWarning = ref("");
const firstNameInputColor = ref("border-gray-500");
const lastNameInputColor = ref("border-gray-500");
const phoneInputColor = ref("border-gray-500");
const emailInputColor = ref("border-gray-500");
const passwordInputColor = ref("border-gray-500");
const success = ref(false);
const loading = ref(false);

const { toast } = useToast();

const signup = () => {
  if (
    !email.value ||
    !password.value ||
    !firstName.value ||
    !lastName.value ||
    !phone.value
  ) {
    if (!email.value) {
      emailWarning.value = "Veuillez renseigner votre email";
      emailInputColor.value = "border-red-500";
    } else {
      emailWarning.value = "";
      emailInputColor.value = "border-gray-500";
    }

    if (!password.value) {
      passwordWarning.value = "Veuillez renseigner votre mot de passe";
      passwordInputColor.value = "border-red-500";
    } else {
      passwordWarning.value = "";
      passwordInputColor.value = "border-gray-500";
    }

    if (!firstName.value) {
      firstNameWarning.value = "Veuillez renseigner votre prénom";
      firstNameInputColor.value = "border-red-500";
    } else {
      firstNameWarning.value = "";
      firstNameInputColor.value = "border-gray-500";
    }

    if (!lastName.value) {
      lastNameWarning.value = "Veuillez renseigner votre nom";
      lastNameInputColor.value = "border-red-500";
    } else {
      lastNameWarning.value = "";
      lastNameInputColor.value = "border-gray-500";
    }

    if (!phone.value) {
      phoneWarning.value = "Veuillez renseigner votre numéro de téléphone";
      phoneInputColor.value = "border-red-500";
    } else {
      phoneWarning.value = "";
      phoneInputColor.value = "border-gray-500";
    }

    return;
  }

  loading.value = true;

  fetch(`${import.meta.env.VITE_API}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
      first_name: firstName.value,
      last_name: lastName.value,
      phone_number: phone.value,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue, veuillez réessayer",
          variant: "destructive",
        });
        loading.value = false;
        throw new Error("Erreur d'inscription");
      }
      return res.json();
    })
    .then((data) => {
      loading.value = false;
      success.value = true;
    })
    .catch((error) => {
      loading.value = false;
      toast({
        title: "Erreur",
        description: "Erreur serveur, veuillez réessayer plus tard",
        variant: "destructive",
      });
      console.error("Error:", error);
    });
};
</script>
