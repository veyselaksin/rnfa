import colors from '@/constants/color'
import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'

export default function AuthLayout() {
    return (
        <>
            <Stack>
                <Stack.Screen name='sign-in' options={{ headerShown: false }} />
                <Stack.Screen name='sign-up' options={{ headerShown: false }} />
            </Stack>
            <StatusBar backgroundColor={colors.dark.primary} />
        </>
    )
}
