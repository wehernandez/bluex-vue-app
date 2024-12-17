<template>
  <div class="fixed top-0 left-0 right-0 z-40" :class="{ 'shadow-2xl transition-shadow duration-300': scrolled }">
    <div class="bg-gray-15">
      <div class="max-container flexBetween padding-container relative z-30 py-2">
        <!-- Logo -->
        <div>
          <logo :width="100" :height="50" />
        </div>

        <!-- Información del usuario -->
        <div class="hidden lg:flex lg:flex-row" v-if="user">
          <div>
            <p class="font-bold text-primary pb-0">{{ user.name }} {{ user.lastname }}</p>
            <small class="text-gray-50">{{ user.email }}</small>
          </div>
          <div class="pl-4">
            <button @click="logout" class="btn-primary-outline btn-dense">
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
      <div :class="{'block': !isHidden, 'hidden': isHidden}" id="nav-content" class="h-screen w-full lg:hidden m-4" v-if="user">
        <ul class="flex flex-col gap-8 mt-20">
          <li>
            <div class="text-center">
              <p class="font-bold text-primary pb-0">{{ user.name }}</p>
              <small class="text-gray-50">{{ user.email }}</small>
            </div>
          </li>
          <li>
            <div class="flex justify-center">
              <button @click="logout" class="btn-primary-outline btn-dense">
                Cerrar sesión
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "../Icons/Logo.vue";
import axios from "axios";

export default {
  name: "Header",
  components: { Logo },
  data() {
    return {
      user: null, // Almacena la información del usuario
      scrolled: false,
      isHidden: true,
    };
  },
  mounted() {
    this.fetchUser();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    // Recupera los datos del usuario autenticado
    async fetchUser() {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("https://flickr-service.onrender.com/auth/me", {
          headers: {
            Authorization: `${token}`,
          },
        });
        this.user = response.data; // Guarda el usuario en el estado
        console.log("User data:", this.user);
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error.message);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        this.user = null;
      }
    },

    // Maneja el cierre de sesión
    logout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      this.user = null;
      this.$router.push({ name: "Login" });
    },

    // Maneja el scroll
    handleScroll() {
      this.scrolled = window.scrollY > 50;
    },

    // Muestra/oculta el menú en móviles
    toggleNav() {
      this.isHidden = !this.isHidden;
    },
  },
};
</script>

<style scoped>
.active-class {
  @apply border-b border-primary;
}
</style>