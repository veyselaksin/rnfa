import { FIREBASE_DB } from '@/libs/firebase/firebase'
import { collection, getDocs, doc, getDoc, addDoc, query, where } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export const getVideos = async (): Promise<VideoWithCreator[]> => {
    const videosRef = collection(FIREBASE_DB, 'videos')
    const videos = await getDocs(videosRef)

    const videosWithCreator = await Promise.all(
        videos.docs.map(async videoDoc => {
            const videoData = videoDoc.data() as VideoModel
            const creatorRef = doc(FIREBASE_DB, `users/${videoData.creator}`)
            const creatorDoc = await getDoc(creatorRef)
            const creatorData = creatorDoc.data() as User

            return {
                ...videoData,
                id: videoDoc.id,
                creatorInfo: creatorData
            }
        })
    )

    return videosWithCreator
}

export const getVideosByCreator = async (creatorId: string): Promise<VideoWithCreator[]> => {
    const videosRef = collection(FIREBASE_DB, 'videos')
    const q = query(videosRef, where('creator', '==', creatorId))
    const videos = await getDocs(q)

    const videosWithCreator = await Promise.all(
        videos.docs.map(async videoDoc => {
            const videoData = videoDoc.data() as VideoModel
            const creatorRef = doc(FIREBASE_DB, `users/${videoData.creator}`)
            const creatorDoc = await getDoc(creatorRef)
            const creatorData = creatorDoc.data() as User

            return {
                ...videoData,
                id: videoDoc.id,
                creatorInfo: creatorData
            }
        })
    )

    return videosWithCreator
}

export const uploadVideo = async (video: Partial<VideoModel>) => {
    const auth = getAuth()
    const user = auth.currentUser

    if (!user) {
        throw new Error('User not authenticated')
    }

    const videosRef = collection(FIREBASE_DB, 'videos')
    await addDoc(videosRef, {
        ...video,
        creator: user.uid,
        createdAt: new Date().toISOString()
    })
}
