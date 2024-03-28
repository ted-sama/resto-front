<template>
  <div :class="`h-36 ${color} rounded-2xl p-6`">
    <h2 class="mb-2">{{ title }}</h2>
    <h3 class="text-4xl font-medium">{{ quantity }}</h3>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  color: String,
  quantity: Number,
});
</script>
