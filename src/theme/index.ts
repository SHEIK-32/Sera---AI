export const theme = {
    colors: {
        background: '#000000',
        primary: '#FADE4B', // Bright Yellow from image
        text: '#FFFFFF',
        textSecondary: '#999999', // Slightly darker gray for secondary text

        // Bubble colors
        bubbleAI: 'rgba(255, 255, 255, 0.08)',
        bubbleUser: 'rgba(255, 255, 255, 0.15)',
        bubbleUserBorder: 'transparent',

        // UI Elements
        card: '#1A1A1A',
        border: '#333333',
        notification: '#FF453A',

        // Glassmorphism
        glass: 'rgba(255, 255, 255, 0.05)',
        glassBorder: 'rgba(255, 255, 255, 0.1)',
        glassHighlight: 'rgba(255, 255, 255, 0.15)',

        // Gradients
        gradientDark: ['rgba(0,0,0,0.8)', 'rgba(0,0,0,0)'],
        gradientGold: ['#FADE4B', '#F5A623'],
    },
    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
        xxl: 48,
    },
    borderRadius: {
        s: 8,
        m: 12,
        l: 20, // Requested 20px radius
        xl: 32,
        round: 9999,
    },
    typography: {
        h1: {
            fontSize: 32,
            fontWeight: 'bold',
            color: '#FFFFFF',
        },
        h2: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF',
        },
        h3: {
            fontSize: 20,
            fontWeight: '600',
            color: '#FFFFFF',
        },
        body: {
            fontSize: 16,
            color: '#FFFFFF',
            lineHeight: 24,
        },
        caption: {
            fontSize: 12,
            color: '#CCCCCC',
        },
    } as const,
    shadows: {
        subtle: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        glow: {
            shadowColor: '#FFD700',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 5,
        }
    }
};

export type Theme = typeof theme;
