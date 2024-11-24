import { Animated, Pressable, PressableProps, StyleSheet, ViewStyle, Text } from 'react-native'
import React, { useRef } from 'react'
import colors from '@/constants/color'
import { fontSize, padding, radius } from '@/constants/style'

interface CButtonProps extends Omit<PressableProps, 'children'> {
    style?: ViewStyle
    children: string
}

const CButton = ({ children, ...props }: CButtonProps) => {
    const animated = useRef(new Animated.Value(1)).current

    const fadeIn = () => {
        Animated.timing(animated, {
            toValue: 0.8,
            duration: 100,
            useNativeDriver: true
        }).start()
    }
    const fadeOut = () => {
        Animated.timing(animated, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start()
    }

    return (
        <Animated.View
            style={{
                opacity: animated,
                ...(props.style?.width && { width: props.style.width })
            }}>
            <Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut} style={[defaultStyles.button, props.disabled && defaultStyles.buttonDisabled]} disabled={props.disabled}>
                <Text style={defaultStyles.buttonText}>{children}</Text>
            </Pressable>
        </Animated.View>
    )
}

export default CButton

const defaultStyles = StyleSheet.create({
    button: {
        borderRadius: radius.md,
        backgroundColor: colors.dark.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    buttonDisabled: {
        backgroundColor: colors.dark.input.backgroundColor,
    },
    buttonText: {
        color: colors.dark.black,
        fontSize: fontSize.md,
        fontWeight: '500',
        paddingVertical: padding.sm,
        paddingHorizontal: padding.lg
    }
})
