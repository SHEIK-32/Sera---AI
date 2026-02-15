import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { theme } from '../../theme';

interface CustomSliderProps {
    label: string;
    value: number; // 0 to 100
    leftLabel: string;
    rightLabel: string;
    style?: ViewStyle;
}

export const CustomSlider: React.FC<CustomSliderProps> = ({
    label,
    value,
    leftLabel,
    rightLabel,
    style
}) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.header}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.labelsContainer}>
                    <Text style={styles.subLabel}>{leftLabel}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.subLabel}>{rightLabel}</Text>
                </View>
            </View>

            <View style={styles.trackContainer}>
                {/* Background Track */}
                <View style={styles.trackBackground} />

                {/* Active Track (Gold) */}
                <View style={[styles.trackActive, { width: `${value}%` }]} />

                {/* Thumb (Invisible but implied by end of active track, or we can add a circle) */}
                {/* <View style={[styles.thumb, { left: `${value}%` }]} /> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.l,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.s,
    },
    label: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: '600',
    },
    labelsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    subLabel: {
        color: theme.colors.textSecondary,
        fontSize: 12,
    },
    dot: {
        color: theme.colors.textSecondary,
        fontSize: 12,
    },
    trackContainer: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#333333',
        position: 'relative',
        overflow: 'hidden',
    },
    trackBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#2A2A2A',
    },
    trackActive: {
        height: '100%',
        backgroundColor: theme.colors.primary, // Gold
        borderRadius: 4,
    },
});
