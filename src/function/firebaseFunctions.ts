import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore'

import { auth } from './firebase';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { todoInterface, User } from './util';

const firestore = getFirestore();


async function addDocument(data: User) {
    try {

        const res = await createUserWithEmailAndPassword(auth, data.Email, data.Password)
        data.uid = res.user.uid
        const userDocRef = doc(firestore, 'User', data.uid);
        await setDoc(userDocRef, data);
        updateProfile(res.user, { displayName: data.firstName })
        return { status: true, data: data }

    } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
            console.log('Email already exists');
            return { status: false, message: "Email already exists" }
        } else {
            console.error('Error creating user:', error);
            return { status: false, message: error.message ?? "Internal error occured" }
        }
    }
}

export async function addOnlineNote(doc: todoInterface) {
    try {
        const colRef = collection(firestore, "online_notes");
        const docRef = await addDoc(colRef, doc); 
        return { status: true, message: docRef.id }

    } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
            console.log('Document already exists');
            return { status: false, message: "Document already exists" }
        } else {
            console.error('Error creating user:', error);
            return { status: false, message: error.message ?? "Internal error occured" }
        }
    }
}

export async function updateDocument(documentId:string, updatedData:todoInterface) {
    try {
        
      const docRef = doc(firestore, "online_notes", documentId);
      await updateDoc(docRef, { Title:updatedData.Title, Content:updatedData.Content });
      console.log("Document updated with ID: ", documentId);
      
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }


  export const deleteDocument = async (documentId: string) => {
    try {
      const docRef = doc(firestore, 'online_notes', documentId);
      await deleteDoc(docRef);
      console.log('Document deleted with ID: ', documentId);
    } catch (e) {
      console.error('Error deleting document: ', e);
      throw e;
    }
  };

export async function getDocumentsByUserId(userId: string) {
    try {
        const colRef = collection(firestore, "online_notes");
        const q = query(colRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const documents: todoInterface[] = [];
        querySnapshot.forEach((doc) => {
            documents.push({
                id: doc.id,
                Title: '',
                Content: '',
                userEmail: '',
                Created: '',
                ...doc.data(),
            });
        });
        return documents;
    } catch (e) {
        console.error("Error getting documents: ", e);
        return []
    }
}

async function loginUser(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const firestore = getFirestore();
        const userDocRef = doc(collection(firestore, 'User'), userCredential.user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();
        return userData
    } catch (err) {
        return false
    }

}

async function onAuthChangeFunction(setUserData: any) {
    onAuthStateChanged(auth, async (user: any) => setUserData(user))
}

async function Logout() { auth.signOut(); }

const isLoggedIn = async () => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user: any) => {
            unsubscribe();
            resolve(user ? true : false)
        });
    });
};


async function getUser(userId: string) {
    const documentRef = doc(firestore, "User", userId);
    const documentSnapshot = await getDoc(documentRef);
    return documentSnapshot.data();
}


export {
    addDocument, loginUser, onAuthChangeFunction, Logout, isLoggedIn, getUser
}