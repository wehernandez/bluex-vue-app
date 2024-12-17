<template>
  <div class="w-full md:flex">
    <div class="w-12/12 md:w-6/12">
      <img
          :src="currentItem.media"
          :alt="currentItem.title"
          class="w-full max-h-72 min-h-72 md:max-h-none md:min-h-96 rounded-lg shadow-md object-cover"
      />
    </div>
    <div class="w-12/12 md:w-6/12 px-10 pt-3" v-if="currentItem.title">
      <h1 class="text-3xl mt-4  text-primary font-bold">{{currentItem.title || "Sin titulo"}}</h1>
      <div class="max-h-96 overflow-y-auto">
        <p class="text-gray-50 mt-5" v-html="currentItem.description"></p>
      </div>
      <div  class="pt-5">
        <h3 class="text-primary font-bold"> {{showTags ? 'Tags:': "Esta imagen no tiene tags" }}</h3>
      </div>
      <div v-if="showTags" class="relative mt-4">
        <div
            ref="carousel"
            class="flex gap-2 overflow-x-auto whitespace-nowrap px-3 no-scrollbar"
        >
          <Tag
              v-for="(tag, index) in currentItem.tags"
              :key="index"
              @click="addTag(tag)"
              :text="tag">
          </Tag>
        </div>
      </div>
      <div v-if="showTags" class="relative mt-4 h-20">
        <!-- Botón Izquierdo -->
        <button
            @click="scroll('left')"
            class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 text-white p-2 rounded-lg  hover:bg-gray-300"
        >
          &#8592;
        </button>
        <!-- Botón Derecho -->
        <button
            @click="scroll('right')"
            class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 text-white p-2 rounded-lg  hover:bg-gray-300"
        >
          &#8594;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from "../Partials/Tag.vue";

export default {
  name: "DetailContainer",
  components: {Tag},
  props:{
    currentItem: {
      type: Object,
      required : true
    }
  },
  computed:{
    showTags(){
      return this.currentItem.tags.length > 0
    }
  },
  methods:{
    addTag(tag) {
      this.$emit("addTag",tag);
    },
    scroll(direction) {
      const carousel = this.$refs.carousel;
      const scrollAmount = 200; // Desplazamiento en píxeles
      if (direction === "left") {
        carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  }
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>