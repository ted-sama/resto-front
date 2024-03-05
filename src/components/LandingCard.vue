<template>
  <div
    class="rounded-2xl h-72 bg-cover bg-center opacity-50 hover:opacity-100 transition duration-300 ease-in-out"
    :style="{ backgroundImage: `url(${image})` }"
  ></div>
</template>

<script setup>
defineProps({
  image: String,
});
</script>
