import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ChatScreen } from '../screens/ChatScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MemoriesScreen } from '../screens/MemoriesScreen';
import { PersonalizeScreen } from '../screens/PersonalizeScreen';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#000000',
                    borderTopWidth: 0,
                    height: 90,
                    paddingBottom: 30,
                    paddingTop: 10,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                tabBarActiveTintColor: '#8b5cf6',
                tabBarInactiveTintColor: '#666666',
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                    marginTop: 4,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? "home" : "home-outline"} size={22} color={color} />
                    ),
                    tabBarLabel: 'Home',
                }}
            />
            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={focused ? styles.activeTabContainer : null}>
                            <Ionicons name={focused ? "chatbubble" : "chatbubble-outline"} size={22} color={color} />
                        </View>
                    ),
                    tabBarLabel: 'Chat',
                }}
            />
            <Tab.Screen
                name="Personalize"
                component={PersonalizeScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? "options" : "options-outline"} size={22} color={color} />
                    ),
                    tabBarLabel: 'Personalize',
                }}
            />
            <Tab.Screen
                name="Memories"
                component={MemoriesScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? "bookmark" : "bookmark-outline"} size={22} color={color} />
                    ),
                    tabBarLabel: 'Memories',
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    activeTabContainer: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(139, 92, 246, 0.3)',
        backgroundColor: 'rgba(139, 92, 246, 0.05)',
    },
});
