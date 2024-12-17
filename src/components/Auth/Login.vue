<template>
  <div>
    <div class="flex flex-row">
      <div class="w-6/12">
        <div class="px-24 pt-5 3xl:pt-24 3xl:p-36">
          <div class="flexCenter pb-0 ">
            <logo :width="currentBreakpoint === '3xl' ? 308 : 215" :height="currentBreakpoint === '3xl' ? 193 : 135"></logo>
          </div>
          <div class="w-10/12 3xl:w-10/12">
            <h1 class="bold-32 3xl:bold-60 text-primary">
              ¡Inicia sesión!
            </h1>
            <p class="bold-20 3xl:bold-24 text-gray-30 mt-4">
              Por favor ingresa las credenciales
            </p>
          </div>
          <div>
            <div class="bg-white px-20 pt-6">
              <div class="input-wrapper">
                <input
                  v-model="formData.email"
                  type="text"
                  id="email"
                  name="correo"
                  placeholder="Correo electrónico"
                  class="input-field peer"
                  required
                />
                <label
                  for="email"
                  class="input-label-base -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-50 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-primary peer-focus:text-sm"
                >
                  Correo electrónico
                </label>
              </div>
              <div class="input-wrapper mt-5">
                <input
                  v-model="formData.password"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Contraseña"
                  class="input-field peer"
                  required
                />
                <label
                  for="password"
                  class="input-label-base -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-50 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-primary peer-focus:text-sm"
                >
                  Contraseña
                </label>
              </div>
            </div>
          </div>
          <div class="flexCenter py-5">
            <button @click="loginUser" class="btn-primary btn-large btn-dense mt-5 w-8/12 3xl:w-8/12">
              Iniciar sesión
            </button>
          </div>
          <div class="h-px bg-gray-200 my-4"></div>
          <div class="">
            <p class="bold-20 3xl:bold-24 text-gray-30 mt-5">
              ¿No tienes cuenta?
            </p>
          </div>
          <div class="flexCenter py-2">
            <button @click="goToRoute('Register')" class="btn-primary-outline btn-large btn-dense mt-5 w-11/12 3xl:w-8/12">
              Regístrate
            </button>
          </div>
        </div>
      </div>
      <!-- Imagen -->
      <div class="w-6/12 bg-primary h-screen">
        <img
          src="/img/bg-index.png"
          loading="lazy"
          class="w-full h-full object-cover object-right-center"
        />
      </div>
    </div>
  </div>
</template>

<script>
import logo from "../../Icons/Logo.vue";
import axios from "axios";

export default {
  name: "Login",
  components: { logo },
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      screenWidth: window.innerWidth,
      breakpoints: {
        xs: 400,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
        "3xl": 1680,
      },
    };
  },
  computed: {
    currentBreakpoint() {
      const width = this.screenWidth;
      return Object.keys(this.breakpoints)
        .reverse()
        .find((key) => width >= this.breakpoints[key]) || "xs";
    },
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post(
          "api/auth/login",
          this.formData
        );

        const { user, token } = response.data;

        // Guarda el token y el usuario en localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(user));
        this.$notify(
            {
              group: 'generic',
              title: 'Excelente!',
              text: 'Inicio de sesión exitoso.',
            },
            5000,
        )
        // Redirige al dashboard
        this.goToRoute("feed");
      } catch (error) {
        console.error("Error al iniciar sesión:", error.response?.data || error.message);
        this.$notify(
            {
              group: 'error',
              title: 'Lo sentimos!',
              text: 'Credenciales incorrectas. Inténtalo de nuevo.',
            },
            5000,
        )
      }
    },
    goToRoute(routeName) {
      this.$router.push({ name: routeName });
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
  },
  mounted() {
    window.addEventListener("resize", this.updateScreenWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateScreenWidth);
  },
};
</script>