import CButton from '@/components/CButton'
import images from '@/constants/images'
import { ScrollView, View, Image, Text, StyleSheet, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/constants/color'
import { fontSize, margin, padding, radius } from '@/constants/style'
import React from 'react'
import { router } from 'expo-router'

const Index = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <Image source={images.logo} style={styles.logo} resizeMode='contain' />
                    <Image source={images.cards} style={styles.cards} resizeMode='contain' />
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>
                            Discover endless possibilities with <Text style={styles.highlightText}>Aora</Text>
                        </Text>
                        <Image source={images.path} style={styles.pathImage} resizeMode='contain' />
                    </View>
                    <Text style={styles.subText}>A credit card that rewards you for your everyday spending.</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <CButton
                        onPress={() => {
                            router.push('/sign-in')
                        }}>
                        Continue with Email
                    </CButton>
                </View>
            </ScrollView>
            <StatusBar backgroundColor={colors.dark.primary} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.dark.primary,
        flex: 1
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    container: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: padding.md
    },
    logo: {
        width: 160,
        marginBottom: margin.md
    },
    cards: {
        width: '100%',
        height: '40%',
        marginBottom: margin.md
    },
    textContainer: {
        position: 'relative',
        marginBottom: margin.md
    },
    mainText: {
        color: colors.dark.text.primary,
        fontSize: fontSize.lg,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: padding.xl
    },
    highlightText: {
        color: colors.dark.secondary
    },
    pathImage: {
        position: 'absolute',
        bottom: -20,
        right: 50,
        width: 48
    },
    subText: {
        color: colors.dark.text.secondary,
        fontSize: fontSize.md,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: margin.md
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: padding.md,
        paddingBottom: padding.md
    }
})

export default Index
