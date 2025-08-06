<template>
    <div class="card">
      <h2>{{ title }}</h2> 
      <p>{{ description }}</p>
      <pre><code ref="codeBlock" class="language-html" v-html="code"></code></pre>
    </div>
  </template>
  
  <!-- Este componente muestra la comparación entre características de Vue y React de forma clara, dividida y estilizada.-->

  <script>
  import hljs from 'highlight.js' // Importa la libreria Highlight.js para dar colores
  import 'highlight.js/styles/github.css' // Importa los estilos de GitHub
  
  export default { // Exporta el componente
    name: 'ComparisonCard', // Nombre del componente
    props: { // Props del componente
      title: String, // Titulo del componente
      description: String, // Descripcion del componente
      code: String // Codigo del componente
    },
    mounted() { // Al montar el componente
      this.highlight()
    },
    updated() { // Al actualizar el componente
      this.highlight()
    },
    methods: { // Metodos del componente  
      highlight() {
        const block = this.$refs.codeBlock
        if (block) hljs.highlightElement(block)
      }
    }
  }
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 1rem;
    margin: 1rem 0;
    background: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.05);
  }
  pre {
    background: #f6f8fa;
    padding: 1rem;
    overflow-x: auto;
    border-radius: 5px;
  }
  </style>
  