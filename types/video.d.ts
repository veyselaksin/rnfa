interface VideoModel {
    id: string
    title: string
    thumbnailUrl: string
    url: string
    prompt: string
    creator: string
    createdAt: string
}

interface VideoWithCreator extends VideoModel {
    creatorInfo: User
}
