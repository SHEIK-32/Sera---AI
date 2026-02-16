import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AppNavigator } from './src/navigation/AppNavigator';
import { theme } from './src/theme';

const queryClient = new QueryClient();

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer theme={{
                    dark: true,
                    colors: {
                        primary: theme.colors.primary,
                        background: theme.colors.background,
                        card: theme.colors.card,
                        text: theme.colors.text,
                        border: theme.colors.border,
                        notification: theme.colors.notification,
                    },
                    fonts: DefaultTheme.fonts,
                }}>
                    <StatusBar style="light" />
                    {/* Show onboarding by default for new users */}
                    {/* In production: check AsyncStorage for existing session */}
                    <RootNavigator />
                </NavigationContainer>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
});
