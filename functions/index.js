// Importación de módulos necesarios
const functions = require("firebase-functions");         // Módulo principal de Firebase Functions
const admin = require("firebase-admin");                 // SDK de administración de Firebase
const { Storage } = require("@google-cloud/storage");    // Cliente de Google Cloud Storage
const AdmZip = require("adm-zip");                       // Para manejar archivos ZIP
const { v4: uuidv4 } = require("uuid");                  // Para generar identificadores únicos
const path = require("path");                            // Para manejar rutas de archivos
const os = require("os");                                // Para acceder a funcionalidades del sistema operativo
const fs = require("fs");                                // Para operaciones de sistema de archivos


// La carpeta functions la creamos con el propósito de implementar una función backend (Cloud Function) en Firebase 


// Inicialización de la aplicación de administración de Firebase
admin.initializeApp();
// Creación de una instancia del cliente de Storage
const storage = new Storage();

/**
 * Función de Cloud que se activa cuando se sube un archivo a Storage
 * Descomprime archivos ZIP y sube su contenido al mismo bucket
 */
exports.descomprimirZip = functions.storage.object().onFinalize(async (object) => { // Función que se ejecuta cuando se sube un archivo a Storage
  // Obtiene el bucket y la información del archivo subido
  const bucket = storage.bucket(object.bucket);
  const filePath = object.name;           // Ruta completa del archivo en el bucket
  const contentType = object.contentType;  // Tipo MIME del archivo

  // Verifica si el archivo es un ZIP
  if (!filePath.endsWith(".zip")) {
    console.log("El archivo no es un .zip, se omite.");
    return null;
  }

  // Configura las rutas temporales para el procesamiento
  const tempFilePath = path.join(os.tmpdir(), path.basename(filePath));  // Ruta temporal para el ZIP
  const zipFileName = path.basename(filePath, ".zip");                   // Nombre del archivo sin extensión
  const destinationFolder = path.dirname(filePath);                      // Carpeta de destino en Storage

  // Descarga el archivo ZIP al sistema de archivos temporal
  await bucket.file(filePath).download({ destination: tempFilePath });
  console.log(`Archivo ZIP descargado localmente en ${tempFilePath}`);

  // Crea una instancia de AdmZip con el archivo descargado
  const zip = new AdmZip(tempFilePath);
  // Obtiene la lista de entradas (archivos) dentro del ZIP
  const zipEntries = zip.getEntries();

  // Prepara un lote de escrituras para Firestore
  const firestoreBatch = admin.firestore().batch();

  // Procesa cada archivo dentro del ZIP
  for (const entry of zipEntries) {
    // Omite los directorios, solo procesa archivos
    if (entry.isDirectory) continue;

    // Crea un archivo temporal para cada entrada del ZIP
    const entryPath = path.join(os.tmpdir(), entry.entryName);
    fs.writeFileSync(entryPath, entry.getData());

    // Define la ruta de destino en Storage
    const destinationPath = `${destinationFolder}/${zipFileName}/${entry.entryName}`;
    
    // Sube el archivo extraído al Storage
    await bucket.upload(entryPath, {
      destination: destinationPath,
      metadata: {
        metadata: {
          // Genera un token de descarga único para el archivo
          firebaseStorageDownloadTokens: uuidv4()
        }
      }
    });

    // Prepara el registro del archivo para Firestore
    const fileRecord = {
      fileName: entry.entryName,                                        // Nombre del archivo
      storagePath: destinationPath,                                     // Ruta en Storage
      createdAt: admin.firestore.FieldValue.serverTimestamp()          // Marca de tiempo del servidor
    };

    // Crea una nueva referencia de documento en Firestore y añade la operación al lote
    const docRef = admin.firestore().collection("archivosDescomprimidos").doc();
    firestoreBatch.set(docRef, fileRecord);
  }

  // Ejecuta todas las operaciones de Firestore en lote
  await firestoreBatch.commit();
  console.log("Archivos descomprimidos subidos y registrados en Firestore.");

  // Elimina el archivo ZIP temporal
  fs.unlinkSync(tempFilePath);
  return null;
});
