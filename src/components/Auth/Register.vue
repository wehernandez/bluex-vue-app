<template>
  <div>
    <div class="flex flex-row">
      <!-- Formulario de registro -->
      <div class="w-10/12 md:w-6/12">
        <div class="px-10 md:px-24 pt-5 3xl:pt-24 3xl:p-36">
          <!-- Logo -->
          <div class="flexCenter pb-0">
            <logo :width="currentBreakpoint === '3xl' ? 290 : 160" :height="currentBreakpoint === '3xl' ? 150 : 90"></logo>
          </div>
          <!-- Título -->
          <div class="w-12/12 md:w-11/12 3xl:w-10/12">
            <h1 class="bold-20 3xl:bold-32 text-primary">
              ¡Registrarse en bluex es muy fácil!
            </h1>
            <p class="bold-13 3xl:bold-20 text-gray-30 mt-2">
              Por favor llena todos los campos solicitados
            </p>
          </div>
          <!-- Inputs -->
          <form @submit.prevent="registerUser">
            <div class="bg-white md:px-5 3xl:px-20 pt-5">
              <div v-for="field in formFields" :key="field.id" class="input-wrapper mt-5">
                <input
                    v-model="data[field.model]"
                    :type="field.id === 'password' && showPassword ? 'text' : field.type"
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

                <!-- Icono para mostrar/ocultar la contraseña -->
                <button
                    v-if="field.id === 'password'"
                    type="button"
                    class="absolute right-4 top-2"
                    @click="showPassword = !showPassword"
                    :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                >
                  <span v-if="showPassword" class="">
                     <img
                         src="/img/eye.png"
                         loading="lazy"
                         class="pt-1"
                     />
                  </span>
                  <span v-else>
                    <img
                        src="/img/eyeNot.png"
                        loading="lazy"
                    />
                  </span>
                </button>
              </div>
            </div>
            <!-- Botón de registro -->
            <div class="flexCenter py-2">
              <button :disabled="loading" class="btn-primary btn-large btn-dense mt-5 w-12/12 md:w-10/12 3xl:w-9/12">
                {{loading? "Espera por favor" : "Registrarse"}}
              </button>
            </div>
          </form>
          <div v-if="errorMessage" class="text-red-500 mt-2 text-sm text-center">{{ errorMessage }}</div>
          <!-- Separador -->
          <div class="h-px bg-gray-200 my-4"></div>

          <!-- Redirección a inicio de sesión -->
          <div>
            <p class="bold-13 3xl:bold-24 text-gray-30 mt-4">¿Ya tienes cuenta?</p>
          </div>
          <div class="flexCenter py-1">
            <button :disabled="loading" @click="goToRoute('Login')" class="btn-primary-outline btn-large btn-dense mt-3 w-12/12 md:w-10/12 3xl:w-8/12">
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
      <!-- Imagen -->
      <div class="w-2/12 md:w-6/12 bg-primary h-screen">
        <img
          src="/img/bg-register.jpg"
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
      loading: false,
      showPassword: false,
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
    validateForm() {
      // Reset error message
      this.errorMessage = "";

      // Validación de email
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!this.data.email || !emailRegex.test(this.data.email)) {
        this.errorMessage = "Por favor ingrese un correo electrónico válido.";
        return false;
      }

      // Validación de name y lastname
      if (!this.data.name || !this.data.lastname) {
        this.errorMessage = "Los campos de nombre y apellido no pueden estar vacíos.";
        return false;
      }

      // Validación de password (mínimo 8 caracteres, una mayúscula y un carácter especial)
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!this.data.password || !passwordRegex.test(this.data.password)) {
        this.errorMessage = "La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.";
        return false;
      }

      return true;
    },
    async registerUser() {
      if(this.validateForm()){
        try {
          this.loading = true;
          const response = await axios.post("/api/auth/register", this.data);
          this.$notify(
              {
                group: 'generic',
                title: 'Excelente!',
                text: 'Usuario registrado con éxito. Serás redirigido al inicio de sesión.',
              },
              5000,
          )
          setTimeout(() => {
            this.loading = false;
            this.$router.push({ name: "Login" });
          }, 3000);
        } catch (error) {
          this.loading = false;
          const errorMsg = error.response?.data?.error || "Hubo un error al registrar el usuario.";
          this.$notify(
              {
                group: 'error',
                title: 'Lo sentimos!',
                text: errorMsg,
              },
              5000,
          )
          console.error("Error al registrar usuario:", error.response?.data || error.message);
        }
      }
    },
    goToRoute(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>