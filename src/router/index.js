// Importación de funciones necesarias de vue-router
import { createRouter, createWebHistory } from 'vue-router'

// Importación de componentes de vista para el enrutamiento
import HomeView from '../views/HomeView.vue'            // Vista de inicio
import UploadView from '../views/UploadView.vue'        // Vista para subir archivos
import ListFilesView from '../views/ListFilesView.vue'  // Vista para listar archivos

/**
 * Definición de las rutas de la aplicación
 * Cada ruta es un objeto con las siguientes propiedades:
 * - path: La URL de la ruta
 * - name: Nombre identificativo de la ruta (útil para navegación programática)
 * - component: Componente que se renderizará cuando se acceda a la ruta
 */
const routes = [ // Array de rutas
  {
    path: '/',                    // Ruta raíz de la aplicación
    name: 'home',                 // Nombre de la ruta para referencias internas
    component: HomeView           // Componente que se muestra en esta ruta
  },
  {
    path: '/about',               // Ruta para la página "Acerca de"
    name: 'about',
    // Carga perezosa (lazy loading) del componente AboutView
    // webpackChunkName permite agrupar el código en un chunk separado
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue') // Componente que se muestra en esta ruta
  },
  {
    path: '/upload',              // Ruta para la página de carga de archivos
    name: 'upload',
    component: UploadView         // Componente para subir archivos
  },
  {
    path: '/list',                // Ruta para listar archivos disponibles
    name: 'list',
    component: ListFilesView      // Componente que muestra la lista de archivos
  }
]

/**
 * Creación de la instancia del enrutador
 */
const router = createRouter({
  // Configura el historial HTML5
  // createWebHistory permite URLs limpias (sin #)
  // process.env.BASE_URL es la URL base de la aplicación
  history: createWebHistory(process.env.BASE_URL),
  
  // Asigna el array de rutas definido anteriormente
  routes
})

// Exporta la instancia del enrutador para su uso en la aplicación
export default router
