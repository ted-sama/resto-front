<template>
  <div>
    <AdminLoginCard />
  </div>
</template>

<script setup>
import AdminLoginCard from "../../components/AdminLoginCard.vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();

// onMounted(() => {
//   if (localStorage.getItem("token")) {
//     fetch(`${import.meta.env.VITE_API}/user/me/role`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.role.includes("ROLE_ADMIN")) {
//           router.replace("/admin");
//         } else {
//           localStorage.removeItem("token");
//         }
//       });
//   }
// });
</script>
