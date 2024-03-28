<template>
  <div class="relative mb-12">
    <h2 class="text-2xl font-semibold mb-4">{{ title }}</h2>
    <div
      class="absolute left-0 top-[45%] flex items-center invisible sm:visible"
    >
      <button
        class="bg-[#fc9329] bg-opacity-70 rounded-full p-2"
        @click="scroll(-1)"
        v-if="showLeftArrow"
      >
        <ChevronLeft />
      </button>
    </div>
    <div
      class="absolute right-0 top-[45%] flex items-center invisible sm:visible"
    >
      <button
        class="bg-[#fc9329] bg-opacity-70 rounded-full p-2"
        @click="scroll(1)"
        v-if="showRightArrow"
      >
        <ChevronRight />
      </button>
    </div>
    <div
      ref="carousel"
      class="flex flex-1 overflow-x-auto md:overflow-x-hidden"
      @scroll="handleScroll"
    >
      <div class="flex space-x-4">
        <router-link :to="`/shop/foods?category=${item.id}`" v-for="item in items" :key="item.id">
          <div class="h-32 w-64 md:h-48 md:w-96 rounded-xl">
            <img
              :src="item.image"
              :alt="item.name"
              class="h-full w-full object-cover rounded-xl"
            />
          </div>
          <h3 class="text-lg font-medium mt-2">{{ item.name }}</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { ref, defineProps } from "vue";

defineProps({
  title: String,
  items: Array,
});

const carousel = ref(null);
const showLeftArrow = ref(false);
const showRightArrow = ref(true);

const scroll = (direction) => {
  const step = 1100;
  carousel.value.scrollBy({
    left: direction * step,
    behavior: "smooth",
  });
};

const handleScroll = () => {
  const element = carousel.value;
  if (element.scrollLeft === 0) {
    showLeftArrow.value = false;
    showRightArrow.value = true;
  } else if (element.scrollLeft + element.clientWidth >= element.scrollWidth) {
    showLeftArrow.value = true;
    showRightArrow.value = false;
  } else {
    showLeftArrow.value = true;
    showRightArrow.value = true;
  }
};
</script>
