<template>
  <!-- Contenedor principal del modal -->
  <div
      v-if="show"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <!-- Contenido del modal -->
    <div class="relative bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
      <!-- Botón para cerrar el modal -->
      <button
          @click="closeModal"
          class="absolute top-4 right-4 text-gray-30 hover:text-gray-50"
      >
        &times;
      </button>

      <!-- Título del modal -->
      <h2 class="text-xl font-semibold mb-4 text-primary">
        {{ title }}
      </h2>

      <!-- Contenido dinámico -->
      <div class="text-gray-600">
        <slot></slot>
      </div>

      <!-- Botones opcionales -->
      <div class="mt-6 flex justify-end gap-2">
        <button
            v-if="cancelButton"
            @click="closeModal"
            class="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
        <button
            @click="confirmModal"
            class="px-4 py-2 rounded bg-primary text-white hover:bg-primary-700 transition"
        >
          Aceptar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ""
    },
    cancelButton:{
      type: Boolean,
      default: true,
    }
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    confirmModal() {
      this.$emit("confirm");
    }
  }
};
</script>

<style scoped>
</style>
