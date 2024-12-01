import { getVideosByCreator } from '@/api/videos'
import VideoCard from '@/components/VideoCard'
import colors from '@/constants/color'
import { logout } from '@/libs/firebase/auth'
import { storage } from '@/store/mmkv'
import { router } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, FlatList, RefreshControl } from 'react-native'
import { IconLogout } from '@tabler/icons-react-native'
import { fontSize, margin, padding, radius } from '@/constants/style'
import NotFound from '@/components/NotFound'

interface RenderHeaderProps {
    handleLogout: () => void
    userData: User
    postCount: number
    viewCount: string
}

const RenderHeader = ({ handleLogout, userData, postCount, viewCount }: RenderHeaderProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoutContainer}>
                <IconLogout size={32} color={colors.dark.red} onPress={handleLogout} />
            </View>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>{userData.displayName ? userData.displayName[0].toUpperCase() : '?'}</Text>
                </View>
                <Text style={styles.displayName}>{userData.displayName}</Text>
                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <Text style={styles.statCount}>{postCount}</Text>
                        <Text style={styles.statLabel}>Posts</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statCount}>{viewCount}</Text>
                        <Text style={styles.statLabel}>Views</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const Profile = () => {
    const handleLogout = async () => {
        await logout()
        storage.delete('user')
        router.push('/')
    }
    const [videos, setVideos] = useState<VideoWithCreator[]>([])
    useEffect(() => {
        getVideosByCreator(userData.id).then(setVideos)
    }, [])

    const user = storage.getString('user')
    if (!user) return null
    const userData = JSON.parse(user)

    const postCount = videos.length
    const viewCount = '1.2k'

    const [refreshing, setRefreshing] = useState(false)
    const handleRefresh = useCallback(() => {
        setRefreshing(true)
        getVideosByCreator(userData.id)
            .then(newVideos => {
                setVideos(newVideos)
                setRefreshing(false)
            })
            .catch(() => {
                setRefreshing(false)
            })
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={videos}
                renderItem={({ item }) => <VideoCard video={item} />}
                keyExtractor={item => item.id}
                ListHeaderComponent={<RenderHeader handleLogout={handleLogout} userData={userData} postCount={postCount} viewCount={viewCount} />}
                ListEmptyComponent={<NotFound />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[colors.dark.text.primary]} tintColor={colors.dark.text.primary} />}
                contentContainerStyle={styles.container}
            />
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.dark.primary,
        flex: 1
    },
    container: {
        paddingVertical: padding.sm,
        paddingHorizontal: padding.sm
    },
    logoutContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: margin.sm
    },
    avatarContainer: {
        width: 96,
        height: 96,
        borderRadius: radius.lg,
        backgroundColor: colors.dark.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarText: {
        fontSize: fontSize.xl,
        color: colors.dark.white
    },
    displayName: {
        fontSize: fontSize.lg,
        color: colors.dark.text.secondary,
        fontWeight: 'bold'
    },
    stats: {
        flexDirection: 'row',
        gap: margin.sm
    },
    stat: {
        alignItems: 'center'
    },
    statCount: {
        fontSize: fontSize.lg,
        color: colors.dark.text.secondary,
        fontWeight: 'bold'
    },
    statLabel: {
        fontSize: fontSize.md,
        color: colors.dark.text.secondary
    }
})
