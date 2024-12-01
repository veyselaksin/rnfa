import { SafeAreaView, Text, StyleSheet, ScrollView, View, Pressable, Image, Alert } from 'react-native'
import colors from '@/constants/color'
import { fontSize, gap, margin, padding, radius } from '@/constants/style'
import FormField from '@/components/FormField'
import { useState } from 'react'
import { Video, ResizeMode } from 'expo-av'
import { IconUpload } from '@tabler/icons-react-native'
import CButton from '@/components/CButton'
import * as DocumentPicker from 'expo-document-picker'
import { uploadVideo } from '@/api/videos'
import { storage } from '@/store/mmkv'

const Create = () => {
    const user = storage.getString('user')
    const parsedUser = user ? JSON.parse(user) : null

    const [form, setForm] = useState({
        title: '',
        video: '',
        thumbnail: '',
        prompt: '',
        creator: parsedUser?.uid
    })

    const openPicker = async (selectType: 'video' | 'thumbnail') => {
        const result = await DocumentPicker.getDocumentAsync({
            type: selectType === 'video' ? 'video/*' : 'image/*'
        })

        if (result.assets && result.assets.length > 0) {
            const asset = result.assets[0]
            setForm({ ...form, [selectType]: asset.uri })
        }
    }

    const submit = async () => {
        try {
            if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
                Alert.alert('Please fill in all fields')
                return
            }

            await uploadVideo(form as Partial<VideoModel>)
        } catch (error) {
            Alert.alert('Error uploading video')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Upload Video</Text>
                    <View style={styles.form}>
                        <Text style={styles.formTitle}>Video Title</Text>
                        <FormField placeholder='Enter your video title' value={form.title} onChangeText={text => setForm({ ...form, title: text })} />
                        <View style={styles.videoContainer}></View>
                        <Text style={styles.formTitle}>Video</Text>
                        {(form.video && <Video source={{ uri: form.video }} style={styles.video} resizeMode={ResizeMode.COVER} isLooping />) || (
                            <Pressable style={styles.videoPlaceholder} onPress={() => openPicker('video')}>
                                <IconUpload size={46} color={colors.dark.text.secondary} />
                            </Pressable>
                        )}
                    </View>
                    <View style={styles.thumbnailContainer}>
                        <Text style={styles.formTitle}>Thumbnail</Text>
                        {(form.thumbnail && <Image source={{ uri: form.thumbnail }} style={styles.thumbnail} />) || (
                            <Pressable style={styles.thumbnailPlaceholder} onPress={() => openPicker('thumbnail')}>
                                <IconUpload size={36} color={colors.dark.text.secondary} />
                                <Text style={styles.thumbnailPlaceholderText}>Choose a photo</Text>
                            </Pressable>
                        )}
                    </View>
                    <View style={styles.promptContainer}>
                        <Text style={styles.formTitle}>Prompt</Text>
                        <FormField placeholder='Enter your prompt' value={form.prompt} onChangeText={text => setForm({ ...form, prompt: text })} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <CButton style={styles.button} onPress={submit}>
                            Upload
                        </CButton>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Create

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark.primary
    },
    header: {
        paddingHorizontal: padding.sm,
        paddingVertical: padding.md
    },
    title: {
        fontSize: fontSize.xl,
        color: colors.dark.text.primary,
        fontWeight: 'bold'
    },
    form: {
        gap: gap.md,
        marginTop: margin.md
    },
    formTitle: {
        fontSize: fontSize.lg,
        color: colors.dark.text.secondary,
        fontWeight: '600'
    },
    videoContainer: {
        gap: gap.md,
        marginTop: margin.sm
    },
    video: {
        width: '100%',
        height: 160
    },
    videoPlaceholder: {
        width: '100%',
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.dark.input.borderColor
    },
    thumbnailContainer: {
        gap: gap.md,
        marginTop: margin.md
    },
    thumbnail: {
        width: '100%',
        height: 86
    },
    thumbnailPlaceholder: {
        width: '100%',
        height: 86,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.dark.input.borderColor,
        gap: gap.md
    },
    thumbnailPlaceholderText: {
        fontSize: fontSize.md,
        color: colors.dark.text.secondary,
        fontWeight: 'medium'
    },
    promptContainer: {
        gap: gap.md,
        marginTop: margin.md
    },
    button: {
        marginTop: margin.lg
    },
    buttonContainer: {
        marginTop: margin.lg
    }
})
