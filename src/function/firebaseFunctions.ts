import { collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'

import { auth } from './firebase';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { User } from './util';

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