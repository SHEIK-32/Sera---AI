import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { theme } from '../../theme';

interface GlassCardProps extends ViewProps {
    style?: ViewStyle;
    variant?: 'default' | 'darker';
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, style, variant = 'default', ...props }) => {
    return (
        <View
            style={[
                styles.card,
                variant === 'darker' && styles.darker,
                style
            ]}
            {...props}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.l,
        padding: theme.spacing.m,
        borderWidth: 1,
        borderColor: theme.colors.border,
        // Subtle shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    darker: {
        backgroundColor: '#111111',
        borderColor: '#222222',
    }
});
