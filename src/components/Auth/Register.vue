<template>
  <div>
    <div class="flex flex-row">
      <div class="w-6/12">
        <div class="px-24 pt-5 3xl:pt-14 3xl:p-36">
          <div class="flexCenter pb-0">
            <logo :width="currentBreakpoint ==='3xl' ? 290: 160" :height="currentBreakpoint ==='3xl' ? 150: 90"></logo>
          </div>
          <div class="w-11/12 3xl:w-10/12">
            <h1 class="bold-20 3xl:bold-32 text-primary">
              ¡Registrarse en bluex es muy facil!
            </h1>
            <p class="bold-13 3xl:bold-20 text-gray-30 mt-2">
              Por favor llena todos los campos solicitados
            </p>
          </div>
          <div>
            <div class="bg-white px-5 3xl:px-20 pt-5">
              <div class="input-wrapper">
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Correo electronico"
                    class="input-field peer"
                    required
                    v-model="data.email"
                />
                <label
                    for="email"
                    class="input-label-base -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-50 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-primary peer-focus:text-sm"
                >
                  Correo electronico
                </label>
              </div>
              <div class="input-wrapper mt-5">
                <input
                    v-model="data.name"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nombre"
                    class="input-field peer"
                    required
                />
                <label
                    for="name"
                    class="input-label-base -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-50 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-primary peer-focus:text-sm"
                >
                  Nombre
                </label>
              </div>
              <div class="input-wrapper mt-5">
                <input
                    v-model="data.lastname"
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Nombre"
                    class="input-field peer"
                    required
                />
                <label
                    for="lastname"
                    class="input-label-base -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-50 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-primary peer-focus:text-sm"
                >
                  Apellido
                </label>
              </div>
              <div class="input-wrapper mt-5">
                <input
                    v-model="data.birthdate"
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    placeholder="Fecha nacimiento"
                    class="input-field peer"
                    required
                />
                <label
                    for="birthdate"
                    class="input-label-base -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-50 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-primary peer-focus:text-sm"
                >
                  Fecha nacimiento
                </label>
              </div>
              <div class="input-wrapper mt-5">
                <input
                    v-model="data.password"
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
          <div class="flexCenter py-2">
            <button @click="registerUser" class="btn-primary btn-large btn-dense mt-5 w-10/12 3xl:w-9/12">
              Registrarse
            </button>
          </div>
          <div class="h-px bg-gray-200 my-4"></div>
          <div class="">
            <p class="bold-13 3xl:bold-24 text-gray-30 mt-4">
              ¿Ya tienes cuenta?
            </p>
          </div>
          <div class="flexCenter py-1">
            <button @click="goToRoute('Login')" class="btn-primary-outline btn-large btn-dense mt-3 w-10/12 3xl:w-8/12">
              Iniciar sesión
            </button>
          </div>
        </div>
        <!--        <div>
                  <p>Pantalla actual: {{ currentBreakpoint }}</p>
                </div>-->
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
import mixin from "../../utils/Mixin.js";
import axios from "axios";
export default {
  name: "Register",
  mixins: [mixin],
  components: {logo},
  data() {
    return {
      screenWidth: window.innerWidth,
      breakpoints: {
        xs: 400,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
        "3xl": 1680,
        "4xl": 2200,
      },
      data: {
        email: "walter@example.com",
        password: "securepassword123",
        name: "John",
        lastname: "Doe",
        birthdate: "1990-05-15"
      }
    };
  },
  computed: {
    currentBreakpoint() {
      const width = this.screenWidth;
      let breakpoint = "xs"; // Por defecto

      for (const [key, value] of Object.entries(this.breakpoints)) {
        if (width >= value) {
          breakpoint = key;
        }
      }
      return breakpoint;
    },
  },
  methods: {
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
    async registerUser() {
      const userData = { ...this.data };
      console.log("userData");
      console.log(userData);
      try {
        const response = await axios.post('https://flickr-service.onrender.com/auth/register', userData);
        console.log(response);
        this.successMessage = 'Usuario registrado con éxito.';
        this.errorMessage = '';
      } catch (error) {
        console.log(error);
        this.successMessage = '';
        this.errorMessage = 'Hubo un error al registrar el usuario. Intenta nuevamente.';
      }
    },
  },
  mounted() {
   // this.registerUser();
    window.addEventListener("resize", this.updateScreenWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateScreenWidth);
  },
}
</script>

<style scoped>

</style>