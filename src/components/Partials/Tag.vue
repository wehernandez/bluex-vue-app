<template>
  <span
      class="inline-block bg-secondary text-white px-3 py-1 rounded-full text-sm hover:bg-gray-300 hover:text-gray-500 flex-shrink-0"
  >
      {{ text }}
       <span v-if="canClose" @click="deleteTag(text)" class="cursor-pointer">
           &times;
       </span>
    </span>
</template>

<script>
export default {
  name: "Tag",
  props: {
    text: {
      type: String,
      required: true,
    },
    canClose: {
      type: Boolean,
      default: false,
    },
  },
  methods:{
    deleteTag(tag) {
      this.$emit("deleteTag",tag);
    },
  }
}
</script>

<style scoped>

</style>