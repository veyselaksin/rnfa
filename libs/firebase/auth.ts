import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getAuth, updateProfile } from 'firebase/auth'
import { FIREBASE_AUTH, FIREBASE_APP, FIREBASE_DB } from './firebase'
import { doc, setDoc } from 'firebase/firestore'
import { storage } from '@/store/mmkv'

export const loginWithEmailAndPassword = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
}

export const registerWithEmailAndPassword = async (email: string, password: string, fullName: string) => {
    const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
    if (response.user) {
        console.log(response.user)
    }

    // then update user info
    await updateProfile(response.user, {
        displayName: fullName
    })

    // store the user info to firestore
    await setDoc(doc(FIREBASE_DB, 'users', response.user.uid), {
        fullName,
        email
    })

    return response.user
}

export const logout = async () => {
    return await signOut(FIREBASE_AUTH)
}
