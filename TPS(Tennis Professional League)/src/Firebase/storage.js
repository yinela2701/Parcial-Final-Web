import { storage } from "./credenciales";
import { ref, getDownloadURL, getStorage, deleteObject, uploadBytes } from "firebase/storage";


//Subir imagen 
async function uploadImage(file, name) {

    const storageRef = ref(storage, `images/${name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
}

async function getImageUrlByName(name) {
    const imagesRef = ref(storage, `images/${name}`);
    let response = await getDownloadURL(imagesRef);
    return response;
}

export {uploadImage, getImageUrlByName};