import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import colors from '@/constants/color'
import { fontSize, margin, padding } from '@/constants/style'
import CButton from './CButton'

const NotFound = () => {
    return (
        <View style={styles.container}>
            <Image source={require('@/assets/images/empty.png')} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>No videos found</Text>
                <Text style={styles.subText}>Try searching for something else</Text>
            </View>
            <View style={styles.buttonContainer}>
                <CButton onPress={() => {}} style={styles.button}>
                    Create a video
                </CButton>
            </View>
        </View>
    )
}

export default NotFound

const styles = StyleSheet.create({
    container: {
        padding: padding.sm,
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: 200
    },
    textContainer: {
        marginTop: margin.sm,
        alignItems: 'center',
        gap: margin.sm
    },
    text: {
        color: colors.dark.text.primary,
        fontSize: fontSize.lg,
        fontWeight: '500'
    },
    subText: {
        color: colors.dark.text.secondary,
        fontSize: fontSize.md,
        fontWeight: '500'
    },
    buttonContainer: {
        marginTop: margin.md,
        width: '100%'
    },
    button: {
        width: '100%'
    }
})
