import React, { useState, useRef, useEffect } from 'react'
import { FlatList, StyleSheet, View, Image, Pressable, Dimensions } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { gap } from '@/constants/style'
import { Ionicons } from '@expo/vector-icons'

type LatestVideosItemProps = {
    video: VideoWithCreator
    activeItem: string | null
    onPress: (id: string) => void
}

const LatestVideosItem: React.FC<LatestVideosItemProps> = ({ video, activeItem, onPress }) => {
    const isActive = activeItem === video.id
    const animationRef = useRef<Animatable.View & View>(null)

    useEffect(() => {
        if (isActive) {
            animationRef.current?.animate(
                {
                    0: { scaleX: 1, scaleY: 1 },
                    1: { scaleX: 1.2, scaleY: 1.2 }
                },
                300
            )
        } else {
            animationRef.current?.animate(
                {
                    0: { scaleX: 1.2, scaleY: 1.2 },
                    1: { scaleX: 1, scaleY: 1 }
                },
                300
            )
        }
    }, [isActive])

    const handlePress = () => {
        onPress(video.id)
    }

    return (
        <View style={styles.itemWrapper}>
            <Animatable.View ref={animationRef} style={[styles.thumbnailContainer, isActive && styles.activeContainer]}>
                <Image source={{ uri: video.thumbnailUrl }} style={styles.thumbnail} />
                <Pressable style={styles.playPauseButton} onPress={handlePress}>
                    <Ionicons name={isActive ? 'pause' : 'play'} size={24} color='white' />
                </Pressable>
            </Animatable.View>
        </View>
    )
}

type LatestVideosProps = {
    data: VideoWithCreator[]
}

const LatestVideos: React.FC<LatestVideosProps> = ({ data }) => {
    const [activeItem, setActiveItem] = useState<string | null>(null)

    const handlePress = (id: string) => {
        setActiveItem(prevActiveItem => (prevActiveItem === id ? null : id))
    }

    return (
        <FlatList
            horizontal
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <LatestVideosItem video={item} activeItem={activeItem} onPress={handlePress} />}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.listContainer}
        />
    )
}

export default LatestVideos

const { width } = Dimensions.get('window')
const itemWidth = width * 0.4 // 40% of screen width

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: gap.md
    },
    itemWrapper: {
        width: itemWidth,
        height: itemWidth * 1.5,
        overflow: 'hidden'
    },
    thumbnailContainer: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    activeContainer: {
        zIndex: 1
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        borderRadius: 8
    },
    separator: {
        width: gap.md
    },
    playPauseButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -20 }, { translateY: -20 }],
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 25,
        padding: 8,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
