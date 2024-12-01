import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { IconDotsVertical, IconPlayerPlayFilled, IconPlayerPauseFilled } from '@tabler/icons-react-native'
import colors from '@/constants/color'
import { gap, padding, radius } from '@/constants/style'

interface VideoCardProps {
    video: VideoWithCreator
}

const VideoCard = ({ video }: VideoCardProps) => {
    const [playVideo, setPlayVideo] = useState(false)
    const togglePlayPause = () => {
        setPlayVideo(!playVideo)
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                {video.creatorInfo.photoURL ? (
                    <Image source={{ uri: video.creatorInfo.photoURL }} style={styles.avatar} />
                ) : (
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{video.creatorInfo.displayName[0].toUpperCase()}</Text>
                    </View>
                )}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{video.title}</Text>
                    <Text style={styles.creator}>{video.creatorInfo.displayName}</Text>
                </View>
                <IconDotsVertical size={24} color={colors.dark.text.secondary} />
            </View>
            <View style={styles.videoContainer}>
                <Image source={{ uri: video.thumbnailUrl }} style={styles.thumbnail} />
                <Pressable style={styles.playPauseButton} onPress={togglePlayPause}>
                    {playVideo ? <IconPlayerPauseFilled size={24} color={colors.dark.text.primary} /> : <IconPlayerPlayFilled size={24} color={colors.dark.text.primary} />}
                </Pressable>
            </View>
        </View>
    )
}

export default VideoCard

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: padding.sm,
        gap: gap.md
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: radius.md
    },
    avatarContainer: {
        backgroundColor: colors.dark.secondary,
        width: 46,
        height: 46,
        borderRadius: radius.md,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarText: {
        fontSize: 20,
        fontWeight: 'medium',
        color: colors.dark.text.primary
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'medium',
        color: colors.dark.text.primary
    },
    creator: {
        fontSize: 14,
        color: colors.dark.text.secondary
    },
    videoContainer: {
        width: '100%',
        height: 200,
        borderRadius: radius.md,
        overflow: 'hidden',
        marginBottom: gap.xl,
        position: 'relative'
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    playPauseButton: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: radius.xl,
        padding: 10,
        top: '50%',
        left: '50%',
        transform: [{ translateX: -22 }, { translateY: -22 }]
    }
})
