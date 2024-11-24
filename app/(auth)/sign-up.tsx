import React, { useState } from 'react'
import { SafeAreaView, ScrollView, Text, StyleSheet, View, Image } from 'react-native'
import { router } from 'expo-router'
import FormField from '@/components/FormField'
import CButton from '@/components/CButton'
import colors from '@/constants/color'
import images from '@/constants/images'
import { fontSize, gap, margin, padding } from '@/constants/style'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const validateUsername = (text: string) => {
        setUsername(text)
        if (text.length < 3) {
            setUsernameError('Username must be at least 3 characters long')
        } else {
            setUsernameError('')
        }
    }

    const validateEmail = (text: string) => {
        setEmail(text)
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

    const isFormValid = username.length >= 3 && email.includes('@') && password.length >= 8

    const handleSignUp = () => {
        if (isFormValid) {
            // Implement sign up logic here
            console.log('Sign up with:', username, email, password)
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
                        <FormField
                            label='Username'
                            placeholder='Enter your username'
                            value={username}
                            onChangeText={validateUsername}
                            error={usernameError}
                        />
                        <FormField
                            label='Email'
                            placeholder='Enter your email'
                            value={email}
                            onChangeText={validateEmail}
                            keyboardType='email-address'
                            error={emailError}
                        />
                        <FormField
                            label='Password'
                            placeholder='Enter your password'
                            value={password}
                            onChangeText={validatePassword}
                            secureTextEntry
                            error={passwordError}
                        />
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
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: padding.md,
        paddingTop: margin.xl,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: margin.lg,
    },
    logo: {
        width: 160,
        height: 50,
        marginBottom: margin.md,
    },
    title: {
        fontSize: fontSize.lg,
        fontWeight: '700',
        color: colors.dark.white,
    },
    form: {
        width: '100%',
        gap: gap.lg,
    },
    signIn: {
        color: colors.dark.text.secondary,
        fontSize: fontSize.md,
        textAlign: 'center',
    },
    signInLink: {
        color: colors.dark.secondary,
        fontWeight: '700',
    },
})

export default SignUp
