import { View, Text, SafeAreaView, StyleSheet, FlatList, RefreshControl, Image } from 'react-native'
import { storage } from '@/store/mmkv'
import colors from '@/constants/color'
import { fontSize, gap, margin, padding, radius } from '@/constants/style'
import { IconQrcode } from '@tabler/icons-react-native'
import Search from '@/components/Search'
import NotFound from '@/components/NotFound'
import { useState, useCallback, useEffect } from 'react'
import LatestVideos from '@/components/LatestVideos'
import { getVideos } from '@/api/videos'
import VideoCard from '@/components/VideoCard'

const Home = () => {
    const user = storage.getString('user')
    const parsedUser = user ? JSON.parse(user) : null

    const [searchText, setSearchText] = useState('')
    const [videos, setVideos] = useState<VideoWithCreator[]>([])

    const handleSearch = useCallback((text: string) => {
        setSearchText(text)
    }, [])

    const [refreshing, setRefreshing] = useState(false)
    const handleRefresh = useCallback(() => {
        setRefreshing(true)
        getVideos()
            .then(newVideos => {
                setVideos(newVideos)
                setRefreshing(false)
                setSearchText('')
            })
            .catch(() => {
                setRefreshing(false)
            })
    }, [])

    useEffect(() => {
        getVideos().then(setVideos)
    }, [])

    const renderHeader = () => (
        <>
            <View style={styles.welcomeContainer}>
                <View>
                    <Text style={styles.welcome}>Welcome Back</Text>
                    <Text style={styles.name}>{parsedUser?.displayName}</Text>
                </View>
                <View style={styles.qrCodeContainer}>
                    <IconQrcode size={46} color={colors.dark.text.secondary} />
                </View>
            </View>
            <View style={styles.searchContainer}>
                <Search placeholder='Search for a video topic' onSearch={handleSearch} />
            </View>
            {searchText === '' && <LatestVideos data={videos.slice(0, 5)} />}
        </>
    )

    const filteredVideos = searchText ? videos.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase())) : videos

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={filteredVideos}
                renderItem={({ item }) => <VideoCard video={item} />}
                keyExtractor={item => item.id}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={<NotFound />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[colors.dark.text.primary]} tintColor={colors.dark.text.primary} />}
                contentContainerStyle={styles.container}
            />
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.dark.primary,
        flex: 1
    },
    container: {
        paddingHorizontal: padding.sm,
        paddingVertical: padding.md
    },
    welcomeContainer: {
        marginBottom: margin.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    welcome: {
        fontSize: fontSize.lg,
        color: colors.dark.text.secondary
    },
    name: {
        fontSize: fontSize.xl,
        color: colors.dark.text.primary,
        fontWeight: 'bold'
    },
    qrCodeContainer: {
        padding: padding.sm,
        borderRadius: radius.full,
        borderWidth: 1,
        borderColor: colors.dark.input.borderColor
    },
    searchContainer: {
        marginBottom: margin.md
    },
    videoContainer: {
        width: '100%',
        height: 200,
        backgroundColor: colors.dark.secondary,
        borderRadius: radius.md,
        marginBottom: margin.md,
        overflow: 'hidden'
    },
    thumbnail: {
        width: '100%',
        height: 150,
        resizeMode: 'cover'
    },
    videoTitle: {
        fontSize: fontSize.md,
        color: colors.dark.text.primary,
        fontWeight: '500',
        padding: padding.sm
    },
    latestVideos: {
        marginBottom: margin.md
    }
})
