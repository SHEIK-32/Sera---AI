import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
                    <AppNavigator />
                </NavigationContainer>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
