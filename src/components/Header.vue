<script>
import Logo from "../Icons/Logo.vue";

export default {
  name: "Header",
  components: {Logo},
  data: function () {
    return{
      scrolled: false,
      isHidden: true
    }
  },
  computed: {

  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods:{
    toggleNav() {
      this.isHidden = !this.isHidden;
    },
    handleScroll() {
      if (window.scrollY > 50) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    },
  }
}
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-40" :class="{ 'shadow-2xl transition-shadow duration-300': scrolled }">
    <div class="bg-gray-15">
      <div class="max-container flexBetween padding-container relative z-30 py-2">
        <div>
          <logo :width="100" :height="50" />
        </div>
        <div class="hidden lg:flex lg:flex-row">
          <div>
            <p class="font-bold text-primary pb-0">Fernando Blue</p>
            <small class="text-gray-50">fernando@blue.com</small>
          </div>
          <div class="pl-4">
            <button class="btn-primary-outline btn-dense">
              Cerrar sesión
            </button>
          </div>
        </div>


        <!-- Botón de menú para pantallas pequeñas -->
        <div class="block lg:hidden">
          <button @click="toggleNav" id="nav-toggle" class="flex items-center px-3 py-2 border rounded text-primary border-primary hover:text-primary hover:border-primary">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </button>
        </div>

      </div>
      <!-- Menú desplegable para pantallas pequeñas -->
      <div :class="{'block': !isHidden, 'hidden': isHidden}" id="nav-content" class="h-screen w-full lg:hidden m-4">
        <ul class="flex flex-col gap-8 mt-20">
          <li class="">
            <div class="text-center">
              <p class="font-bold text-primary pb-0">Fernando Blue</p>
              <small class="text-gray-50">fernando@blue.com</small>
            </div>
          </li>
          <li class="">
            <div class="flex justify-center">
              <button class="btn-primary-outline btn-dense">
                Cerrar sesión
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active-class {
  @apply border-b border-primary;
}
</style>
