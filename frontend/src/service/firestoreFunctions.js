import { firestore } from '../config'



import { collection, addDoc, doc } from "firebase/firestore"; 


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


    static async addTranscript(sessionId, speakerId, utterance, timestamp) {
        try{
           const sessionRef = doc(collection(firestore, "sessions"), sessionId)
           const transcriptCollRef = collection(sessionRef,"transcript");
            const transcriptRef = await addDoc(transcriptCollRef,{
                speakerId: speakerId,
                utterance: utterance,
                timestamp: timestamp
            });
            return transcriptRef.id
           

            

        }
        catch (error) {
            console.log("Error adding transcript: ", error);
            return error;

        }
    };
}
export default FirestoreFunctions;
