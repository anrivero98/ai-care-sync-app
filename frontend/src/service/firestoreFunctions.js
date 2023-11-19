import { firestore } from '../config'


import { collection, addDoc } from "firebase/firestore"; 


export class FirestoreFunctions {

    static async createGraph(desc="Graph Description") {

        try {
            const docRef = await addDoc(collection(firestore, "graphs"), {
                description: desc
            });
            return docRef.id
        }
        catch(err) {
            console.log(err)
            return err
        }
    
    }


    // static async addTranscript(sessionId, speakerId, utterance, timestamp) {

    // }
}
