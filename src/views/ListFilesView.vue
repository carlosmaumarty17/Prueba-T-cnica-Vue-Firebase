<!-- Plantilla del componente que muestra la lista de archivos disponibles -->
<template>
  <!-- Contenedor principal con clase para estilos -->
  <div class="container">
    <!-- Título de la sección -->
    <h2>Archivos disponibles para descarga</h2>
    <!-- Lista no ordenada para mostrar los archivos -->
    <ul>
      <!-- Itera sobre cada archivo en el array 'files' -->
      <li v-for="file in files" :key="file.id">
        <!-- Muestra el nombre del archivo -->
        {{ file.fileName }}
        <!-- Botón para iniciar la descarga del archivo -->
        <button @click="handleDownload(file)">Descargar</button>
      </li>
    </ul>
  </div>
</template>

<!-- Script con la lógica del componente usando Composition API -->
<script setup>
// Importaciones necesarias de Vue y Firebase
import { ref, onMounted } from 'vue'  // Funciones reactivas y ciclo de vida
import { db } from '@/firebase/firebase'  // Instancia de Firestore
import { collection, onSnapshot } from 'firebase/firestore'  // Funciones de Firestore

// Estado reactivo para almacenar la lista de archivos
const files = ref([])

// Hook que se ejecuta cuando el componente se monta en el DOM
onMounted(() => {
  // Referencia a la colección 'archivosDescomprimidos' en Firestore
  const filesCollection = collection(db, 'archivosDescomprimidos')
  
  // Escucha cambios en la colección en tiempo real
  onSnapshot(filesCollection, (snapshot) => {
    // Mapea los documentos a un array de objetos con id y datos
    files.value = snapshot.docs.map(doc => ({
      id: doc.id,  // ID del documento en Firestore
      ...doc.data()  // Todos los campos del documento
    }))
    console.log('Archivos actualizados:', files.value)
  })
})

/**
 * Maneja la descarga de un archivo
 * @param {Object} file - Objeto que representa el archivo a descargar
 */
const handleDownload = (file) => {
  // Solicita al usuario que ingrese la clave de descarga
  const clave = prompt('Ingresa la clave para descargar el archivo:')
  
  // Verifica si se ingresó una clave
  if (!clave) {
    alert('Debes ingresar una clave.')
    return
  }

  // Verifica si la clave es correcta
  if (clave === file.clave) {
    // Abre la URL de descarga en una nueva pestaña
    window.open(file.downloadUrl, '_blank')
  } else {
    alert('Clave incorrecta.')
  }
}
</script>

<!-- Estilos con alcance limitado a este componente -->
<style scoped>
/* Contenedor principal centrado con ancho máximo */
.container {
  max-width: 800px;    /* Ancho máximo del contenedor */
  margin: auto;        /* Centra el contenedor horizontalmente */
  padding: 2rem;       /* Espaciado interno */
}

/* Estilos para la lista no ordenada */
ul {
  list-style-type: none;  /* Elimina los puntos de la lista */
  padding: 0;            /* Elimina el padding por defecto */
}

/* Estilos para los elementos de la lista */
li {
  margin-bottom: 1rem;    /* Espaciado inferior entre elementos */
  display: flex;          /* Usa flexbox para alinear elementos */
  align-items: center;    /* Centra verticalmente los elementos */
  justify-content: space-between; /* Distribuye el espacio entre elementos */
  padding: 0.5rem;        /* Espaciado interno */
  border-bottom: 1px solid #eee; /* Línea divisoria sutil */
}

/* Estilos para el botón de descarga */
button {
  margin-left: 1rem;      /* Margen izquierdo para separar del texto */
  padding: 0.5rem 1rem;   /* Espaciado interno */
  background-color: #42b983; /* Color de fondo verde */
  color: white;           /* Color del texto */
  border: none;           /* Sin borde */
  border-radius: 4px;     /* Bordes redondeados */
  cursor: pointer;        /* Cambia el cursor al pasar sobre el botón */
  transition: background-color 0.3s; /* Transición suave para el hover */
}

/* Efecto hover para el botón */
button:hover {
  background-color: #369f6b; /* Color más oscuro al pasar el mouse */
}
</style>
