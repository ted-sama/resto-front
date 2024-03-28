<template>
  <header class="top-0 z-50 sticky bg-white" :class="{ 'shadow-md': !pageTop }">
    <div
      class="mx-auto px-4 sm:px-6 lg:px-8 max-w-[90rem] flex h-20 items-center justify-between"
    >
      <div class="flex">
        <router-link to="/">
          <img :src="logo" alt="Miamiam" class="h-16" />
        </router-link>
      </div>
      <!-- input with search icon -->
      <form @submit.prevent="search">
        <div class="relative text-neutral-500 w-[600px]">
          <Search class="absolute top-2.5 left-2.5" :size="22" />
          <input
            type="text"
            class="w-[600px] p-2 pl-10 border rounded-lg"
            placeholder="Rechercher un plat..."
            v-model="searchQuery"
          />
        </div>
      </form>
      <div class="hidden sm:flex gap-x-5">
        <Button as-child>
          <router-link to="/shop/cart"
            ><ShoppingBasket class="mr-2" />Panier</router-link
          >
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary"
              ><UserRound class="mr-2" /> Mon compte
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <!-- <DropdownMenuItem>
              <router-link to="/account" class="w-full flex items-center"
                ><CircleUser class="mr-1 h-5" />Mon profil</router-link
              >
            </DropdownMenuItem> -->
            <DropdownMenuItem>
              <router-link to="/account/orders" class="w-full flex items-center"
                ><History class="mr-1 h-5" />Mes commandes</router-link
              >
            </DropdownMenuItem>
            <DropdownMenuItem class="cursor-pointer" @click="handleLogout">
              <LogOut class="mr-1 h-5" />Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>

<script setup>
import logo from "../assets/miamiam_logo.png";
import { Search } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UserRound,
  CircleUser,
  History,
  ShoppingBasket,
  LogOut,
} from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const pageTop = ref(true);
const searchQuery = ref("");

const handleScroll = () => {
  // when the user scrolls, check the pageYOffset
  if (window.scrollY > 0) {
    // user is scrolled
    if (pageTop.value) pageTop.value = false;
  } else {
    // user is at top of page
    if (!pageTop.value) pageTop.value = true;
  }
};

const handleLogout = () => {
  // remove the token from the local storage
  localStorage.clear();
  // redirect the user to the login page
  router.push("/");
};

const search = () => {
  router.push({
    name: "shop-search-results",
    query: { search_query: searchQuery.value },
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>
