<!-- 
  Plantilla principal del componente HomeView
  Muestra una lista de comparaciones entre Vue y React
-->
<template>
  <!-- Contenedor principal con clase para estilos -->
  <div class="container">
    <!-- Título principal de la página -->
    <h1>Diferencias entre Vue y React</h1>
    
    <!-- 
      Componente ComparisonCard que se repite para cada comparación
      Usa v-for para iterar sobre el array 'comparisons'
      :key es necesario para el rendimiento de Vue
      Se pasan las props title, description y code a cada instancia
    -->
    <ComparisonCard
      v-for="(item, index) in comparisons"
      :key="index"
      :title="item.title"
      :description="item.description"
      :code="item.code"
    />
  </div>
</template>

<script>
// Importación del componente ComparisonCard que muestra cada comparación
import ComparisonCard from '@/components/ComparisonCard.vue'

export default {
  // Nombre identificativo del componente
  name: 'HomeView',
  
  // Componentes registrados localmente
  components: { 
    ComparisonCard 
  },
  
  // Función que devuelve los datos reactivos del componente
  data() {
    return {
      // Array que contiene las comparaciones entre Vue y React
      comparisons: [
        {
          title: '1. Sintaxis de plantillas',
          description: 'Vue usa HTML templates, React usa JSX.',
          // Ejemplo de código HTML con sintaxis de plantilla de Vue
          code: `&lt;template&gt;
  &lt;div&gt;{{ mensaje }}&lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return { mensaje: 'Hola Vue' }
  }
}
&lt;/script&gt;`
        },
        {
          title: '2. Binding de clases',
          description: 'Vue permite enlazar clases dinámicamente usando :class, React usa lógica JS con className.',
          // Ejemplo de binding de clases en Vue
          code: `&lt;template&gt;
  &lt;div :class="{ activo: isActive }"&gt;Elemento&lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return { isActive: true }
  }
}
&lt;/script&gt;`
        },
        {
          title: '3. Manejo de estado',
          description: 'Vue usa \"reactive data\" por defecto, React usa useState y hooks.',
          // Ejemplo de manejo de estado en Vue
          code: `&lt;script&gt;
export default {
  data() {
    return { contador: 0 }
  },
  methods: {
    incrementar() {
      this.contador++
    }
  }
}
&lt;/script&gt;`
        },
        {
          title: '4. Comunicación entre componentes',
          description: 'Vue usa props y $emit, React también usa props pero maneja eventos de forma diferente.',
          // Ejemplo de comunicación entre componentes en Vue
          code: `&lt;ParentComponent&gt;
  &lt;ChildComponent @custom-event="handleEvent" /&gt;
&lt;/ParentComponent&gt;

&lt;script&gt;
// en ChildComponent.vue
this.$emit('custom-event')
&lt;/script&gt;`
        }
      ]
    }
  }
}
</script>

<!-- 
  Estilos con alcance limitado a este componente
  Usa 'scoped' para evitar conflictos de estilos con otros componentes
-->
<style scoped>
/* Contenedor principal con ancho máximo y centrado */
.container {
  max-width: 900px;    /* Ancho máximo del contenido */
  margin: auto;        /* Centra el contenedor horizontalmente */
  padding: 2rem;       /* Espaciado interno */
}

/* Estilos adicionales para mejorar la legibilidad */
h1 {
  color: #2c3e50;      /* Color oscuro para el título */
  margin-bottom: 2rem; /* Espaciado inferior */
  text-align: center;  /* Centra el texto */
}
</style>
