<template>
  <div>
    <div class="flex flex-row">
      <!-- Formulario de registro -->
      <div class="w-6/12">
        <div class="px-24 pt-5 3xl:pt-14 3xl:p-36">
          <!-- Logo -->
          <div class="flexCenter pb-0">
            <logo :width="currentBreakpoint === '3xl' ? 290 : 160" :height="currentBreakpoint === '3xl' ? 150 : 90"></logo>
          </div>
          <!-- Título -->
          <div class="w-11/12 3xl:w-10/12">
            <h1 class="bold-20 3xl:bold-32 text-primary">
              ¡Registrarse en bluex es muy facil!
            </h1>
            <p class="bold-13 3xl:bold-20 text-gray-30 mt-2">
              Por favor llena todos los campos solicitados
            </p>
          </div>
          <!-- Inputs -->
          <div class="bg-white px-5 3xl:px-20 pt-5">
            <div v-for="field in formFields" :key="field.id" class="input-wrapper mt-5">
              <input
                v-model="data[field.model]"
                :type="field.type"
                :id="field.id"
                :name="field.id"
                :placeholder="field.placeholder"
                class="input-field peer"
                required
              />
              <label
                :for="field.id"
                class="input-label-base -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-50 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-primary peer-focus:text-sm"
              >
                {{ field.label }}
              </label>
            </div>
          </div>

          <!-- Botón de registro -->
          <div class="flexCenter py-2">
            <button @click="registerUser" class="btn-primary btn-large btn-dense mt-5 w-10/12 3xl:w-9/12">
              Registrarse
            </button>
          </div>

          <!-- Separador -->
          <div class="h-px bg-gray-200 my-4"></div>

          <!-- Redirección a inicio de sesión -->
          <div>
            <p class="bold-13 3xl:bold-24 text-gray-30 mt-4">¿Ya tienes cuenta?</p>
          </div>
          <div class="flexCenter py-1">
            <button @click="goToRoute('Login')" class="btn-primary-outline btn-large btn-dense mt-3 w-10/12 3xl:w-8/12">
              Iniciar sesión
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
  name: "Register",
  components: { logo },
  data() {
    return {
      data: {
        email: "",
        name: "",
        lastname: "",
        birthdate: "",
        password: "",
      },
      formFields: [
        { id: "email", label: "Correo electrónico", placeholder: "Correo electrónico", type: "email", model: "email" },
        { id: "name", label: "Nombre", placeholder: "Nombre", type: "text", model: "name" },
        { id: "lastname", label: "Apellido", placeholder: "Apellido", type: "text", model: "lastname" },
        { id: "birthdate", label: "Fecha de nacimiento", placeholder: "Fecha nacimiento", type: "date", model: "birthdate" },
        { id: "password", label: "Contraseña", placeholder: "Contraseña", type: "password", model: "password" },
      ],
      successMessage: "",
      errorMessage: "",
    };
  },
  computed: {
    currentBreakpoint() {
      const breakpoints = { xs: 400, sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536, "3xl": 1680 };
      const width = window.innerWidth;
      return Object.keys(breakpoints)
        .reverse()
        .find((key) => width >= breakpoints[key]) || "xs";
    },
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post("https://flickr-service.onrender.com/auth/register", this.data);

        // Registro exitoso
        console.log("Registro exitoso:", response.data);
        alert("Usuario registrado con éxito. Serás redirigido al inicio de sesión.");
        this.$router.push({ name: "Login" }); // Redirige al login
      } catch (error) {
        console.error("Error al registrar usuario:", error.response?.data || error.message);

        // Manejo de errores
        const errorMsg = error.response?.data?.message || "Hubo un error al registrar el usuario.";
        alert(errorMsg);
      }
    },
    goToRoute(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>