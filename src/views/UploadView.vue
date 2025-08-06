<!-- 
  Plantilla del componente UploadView
  Permite subir archivos ZIP y listar archivos disponibles
-->
<template>
  <!-- Contenedor principal con clase para estilos -->
  <div class="upload-container">
    <!-- Título principal -->
    <h1>Subir y listar archivos ZIP</h1>

    <!-- Selector de archivo -->
    <input 
      type="file" 
      @change="handleFileUpload" 
      accept=".zip" 
      aria-label="Seleccionar archivo ZIP"
      class="file-input"
    />

    <!-- Botón para subir el archivo seleccionado -->
    <button 
      @click="uploadFile" 
      :disabled="!isZipFileSelected"
      :class="{ 'disabled': !isZipFileSelected }"
      class="upload-button"
    >
      Subir ZIP
    </button>

    <!-- Lista de archivos disponibles -->
    <h2>Archivos disponibles</h2>
    <ul v-if="files.length > 0" class="file-list">
      <!-- Itera sobre la lista de archivos -->
      <li 
        v-for="file in files" 
        :key="file.id" 
        @click="promptPassword(file)"
        class="file-item"
      >
        📄 {{ file.name }}
      </li>
    </ul>
    <p v-else class="no-files">No hay archivos disponibles</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storage, db } from '@/firebase/firebase'
import {
  ref as storageRef,
  uploadBytes
} from 'firebase/storage'
import {
  collection,
  addDoc,
  onSnapshot
} from 'firebase/firestore'
import Swal from 'sweetalert2'

// Estado de archivos
const selectedFile = ref(null)
const files = ref([])

// Validar si el archivo seleccionado es ZIP
const isZipFileSelected = computed(() => {
  return selectedFile.value && selectedFile.value.name.endsWith('.zip')
})


// EVENTOS
// Manejar selección de archivo
const handleFileUpload = (e) => { // Maneja la selección de archivo
  const file = e.target.files[0] // Obtiene el archivo seleccionado
  if (!file) return // Si no hay archivo, sale de la función

  if (!file.name.endsWith('.zip')) { // Si el archivo no es ZIP, sale de la función 
    Swal.fire({ // Muestra un mensaje de error Usamos la libreria de JS SweerAlert2
      icon: 'error',
      title: 'Archivo inválido',
      text: 'Solo se permiten archivos ZIP.'
    })
    selectedFile.value = null // Limpia el archivo seleccionado
    return
  }

  selectedFile.value = file // Guarda el archivo seleccionado
} 


// Subir archivo ZIP y simular descompresión
const uploadFile = async () => { // Sube el archivo ZIP y simula descompresión
  if (!selectedFile.value) return

  const file = selectedFile.value
  const fileRef = storageRef(storage, `uploads/${file.name}`)
  await uploadBytes(fileRef, file)

  Swal.fire({ // Muestra un mensaje de exito Usamos la libreria de JS SweerAlert2
    icon: 'success',
    title: 'Éxito',
    text: 'Archivo ZIP subido exitosamente. (Descompresión simulada)'
  })

  // Simulación de archivos descomprimidos
  const fakeUnzippedFiles = [
    { name: 'archivo1.txt', url: 'https://example.com/archivo1.txt' },
    { name: 'archivo2.txt', url: 'https://example.com/archivo2.txt' }
  ]

  for (const file of fakeUnzippedFiles) {
    await addDoc(collection(db, 'archivosDescomprimidos'), file)
  }

  selectedFile.value = null
}

// Leer archivos descomprimidos en tiempo real
onMounted(() => {
  const filesCollection = collection(db, 'archivosDescomprimidos')
  onSnapshot(filesCollection, (snapshot) => {
    files.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
  })
})

// Solicitar clave antes de descargar archivo
const promptPassword = (file) => { // Solicita la clave antes de descargar el archivo
  Swal.fire({ // Muestra un mensaje de exito Usamos la libreria de JS SweerAlert2
    title: 'Protegido',
    input: 'password',
    inputLabel: 'Introduce la clave para descargar',
    inputPlaceholder: 'Clave...',
    showCancelButton: true,
    confirmButtonText: 'Descargar',
    preConfirm: (value) => {
      if (!value) {
        Swal.showValidationMessage('Debes ingresar una clave')
      }
      return value
    }
  }).then((result) => {
    if (result.isConfirmed) {
      if (result.value === '123456') {
        window.open(file.url, '_blank')
      } else {
        Swal.fire({ // Muestra un mensaje de error Usamos la libreria de JS SweerAlert2 
          icon: 'error',
          title: 'Clave incorrecta',
          text: 'La clave que ingresaste no es válida.'
        })
      }
    }
  })
}
</script>

<style scoped>
.upload-container {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
}

input[type='file'] {
  margin-bottom: 1rem;
}

button {
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
}

li:hover {
  background-color: #f0f0f0;
}
</style>
