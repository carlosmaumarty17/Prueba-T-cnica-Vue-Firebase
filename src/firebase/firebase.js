// Importaciones de los módulos necesarios de Firebase
import { initializeApp } from "firebase/app"         // Para inicializar la aplicación de Firebase
import { getFirestore } from "firebase/firestore"    // Para interactuar con Firestore (base de datos)
import { getStorage } from "firebase/storage"         // Para interactuar con Firebase Storage (almacenamiento de archivos)

/**
 * Configuración de la aplicación Firebase
 * Estas credenciales son únicas para cada proyecto en Firebase Console
 * @type {Object}
 */
const firebaseConfig = {
  // Clave de API para identificar la aplicación en los servicios de Google
  apiKey: "AIzaSyDAqmMyGbqqUqo2Ndt_c1u2s6we5Ercu-U",
  
  // Dominio autorizado para la autenticación
  authDomain: "ejemplofirebase-e51c2.firebaseapp.com",
  
  // Identificador único del proyecto en Firebase
  projectId: "ejemplofirebase-e51c2",
  
  // URL del bucket de almacenamiento en la nube
  storageBucket: "ejemplofirebase-e51c2.appspot.com",
  
  // ID del remitente para Firebase Cloud Messaging (notificaciones push)
  messagingSenderId: "1082305159625",
  
  // Identificador único de la aplicación en Firebase
  appId: "1:1082305159625:web:70fc3f78e74e4c531b0818",
  
  // ID de medición opcional para Google Analytics
  measurementId: "G-194C1NZN7Y"
}

/**
 * Inicialización de la aplicación Firebase con la configuración proporcionada
 * @type {FirebaseApp}
 */
const app = initializeApp(firebaseConfig)

// Exportar instancias inicializadas de los servicios de Firebase que se usarán en la aplicación

/**
 * Instancia de Firestore (base de datos NoSQL en tiempo real)
 * @type {Firestore}
 */
export const db = getFirestore(app)

/**
 * Instancia de Firebase Storage (almacenamiento de archivos)
 * @type {FirebaseStorage}
 */
export const storage = getStorage(app)
