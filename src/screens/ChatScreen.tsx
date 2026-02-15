import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';

const AVATAR_URI = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: number;
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: '1',
        text: "Hey, I'm here. How's your evening going? Want to unwind together for a few minutes?",
        sender: 'ai',
        timestamp: 1,
    },
    {
        id: '2',
        text: "Long day. I could use something calming.",
        sender: 'user',
        timestamp: 2,
    },
    {
        id: '3',
        text: "Let's slow the pace. I'll guide your breath: in for four, hold for four, out for six. I'm right here with you.",
        sender: 'ai',
        timestamp: 3,
    },
    {
        id: '4',
        text: "Inhale... two... three... four...",
        sender: 'ai',
        timestamp: 4,
    },
    {
        id: '5',
        text: "That already helps. Can you remind me I did well today?",
        sender: 'user',
        timestamp: 5,
    },
];

export const ChatScreen = () => {
    const navigation = useNavigation();
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);

    const renderMessage = ({ item }: { item: Message }) => {
        const isUser = item.sender === 'user';

        return (
            <View style={[
                styles.messageRow,
                isUser ? styles.userRow : styles.aiRow
            ]}>
                {!isUser && (
                    <Image source={{ uri: AVATAR_URI }} style={styles.avatarSmall} />
                )}
                <View style={[
                    styles.bubble,
                    isUser ? styles.userBubble : styles.aiBubble
                ]}>
                    {/* Typing indicator placeholder for AI if needed, but here just text */}
                    {item.text === '...' ? (
                        <View style={styles.typingIndicator}>
                            <View style={styles.typingDot} />
                            <View style={styles.typingDot} />
                            <View style={styles.typingDot} />
                        </View>
                    ) : (
                        <Text style={styles.messageText}>{item.text}</Text>
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.container}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                        <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
                    </TouchableOpacity>

                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>LAURA - Your Companion</Text>
                        <View style={styles.statusRow}>
                            <View style={styles.statusDot} />
                            <Text style={styles.headerSubtitle}>Online now</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="ellipsis-horizontal" size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                </View>

                {/* Messages */}
                <FlatList
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.messagesList}
                    showsVerticalScrollIndicator={false}
                />

                {/* Input Area */}
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.plusButton}>
                        <Ionicons name="add" size={24} color={theme.colors.text} />
                    </TouchableOpacity>

                    <View style={styles.inputWrapper}>
                        <Ionicons name="sparkles-outline" size={18} color={theme.colors.textSecondary} style={styles.sparkIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Talk to me..."
                            placeholderTextColor={theme.colors.textSecondary}
                            value={inputText}
                            onChangeText={setInputText}
                        />
                    </View>

                    <TouchableOpacity style={styles.micButton}>
                        <Ionicons name="mic" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.m,
        paddingVertical: theme.spacing.s,
    },
    headerCenter: {
        alignItems: 'center',
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#4CAF50',
        marginRight: 6,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#4CAF50', // Matching the "Online now" green color
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.08)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    messagesList: {
        padding: theme.spacing.m,
        paddingBottom: 20,
    },
    messageRow: {
        flexDirection: 'row',
        marginBottom: theme.spacing.m,
        maxWidth: '85%',
    },
    userRow: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
    aiRow: {
        alignSelf: 'flex-start',
    },
    avatarSmall: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
        marginTop: 4,
    },
    bubble: {
        padding: 14,
        borderRadius: 20,
    },
    aiBubble: {
        backgroundColor: theme.colors.bubbleAI,
        borderBottomLeftRadius: 4,
    },
    userBubble: {
        backgroundColor: theme.colors.bubbleUser,
        borderBottomRightRadius: 4,
    },
    messageText: {
        color: theme.colors.text,
        fontSize: 15,
        lineHeight: 22,
    },
    typingIndicator: {
        flexDirection: 'row',
        gap: 4,
    },
    typingDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#666',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.m,
        paddingBottom: Platform.OS === 'ios' ? 20 : theme.spacing.m,
    },
    plusButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 50,
        marginRight: 10,
    },
    sparkIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        color: theme.colors.text,
        fontSize: 16,
    },
    micButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
