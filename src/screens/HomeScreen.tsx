import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GlassCard } from '../components/UI/GlassCard';
import { theme } from '../theme';

// Placeholder avatar
const AVATAR_URI = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80';

export const HomeScreen = () => {
    const navigation = useNavigation();

    const MenuItem = ({ icon, title, subtitle, onPress }: any) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <GlassCard style={styles.menuCard}>
                <View style={styles.iconContainer}>
                    <Ionicons name={icon} size={24} color={theme.colors.text} />
                </View>
                <Text style={styles.menuTitle}>{title}</Text>
                <Text style={styles.menuSubtitle}>{subtitle}</Text>
            </GlassCard>
        </TouchableOpacity>
    );

    const MemoryThumbnail = ({ image }: any) => (
        <View style={styles.memoryThumbnailContainer}>
            <Image source={{ uri: image }} style={styles.memoryThumbnailImage} />
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.headerTitleRow}>
                            <View style={styles.onlineDot} />
                            <Text style={styles.headerTitle}>LAURA - Your Companion</Text>
                        </View>
                        <Text style={styles.headerSubtitle}>Online now</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="notifications-outline" size={20} color={theme.colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="person-outline" size={20} color={theme.colors.text} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Welcome Card */}
                <View style={styles.welcomeCard}>
                    <View style={styles.welcomeInfo}>
                        <Image source={{ uri: AVATAR_URI }} style={styles.avatar} />
                        <View style={styles.welcomeTextContainer}>
                            <View style={styles.welcomeNameRow}>
                                <Text style={styles.welcomeTitle}>Welcome back, Sheik</Text>
                                <Text style={styles.waveEmoji}>👋</Text>
                            </View>
                            <Text style={styles.welcomeSubtitle}>Here for you, anytime</Text>
                        </View>
                    </View>
                    <View style={styles.statusBadge}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>Online</Text>
                    </View>
                </View>

                {/* Today Section Header */}
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                        <Ionicons name="sparkles-outline" size={16} color={theme.colors.textSecondary} style={{ marginRight: 6 }} />
                        <Text style={styles.sectionTitle}>Today with Laura</Text>
                    </View>
                    <Text style={styles.sectionSubtitleText}>Calm • Present</Text>
                </View>

                {/* Grid Menu */}
                <View style={styles.gridContainer}>
                    <View style={styles.row}>
                        <MenuItem
                            icon="chatbubble-outline"
                            title="Chat with Laura"
                            subtitle="Start a conversation"
                            onPress={() => navigation.navigate('Chat' as any)}
                        />
                        <MenuItem
                            icon="options-outline"
                            title="Personalize Laura"
                            subtitle="Voice, tone, routines"
                            onPress={() => navigation.navigate('Personalize' as any)}
                        />
                    </View>
                    <View style={styles.row}>
                        <MenuItem
                            icon="bookmark-outline"
                            title="Memories"
                            subtitle="Saved moments"
                            onPress={() => navigation.navigate('Memories' as any)}
                        />
                        <MenuItem
                            icon="settings-outline"
                            title="Settings"
                            subtitle="App & privacy"
                        />
                    </View>
                </View>

                {/* Recent Memories */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Memories</Text>
                    <TouchableOpacity style={styles.seeAllButton}>
                        <Text style={styles.seeAllText}>See all</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.memoriesScroll}>
                    <MemoryThumbnail image="https://images.unsplash.com/photo-1518002171953-a080ee321e2f?auto=format&fit=crop&w=400&q=80" />
                    <MemoryThumbnail image="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80" />
                    <MemoryThumbnail image="https://images.unsplash.com/photo-1499728603963-bc0922fc7763?auto=format&fit=crop&w=400&q=80" />
                    <View style={styles.emptyMemoryPlaceholder} />
                </ScrollView>

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000000',
    },
    container: {
        flex: 1,
    },
    content: {
        padding: theme.spacing.m,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 8,
    },
    headerLeft: {
        flex: 1,
    },
    headerTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    onlineDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4CAF50',
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.colors.text,
        letterSpacing: 0.5,
    },
    headerSubtitle: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginLeft: 16,
        marginTop: 2,
    },
    headerRight: {
        flexDirection: 'row',
        gap: 8,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#111111',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginBottom: 32,
        borderRadius: 24,
        backgroundColor: '#0A0A0A',
        borderWidth: 1,
        borderColor: '#1A1A1A',
    },
    welcomeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 27,
        marginRight: 16,
    },
    welcomeTextContainer: {
        justifyContent: 'center',
    },
    welcomeNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    welcomeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    waveEmoji: {
        fontSize: 16,
        marginLeft: 6,
    },
    welcomeSubtitle: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginTop: 4,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(76, 175, 80, 0.3)',
        backgroundColor: 'rgba(76, 175, 80, 0.05)',
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#4CAF50',
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: '600',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    sectionSubtitleText: {
        fontSize: 14,
        color: theme.colors.textSecondary,
    },
    gridContainer: {
        gap: 16,
        marginBottom: 32,
    },
    row: {
        flexDirection: 'row',
        gap: 16,
    },
    menuItem: {
        flex: 1,
    },
    menuCard: {
        height: 160,
        justifyContent: 'center',
        padding: 20,
        borderRadius: 28,
        backgroundColor: '#080808',
        borderWidth: 1,
        borderColor: '#111',
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#111111',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 6,
    },
    menuSubtitle: {
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    seeAllButton: {
        backgroundColor: '#111111',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    seeAllText: {
        color: '#FFD700',
        fontSize: 11,
        fontWeight: 'bold',
    },
    memoriesScroll: {
        marginLeft: -16,
        paddingLeft: 16,
    },
    memoryThumbnailContainer: {
        width: 120,
        height: 70,
        marginRight: 12,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#111',
    },
    memoryThumbnailImage: {
        width: '100%',
        height: '100%',
    },
    emptyMemoryPlaceholder: {
        width: 120,
        height: 70,
        backgroundColor: '#0A0A0A',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#111',
        marginRight: 16,
    },
});

