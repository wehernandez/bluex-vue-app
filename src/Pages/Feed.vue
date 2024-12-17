<template>
  <div>
    <Header :user="user"></Header>
    <div class="pt-32 md:pt-40">
      <div class="w-12/12 relative">
        <h1 class="bold-32 md:bold-40 text-primary text-center">
          ¡{{textTitle}} <span class="text-secondary"> {{ user ? user.name : "" }}</span>!
        </h1>
        <div class="absolute top-0 left-0">
          <img
              :src="handLeft"
              loading="lazy"
              class="w-32 md:w-full"
          />
        </div>
        <div class="absolute top-0 right-0">
          <img
              :src="handRight"
              loading="lazy"
              class="w-32 md:w-full"
          />
        </div>
      </div>
      <div class="max-container padding-container">
        <div class="flexCenter flex-col pb-10">
          <div class="w-12/12 md:w-6/12 py-5">
            <h3 class="bold-24 text-gray-30">
              ¿Cuál es tú feed hoy?
            </h3>
          </div>
          <div class="w-full md:w-6/12 relative">
            <input
                v-model="searchText"
                @keydown.enter="resetSearch"
                type="text"
                class="input-field-search py-7"
                placeholder="Escribe aquí lo que deseas buscar">
            <div @click="resetSearch" class="absolute top-2 right-3">
              <img
                  src="/img/search.png"
                  loading="lazy"
                  class="h-10 w-10"
              />
            </div>
            <div  class="flex flex-row items-center h-16">
              <h3 class="text-primary font-bold pb-2"> Tags:</h3>
              <input
                  @keydown.enter="handleLocalTag()"
                  v-model="localTag"
                  class="ml-4 input-tag" type="text" placeholder="Añade tags a tu búsqueda escribiendo acá">
            </div>
            <div>
              <Tag
                  class="mx-1"
                  v-for="(tag, index) in currentTags"
                  :key="index"
                  @deleteTag="deleteTag"
                  :can-close="true"
                  :text="tag">
              </Tag>
            </div>
          </div>
        </div>
        <div v-if="!loading && searched === true && images.length < 1" class="p-4 flex flex-col items-center justify-center">
          <div class="text-left">
            <h1 class="font-bold text-4xl text-primary">
              Probemos suerte con algo más...
            </h1>
            <h3 class="font-bold text-2xl text-gray-500">
              No hemos podido obtener resultados.
            </h3>
          </div>
        </div>
        <div v-if="loading">
          <div class="mt-10 3xl:mt-16 h-40">
            <loader></loader>
          </div>
        </div>
        <div v-else class="p-4">
          <!-- Contenedor principal -->
          <div class="columns-2 md:columns-4 gap-4">
            <!-- Bucle de imágenes -->
            <div
                @click="handleImageDetail(image)"
                v-for="(image, index) in images"
                :key="image.id"
                class="mb-4 break-inside-avoid relative group image-slide-up"
            >
              <img
                  :src="image.media"
                  :alt="image.title"
                  class="w-full rounded-lg shadow-md object-cover"
              />
              <!-- Overlay negro con opacidad -->
              <div
                  class="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition duration-300 ease-in-out rounded-lg"
              >
                <p class="text-white ml-4 mt-4">No.{{index + 1}}</p>
              </div>
            </div>
          </div>
          <!-- Botón de cargar más -->
          <div v-if="images.length > 0 &&  currentPage < maxPages" class="flexCenter mt-4">
            <button
                @click="fetchImages(currentPage + 1)"
                class="btn-primary-outline btn-large btn-dense mt-3 w-10/12 3xl:w-8/12"
            >
              <svg v-if="loadingCharge" aria-hidden="true" class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-15 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              {{loadingCharge? "Cargando" : "Cargar más"}}
            </button>
          </div>
        </div>
        <!-- Modal detalle -->
        <Modal
            :show="showDetail"
            @close="showDetail = false"
            @confirm="handleConfirm"
            :cancel-button="false"
        >
          <detail-container :current-item="currentItem" @addTag="addTag"></detail-container>
        </Modal>
      </div>
    </div>
    <!-- Botón de scroll hacia arriba -->
    <button
        v-if="showScrollButton"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 px-4 py-3 bg-secondary text-white rounded-lg shadow-lg transition-opacity duration-300"
    >
      ↑
    </button>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import axios from "axios";
import Modal from "../components/Partials/Modal.vue";
import DetailContainer from "../components/Feed/DetailContainer.vue";
import Loader from "../components/Partials/loader.vue";
import Tag from "../components/Partials/Tag.vue";

export default {
  name: "Feed",
  components: {Tag, Loader, DetailContainer, Modal, Header},
  data() {
    return {
      showDetail: false,
      currentItem: {
        id: "",
        title: "",
        media: "",
        description: "",
        author: "",
        views: "",
        tags: "",
      },
      defaultItem: {
        id: "",
        title: "",
        media: "",
        description: "",
        author: "",
        views: "",
        tags: "",
      },
      screenWidth: window.innerWidth,
      searchText : "",
      currentPage: 1,
      maxPages: null, // Se establece después de la primera solicitud
      images: [],
      loading: false,
      loadingCharge: false,
      currentTags: [],
      localTag: "",
      showScrollButton: false, // Controla la visibilidad del botón
      user: null, // Almacena la información del usuario
      searched : false,
    };
  },
  computed:{
    textTitle(){
      if (this.loading) {
        return "Espera un momento, ";
      }

      if(this.searched === true && this.images.length < 1 ){
        return "Algo pasó, "
      }

      return this.images.length > 0 ? 'Estos son los resultados' : 'Que bueno verte de nuevo'
    },
    handLeft(){
      if (this.loading) {
        return "";
      }
      if (this.images.length > 0 && !this.searched) {
        return "/img/manoRock.png";
      }

      if (this.searched && this.images.length === 0) {
        return "/img/manoBad.png";
      }
      return "/img/manoRock.png";
    },
    handRight(){
      if (this.loading) {
        return "";
      }
      if (this.images.length > 0 && !this.searched) {
        return "/img/manoGood.png";
      }

      if (this.searched && this.images.length === 0) {
        return "/img/manoSuerte.png";
      }
      return "/img/manoGood.png";
    }
  },
  methods: {
    handleLocalTag(){
      this.addTag(this.localTag);
      this.localTag = "";
    },
    addTag(tag){
      this.currentTags.push(tag);
      this.resetSearch();
      this.showDetail = false;
    },
    deleteTag(tag) {
      let index = this.currentTags.findIndex((item) => item === tag);
      if (index !== -1) {
        this.currentTags.splice(index, 1);
        this.resetSearch();
      } else {
        console.warn("El tag no fue encontrado:", tag);
      }
    },
    handleImageDetail(item){
      this.currentItem = Object.assign({}, item);
      this.showDetail = true;
    },
    handleConfirm() {
      this.showDetail = false;
    },
    resetSearch() {
      this.images = [];
      this.currentPage = 1;
      this.maxPages = 5;
      this.searched = false;
      this.fetchImages(1);
    },
    async fetchImages(page) {
      try {
        if(page ===1){
          this.loading = true;
          this.searched = true;
        }else{
          this.loadingCharge = true;
        }
        const response = await axios.get("/api/flickr-feed", {
          params: {
            search: this.searchText,
            per_page: 10,
            page: page,
            tags: this.currentTags.join(','),
          },
        });

        if (response.data) {
          const { photos, pagination } = response.data;
          this.addImagesGradually(photos);
          // Ordenar las imágenes por el índice
          this.images.sort((a, b) => a.index - b.index);

          this.currentPage = pagination.page;
          this.maxPages = pagination.pages;
          if(page ===1){
            this.loading = false;
          }else{
            this.loadingCharge = false;
          }
        } else {
          console.warn("No se encontraron imágenes.");
          this.loading = false;
        }
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
        this.loading = false;
      }
    },
    addImagesGradually(photos) {
      const newImages = photos.map((item, index) => ({
        id: item.id,
        title: item.title,
        media: item.media,
        description: item.description,
        author: item.author,
        views: item.views,
        tags: item.tags,
        index: this.images.length + index,
      }));

      newImages.forEach((image, idx) => {
        setTimeout(() => {
          this.images.push(image);
        }, idx * 500);
      });
    },
    handleScroll() {
      this.showScrollButton = window.scrollY > 200;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    async fetchUser() {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("api/auth/me", {
          headers: {
            Authorization: `${token}`,
          },
        });
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error.message);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        this.user = null;
      }
    },
  },
  mounted() {
    this.fetchUser();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    // Limpiar el evento al destruir el componente
    window.removeEventListener("scroll", this.handleScroll);
  },
}
</script>

<style scoped>
/* Animación de fade + slide desde abajo */
.image-slide-up {
  opacity: 0;
  transform: translateY(50px); /* Comienza 50px debajo */
  animation: slideUp 1s ease-out forwards;
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(50px); /* Empieza desde abajo */
  }
  100% {
    opacity: 1;
    transform: translateY(0); /* Termina en su posición original */
  }
}
</style>