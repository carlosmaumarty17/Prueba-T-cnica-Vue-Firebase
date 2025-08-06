<template>
  <!-- Barra de navegación principal de la aplicación -->
  <nav>
    <!-- Enlace a la página de Inicio -->
    <router-link to="/">Home</router-link> |
    <!-- Enlace a la página Acerca de -->
    <router-link to="/about">About</router-link> |
    <!-- Enlace a la página para subir archivos ZIP -->
    <router-link to="/upload">Subir ZIP</router-link> |
    <!-- Enlace a la lista de archivos -->
    <router-link to="/list">Lista de archivos</router-link> 
  </nav>
  
  <!-- Componente que renderiza la vista actual según la ruta -->
  <router-view />
</template>

<style>
/* Estilos generales de la aplicación */
#app {
  /* Fuente principal de la aplicación */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* Mejora el renderizado de fuentes en navegadores basados en WebKit (Chrome, Safari) */
  -webkit-font-smoothing: antialiased;
  /* Mejora el renderizado de fuentes en Firefox */
  -moz-osx-font-smoothing: grayscale;
  /* Centra el texto */
  text-align: center;
  /* Color principal del texto */
  color: #2c3e50;
}

/* Estilos de la barra de navegación */
nav {
  /* Espaciado interno */
  padding: 30px;
}

/* Estilos de los enlaces de navegación */
nav a {
  /* Grosor de la fuente */
  font-weight: bold;
  /* Color del texto de los enlaces */
  color: #2c3e50;
  /* Quita el subrayado por defecto de los enlaces */
  text-decoration: none;
  /* Margen horizontal entre enlaces */
  margin: 0 10px;
}

/* Estilo para el enlace de la ruta activa */
nav a.router-link-exact-active {
  /* Color verde para indicar la página actual */
  color: #42b983;
}
</style>
