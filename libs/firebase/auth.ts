import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { FIREBASE_AUTH, FIREBASE_DB } from './firebase'
import { doc, setDoc } from 'firebase/firestore'

export const loginWithEmailAndPassword = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
}

export const registerWithEmailAndPassword = async (email: string, password: string, fullName: string) => {
    try {
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
            uid: response.user.uid,
            displayName: response.user.displayName,
            email: response.user.email,
            emailVerified: response.user.emailVerified,
            photoURL: response.user.photoURL,
            isAnonymous: response.user.isAnonymous,
            phoneNumber: response.user.phoneNumber
        })

        return response.user
    } catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
    return await signOut(FIREBASE_AUTH)
}
