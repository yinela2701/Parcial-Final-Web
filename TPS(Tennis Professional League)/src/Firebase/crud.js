import {
  addDoc,
  doc,
  collection,
  getDocs,
  where,
  documentId,
  query,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./credenciales";

async function createTourney(name, registrationDeadline, limitNumberParticipants) { //Falta implementar y pensar lo de la imagen :c
    try {
      const docRef = await addDoc(collection(db, "tourney"), {
        name: name,
        registrationDeadline: registrationDeadline,
        limitNumberParticipants: limitNumberParticipants,
      });
  
      console.log("The tourney was created: ", docRef.id);
    } catch (e) {
      console.error("Error adding the tourney: ", e);
    }
  }

async function readTourney() {
    try {
      const querySnapshot = await getDocs(collection(db, "tourney"));
      const response = querySnapshot.docs.map((doc) => doc.data());
      return response;
    } catch (e) {
      console.error("Error reading the tourneys: ", e);
      return [];
    }
  }

//Está generando problema por el getDocument
  async function readTourneyById(id) {
    const querySnapshot = await getDocument("tourney", id);
    console.log("querySnapshot", querySnapshot);
    return null;
  }

async function updateTourney(id, name, registrationDeadline, limitNumberParticipants ) {
  try {
    
    const userRef = doc(db, "tourney", id);

    await updateDoc(userRef, { 
        name: name,
        registrationDeadline: registrationDeadline,
        limitNumberParticipants: limitNumberParticipants });

    console.log("Document successfully updated");

  } catch (e) {
    console.error("Error updating document: ", e);
  }

}

async function deleteTourney(id) {
  try {
    const userRef = doc(db, "tourney", id);
    await deleteDoc(userRef);
    console.log("Tourney deleted");

  } catch (e) {
    console.error("Error deleting tourney ", e);
  }
}

/// USUARIO

async function addUserToTourney(tourneyId, userId){
  try{
    const tourneyRef = doc(db, "tourney", tourneyId);
    const tourneySnap = await getDoc(tourneyRef);
    const tourneyData = tourneySnap.data();
    const participants = tourneyData.participants || [];
    participants.push(userId);
    await updateDoc(tourneyRef, { participants });
    console.log("User added to the tourney");  
  }catch (e) {
    console.error("Error adding user to tourney: ", e)
  }
}


export {createTourney,readTourney,readTourneyById,updateTourney,deleteTourney,addUserToTourney};
