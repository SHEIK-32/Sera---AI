import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

const PlaceholderScreen = ({ title }: { title: string }) => (
    <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
    </View>
);

export const ChatScreen = () => <PlaceholderScreen title="Chat" />;
export const PersonalizeScreen = () => <PlaceholderScreen title="Personalize" />;
export const MemoriesScreen = () => <PlaceholderScreen title="Memories" />;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        ...theme.typography.h1,
        color: theme.colors.primary,
    },
});
