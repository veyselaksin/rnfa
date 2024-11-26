import React, { useState } from 'react'
import { SafeAreaView, ScrollView, Text, StyleSheet, View, Image, Alert } from 'react-native'
import { router } from 'expo-router'
import FormField from '@/components/FormField'
import CButton from '@/components/CButton'
import colors from '@/constants/color'
import images from '@/constants/images'
import { fontSize, gap, margin, padding } from '@/constants/style'
import { loginWithEmailAndPassword } from '@/libs/firebase/auth'
import { storage } from '@/store/mmkv'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const validateEmail = (text: string) => {
        const lowercaseEmail = text.toLowerCase()
        setEmail(lowercaseEmail)
        if (!lowercaseEmail.includes('@')) {
            setEmailError('Please enter a valid email address')
        } else {
            setEmailError('')
        }
    }

    const validatePassword = (text: string) => {
        setPassword(text)
        if (text.length < 8) {
            setPasswordError('Password must be at least 8 characters long')
        } else {
            setPasswordError('')
        }
    }

    const isFormValid = email.includes('@') && password.length >= 8

    const handleSignIn = async () => {
        try {
            if (isFormValid) {
                const response = await loginWithEmailAndPassword(email, password)
                if (response.user) {
                    storage.set('user', JSON.stringify(response.user))
                    router.push('/home')
                }
            }
        } catch (error) {
            Alert.alert('Error', 'Invalid email or password')
            console.log(error)
        }
    }

    const handleForgotPassword = () => {
        console.log('Forgot password')
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Image source={images.logo} style={styles.logo} resizeMode='contain' />
                        <Text style={styles.title}>Sign In to Aora</Text>
                    </View>
                    <View style={styles.form}>
                        <FormField label='Email' placeholder='Enter your email' value={email} onChangeText={validateEmail} keyboardType='email-address' error={emailError} />
                        <FormField label='Password' placeholder='Enter your password' value={password} onChangeText={validatePassword} secureTextEntry error={passwordError} />
                        <CButton onPress={handleSignIn} disabled={!isFormValid}>
                            Sign In
                        </CButton>
                        <Text style={styles.forgotPassword} onPress={handleForgotPassword}>
                            Forgot Password?
                        </Text>
                        <Text style={styles.signUp}>
                            Don't have an account?{' '}
                            <Text style={styles.signUpLink} onPress={() => router.push('/sign-up')}>
                                Sign Up
                            </Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.dark.primary,
        flex: 1
    },
    scrollViewContent: {
        flexGrow: 1
    },
    container: {
        flex: 1,
        paddingHorizontal: padding.md,
        paddingTop: margin.xl
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: margin.lg
    },
    logo: {
        width: 160,
        height: 50,
        marginBottom: margin.md
    },
    title: {
        fontSize: fontSize.lg,
        fontWeight: '700',
        color: colors.dark.white
    },
    form: {
        width: '100%',
        gap: gap.lg
    },
    forgotPassword: {
        color: colors.dark.text.secondary,
        fontSize: fontSize.sm,
        textAlign: 'right'
    },
    signUp: {
        color: colors.dark.text.secondary,
        fontSize: fontSize.md,
        textAlign: 'center'
    },
    signUpLink: {
        color: colors.dark.secondary,
        fontWeight: '700'
    }
})

export default SignIn
