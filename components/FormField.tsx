import { KeyboardTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '@/constants/color'
import { fontSize, gap, padding, radius } from '@/constants/style'
import { IconEye, IconEyeOff } from '@tabler/icons-react-native'

type FormFieldProps = {
    label?: string
    placeholder?: string
    value: string
    onChangeText: (text: string) => void
    secureTextEntry?: boolean
    keyboardType?: KeyboardTypeOptions
    error?: string
}

const FormField: React.FC<FormFieldProps> = ({ label, secureTextEntry, error, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)
    
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputContainer, error && styles.inputContainerError]}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={colors.dark.text.secondary}
                    secureTextEntry={secureTextEntry && !showPassword}
                    {...props}
                />
                {secureTextEntry && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                            <IconEyeOff style={styles.togglePasswordIcon} />
                        ) : (
                            <IconEye style={styles.togglePasswordIcon} />
                        )}
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}

export default FormField

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: gap.sm
    },
    label: {
        color: colors.dark.text.secondary,
        fontSize: fontSize.md
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.dark.input.backgroundColor,
        borderRadius: radius.md,
        borderWidth: 2,
        borderColor: colors.dark.input.borderColor,
    },
    inputContainerError: {
        borderColor: colors.dark.error,
    },
    input: {
        flex: 1,
        color: colors.dark.white,
        fontSize: fontSize.md,
        paddingVertical: padding.sm,
        paddingHorizontal: padding.sm,
    },
    togglePasswordIcon: {
        color: colors.dark.text.secondary,
        paddingRight: padding.xl,
    },
    errorText: {
        color: colors.dark.error,
        fontSize: fontSize.sm,
    }
})
