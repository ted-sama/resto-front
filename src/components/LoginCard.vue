<template>
  <div>
    <div class="flex justify-center items-center min-h-screen">
      <div class="w-96">
        <div class="bg-white p-8 rounded-lg sm:shadow-lg">
          <div class="flex justify-center">
            <img :src="logo" alt="" class="w-24 items-center" />
          </div>
          <h1 class="text-3xl font-medium text-center mb-14">Se connecter</h1>
          <Loading v-if="loading" class="h-[300px]" />
          <div v-else>
            <form @submit.prevent="login" class="space-y-4">
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
                <Button type="submit" class="w-full mt-8"> Connexion </Button>
              </div>
            </form>
            <div class="flex justify-center">
              <Button variant="link" as-child class="text-center mt-2">
                <router-link to="/register">
                  Pas encore de compte ? Inscrivez-vous
                </router-link>
              </Button>
            </div>
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
const email = ref("");
const password = ref("");
const loginData = ref({});
const emailWarning = ref("");
const passwordWarning = ref("");
const emailInputColor = ref("border-gray-500");
const passwordInputColor = ref("border-gray-500");
const loading = ref(false);

const { toast } = useToast();

const login = () => {
  if (!email.value || !password.value) {
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
    return;
  }

  loading.value = true;

  fetch(`${import.meta.env.VITE_API}/login_check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email.value,
      password: password.value,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        passwordWarning.value =
          "Email ou mot de passe incorrect, veuillez réessayer";
        passwordInputColor.value = "border-red-500";
        loading.value = false;
        throw new Error("Email ou mot de passe incorrect");
      }
      return res.json();
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        let currentTime = Date.now();
        let expires_at = currentTime + 3600000; // 1 hour, js operate with milliseconds
        localStorage.setItem("expires_at", expires_at);

        fetch(`${import.meta.env.VITE_API}/user/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("isAdmin", data.role.includes("ROLE_ADMIN"));

            router.replace("/shop");
          });
      }
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
