import React, { useState } from 'react'
import { SafeAreaView, ScrollView, Text, StyleSheet, View, Image } from 'react-native'
import { router } from 'expo-router'
import FormField from '@/components/FormField'
import CButton from '@/components/CButton'
import colors from '@/constants/color'
import images from '@/constants/images'
import { fontSize, gap, margin, padding } from '@/constants/style'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { FIREBASE_AUTH, FIREBASE_DB } from '@/libs/firebase/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { registerWithEmailAndPassword } from '@/libs/firebase/auth'
import { storage } from '@/store/mmkv'

const SignUp = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullNameError, setFullNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const validateFullName = (text: string) => {
        setFullName(text)
        if (text.length < 3) {
            setFullNameError('Full name must be at least 3 characters long')
        } else {
            setFullNameError('')
        }
    }

    const validateEmail = (text: string) => {
        setEmail(text.toLowerCase())
        if (!text.includes('@')) {
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

    const isFormValid = fullName.length >= 3 && email.includes('@') && password.length >= 8

    const handleSignUp = async () => {
        if (isFormValid) {
            const response = await registerWithEmailAndPassword(email, password, fullName)
            // then redirect to home
            if (response) {
                storage.set('user', JSON.stringify(response))
                router.push('/home')
            }
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Image source={images.logo} style={styles.logo} resizeMode='contain' />
                        <Text style={styles.title}>Sign Up for Aora</Text>
                    </View>
                    <View style={styles.form}>
                        <FormField label='Full Name' placeholder='Enter your full name' value={fullName} onChangeText={validateFullName} error={fullNameError} />
                        <FormField label='Email' placeholder='Enter your email' value={email} onChangeText={validateEmail} keyboardType='email-address' error={emailError} />
                        <FormField label='Password' placeholder='Enter your password' value={password} onChangeText={validatePassword} secureTextEntry error={passwordError} />
                        <CButton onPress={handleSignUp} disabled={!isFormValid}>
                            Sign Up
                        </CButton>
                        <Text style={styles.signIn}>
                            Already have an account?{' '}
                            <Text style={styles.signInLink} onPress={() => router.push('/sign-in')}>
                                Sign In
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
    signIn: {
        color: colors.dark.text.secondary,
        fontSize: fontSize.md,
        textAlign: 'center'
    },
    signInLink: {
        color: colors.dark.secondary,
        fontWeight: '700'
    }
})

export default SignUp
