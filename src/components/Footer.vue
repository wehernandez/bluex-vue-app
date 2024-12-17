<script>
import Logo from "../Icons/Logo.vue";

export default {
  name: "Footer",
  components: {Logo},
  data: function () {
    return{
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<template>
  <div class="bg-primary text-gray-10">
    <div class="max-container flexBetween padding-container relative py-5 ">
      <div>
        <logo/>
      </div>
      <div>
        {{ currentYear }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
