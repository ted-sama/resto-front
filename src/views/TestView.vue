<template>
  <div>
    {{ loginData }}
  </div>
</template>

<script setup>
const loginData = localStorage.getItem("token");
</script>
