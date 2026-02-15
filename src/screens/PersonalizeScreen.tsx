import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomSlider } from '../components/UI/CustomSlider';
import { GlassCard } from '../components/UI/GlassCard';
import { theme } from '../theme';

const AVATAR_URI = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80';

export const PersonalizeScreen = () => {
    const navigation = useNavigation();

    const SummaryCard = ({ label, value, subValue }: any) => (
        <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>{label}</Text>
            <Text style={styles.summaryValue}>{value}</Text>
            {subValue && <Text style={styles.summarySubValue}>{subValue}</Text>}
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                        <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>Laura • Profile</Text>
                    </View>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="help-circle-outline" size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                </View>

                {/* Profile Card */}
                <GlassCard style={styles.profileCard}>
                    <Image source={{ uri: AVATAR_URI }} style={styles.avatar} />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Laura</Text>
                        <Text style={styles.profileRole}>Your AI companion</Text>
                    </View>
                    <View style={styles.activeBadge}>
                        <View style={styles.activeDot} />
                        <Text style={styles.activeText}>Active</Text>
                    </View>
                </GlassCard>

                {/* Personality Summary */}
                <GlassCard style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionTitleRow}>
                            <Ionicons name="sparkles-outline" size={20} color={theme.colors.text} style={{ marginRight: 8 }} />
                            <Text style={styles.sectionTitle}>Personality Summary</Text>
                        </View>
                        <Text style={styles.quickGlance}>Quick glance</Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <SummaryCard
                            label="Personality Type"
                            value="INFJ •"
                            subValue="Advocate"
                        />
                        <SummaryCard
                            label="Tone"
                            value="Warm &"
                            subValue="Supportive"
                        />
                        <SummaryCard
                            label="Activity Level"
                            value="Balanced"
                        />
                    </View>
                </GlassCard>

                {/* Tune Personality */}
                <GlassCard style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionTitleRow}>
                            <Ionicons name="options-outline" size={20} color={theme.colors.text} style={{ marginRight: 8 }} />
                            <Text style={styles.sectionTitle}>Tune Personality</Text>
                        </View>
                    </View>

                    <View style={styles.slidersContainer}>
                        <CustomSlider
                            label="Empathy"
                            value={75}
                            leftLabel="Low"
                            rightLabel="High"
                        />
                        <CustomSlider
                            label="Playfulness"
                            value={40}
                            leftLabel="Calm"
                            rightLabel="Energetic"
                        />
                        <CustomSlider
                            label="Formality"
                            value={60}
                            leftLabel="Casual"
                            rightLabel="Professional"
                        />
                    </View>
                </GlassCard>

                <View style={{ height: 100 }} />
            </ScrollView>
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
    content: {
        padding: theme.spacing.m,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.l,
    },
    headerTitleContainer: {
        backgroundColor: '#1A1A1A',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#1A1A1A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.l,
        marginBottom: theme.spacing.l,
        borderRadius: 30,
        backgroundColor: '#0A0A0A',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: theme.spacing.m,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    profileRole: {
        fontSize: 14,
        color: theme.colors.textSecondary,
    },
    activeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    activeDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4CAF50',
        marginRight: 6,
    },
    activeText: {
        fontSize: 12,
        color: theme.colors.text,
        fontWeight: '600',
    },
    sectionCard: {
        padding: theme.spacing.l,
        marginBottom: theme.spacing.l,
        borderRadius: 30,
        backgroundColor: '#0A0A0A',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.l,
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
    quickGlance: {
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    summaryRow: {
        flexDirection: 'row',
        gap: theme.spacing.m,
    },
    summaryCard: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        padding: theme.spacing.m,
        borderRadius: 20,
        minHeight: 100,
    },
    summaryLabel: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginBottom: 8,
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    summarySubValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    slidersContainer: {
        gap: theme.spacing.m,
    },
});
