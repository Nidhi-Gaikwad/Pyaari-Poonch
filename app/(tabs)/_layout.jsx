import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from './../../constants/Colors'
export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarInactiveTintColor: '#8E8E93',    // Correct color code
                tabBarStyle: { backgroundColor: '#FFFFFF' },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name='home'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />  // Valid icon name
                }}
            />
            <Tabs.Screen
                name='favourite'
                options={{
                    title: 'Favourite',
                    tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />  // Valid icon name
                }}
            />
            <Tabs.Screen
                name='inbox'
                options={{
                    title: 'Inbox',
                    tabBarIcon: ({ color }) => <Ionicons name="chatbox" size={24} color={color} />  // Valid icon name
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <Ionicons name="people-circle" size={24} color={color} />  // Valid icon name
                }}
            />


        </Tabs>
    )
}