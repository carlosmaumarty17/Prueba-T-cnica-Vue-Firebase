# 🚀 Prueba Técnica Vue 3 + Firebase

Este proyecto es una prueba técnica donde se implementa un sitio web con **Vue 3** usando `vue-cli`, desplegado en **Firebase Hosting**, y que incluye:

1. 🧠 Comparación visual y funcional entre **Vue** y **React**
2. 📁 Subida y descompresión de archivos ZIP en **Firebase Storage**
3. 🔐 Descarga segura de archivos con clave
4. 🧾 Registro de archivos en **Firestore** y visualización dinámica en frontend

🔗 **Sitio web desplegado:** [https://ejemplofirebase-e51c2.web.app/](https://ejemplofirebase-e51c2.web.app/)

---

## 📦 Tecnologías utilizadas

- ⚙️ Vue 3 + vue-cli
- 🔥 Firebase Hosting, Firebase Storage, Firestore
- 🖥️ Firebase Emulator Suite (para desarrollo local)
- 🔧 Backend con funciones para descompresión de ZIP

---

## 🧪 Parte 1: Comparación entre Vue y React

### ✅ Objetivo

Mostrar de forma interactiva 4 diferencias principales entre **Vue** y **React**, apoyándonos en artículos técnicos.

### 📌 Diferencias destacadas (basado en artículos verificados):

| Vue | React |
|-----|-------|
| Sintaxis basada en templates | JSX basado en JavaScript |
| Enlace de datos bidireccional (`v-model`) | Enlace unidireccional de datos |
| Sistema de reactividad automático con proxies | Uso explícito de `useState` y `useEffect` |
| Separación de lógica, plantilla y estilos en archivos `.vue` | Todo en componentes con JSX |

> Fuente: [Vue vs React - Kinsta](https://kinsta.com/blog/vue-vs-react/)

### 🎨 Vista

Se construyó una vista con 4 **tarjetas interactivas** (`ComparisonCard.vue`) donde se muestra:

- 🧩 Código Vue de ejemplo
- 🔎 Explicación textual
- ✅ Diferencia aplicada visualmente

---

## ☁️ Parte 2: Subida y descompresión de ZIP

### 🎯 Funcionalidad

En una vista adicional:

1. 📤 Se permite **subir archivos ZIP** a Firebase Storage.
2. 🧩 El backend (carpeta `functions/`) se encarga de:
   - Descomprimir el archivo
   - Subir los archivos descomprimidos nuevamente a Firebase Storage
   - Registrar los nombres de archivos en una colección de **Firestore**

### 🛠️ Backend (carpeta `/functions`)

- Utiliza `adm-zip` para descomprimir archivos
- Lógica de seguridad incluida para validar claves de descarga
- Inserta los nombres de archivos en una colección Firestore: `unzipped_files`

---

## 📃 Listado y descarga de archivos

### 👁️ Visualización

- La vista lista los archivos en tiempo real con `onSnapshot()` desde Firestore.
- Cada archivo puede ser descargado con un clic.

### 🔐 Seguridad

- Al hacer clic para descargar un archivo, se solicita una **clave de acceso**
- La clave es validada desde backend antes de generar el enlace de descarga

> La metodología de validación puede basarse en hashing o tokens temporales

---

## 🔧 Instalación y ejecución local

```bash
git clone https://github.com/carlosmaumarty17/Prueba-T-cnica-Vue-Firebase.git
cd Prueba-Tecnica-Vue-Firebase
npm install
