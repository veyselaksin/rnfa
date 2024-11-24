import { Tabs } from 'expo-router'
import { IconHome, IconBookmark, IconPlus, IconUser } from '@tabler/icons-react-native'
import colors from '../../constants/color'

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.dark.secondary,
                tabBarInactiveTintColor: colors.dark.tertiary,
                tabBarStyle: { backgroundColor: colors.dark.primary }
            }}>
            <Tabs.Screen name='home' options={{ headerShown: false, title: 'Home', tabBarIcon: ({ color, size }) => <IconHome color={color} size={size} /> }} />
            <Tabs.Screen name='bookmark' options={{ headerShown: false, title: 'Bookmark', tabBarIcon: ({ color, size }) => <IconBookmark color={color} size={size} /> }} />
            <Tabs.Screen name='create' options={{ headerShown: false, title: 'Create', tabBarIcon: ({ color, size }) => <IconPlus color={color} size={size} /> }} />
            <Tabs.Screen name='profile' options={{ headerShown: false, title: 'Profile', tabBarIcon: ({ color, size }) => <IconUser color={color} size={size} /> }} />
        </Tabs>
    )
}

export default TabsLayout
