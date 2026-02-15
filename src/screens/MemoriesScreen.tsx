import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Dimensions,
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48) / 2;

const BRAND_GRADIENT = ['#8b5cf6', '#3b82f6'];
const PURPLE_ICON_COLOR = '#8b5cf6';

interface Memory {
    id: string;
    title: string;
    date: string;
    image?: string;
    bookmarked?: boolean;
}

const MEMORIES: Memory[] = [
    {
        id: '1',
        title: 'Evening reflection',
        date: 'Today',
        image: 'https://images.unsplash.com/photo-1518005020251-582c7bea6a20?q=80&w=500&auto=format&fit=crop',
        bookmarked: false,
    },
    {
        id: '2',
        title: 'Breathing practice',
        date: 'Yesterday',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=500&auto=format&fit=crop',
        bookmarked: false,
    },
    {
        id: '3',
        title: 'Gratitude notes',
        date: '2 days ago',
        bookmarked: true,
    },
    {
        id: '4',
        title: 'Morning motivation',
        date: '3 days ago',
        image: 'https://images.unsplash.com/photo-1470252649358-96f3c802e6c6?q=80&w=500&auto=format&fit=crop',
        bookmarked: true,
    },
    {
        id: '5',
        title: 'Calm evening',
        date: 'Last week',
        bookmarked: true,
    },
    {
        id: '6',
        title: 'Stress relief',
        date: 'Last week',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=500&auto=format&fit=crop',
        bookmarked: true,
    },
];

const MemoryCard = ({ memory }: { memory: Memory }) => {
    return (
        <TouchableOpacity style={styles.cardContainer} activeOpacity={0.8}>
            <View style={styles.cardContent}>
                {memory.image ? (
                    <ImageBackground
                        source={{ uri: memory.image }}
                        style={styles.backgroundImage}
                        imageStyle={{ borderRadius: 24 }}
                    >
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.8)']}
                            style={styles.gradient}
                        >
                            <View style={styles.bookmarkIconContainer}>
                                <Ionicons
                                    name={memory.bookmarked ? "bookmark" : "bookmark-outline"}
                                    size={18}
                                    color={memory.bookmarked ? PURPLE_ICON_COLOR : "#FFFFFF"}
                                />
                            </View>
                            <View style={styles.cardInfo}>
                                <View style={styles.datePill}>
                                    <Text style={styles.dateText}>{memory.date}</Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                ) : (
                    <View style={[styles.solidCard, memory.bookmarked && styles.bookmarkedSolidCard]}>
                        <View style={styles.bookmarkIconContainer}>
                            <Ionicons
                                name={memory.bookmarked ? "bookmark" : "bookmark-outline"}
                                size={18}
                                color={memory.bookmarked ? PURPLE_ICON_COLOR : "#FFFFFF"}
                            />
                        </View>
                        <View style={styles.cardInfo}>
                            <View style={styles.datePill}>
                                <Text style={styles.dateText}>{memory.date}</Text>
                            </View>
                        </View>
                    </View>
                )}
            </View>
            <Text style={styles.cardTitle}>{memory.title}</Text>
        </TouchableOpacity>
    );
};

export const MemoriesScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Memories</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="search" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="options-outline" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.grid}>
                    {MEMORIES.map((memory) => (
                        <MemoryCard key={memory.id} memory={memory} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    headerActions: {
        flexDirection: 'row',
        gap: 12,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 100,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    cardContainer: {
        width: COLUMN_WIDTH,
        marginBottom: 24,
    },
    cardContent: {
        height: COLUMN_WIDTH * 1.3,
        marginBottom: 12,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        padding: 12,
        borderRadius: 24,
    },
    solidCard: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 24,
        padding: 12,
        justifyContent: 'flex-end',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    bookmarkedSolidCard: {
        borderColor: 'rgba(139, 92, 246, 0.3)',
        backgroundColor: 'rgba(139, 92, 246, 0.05)',
    },
    bookmarkIconContainer: {
        position: 'absolute',
        top: 12,
        right: 12,
    },
    cardInfo: {
        gap: 8,
    },
    datePill: {
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: 'rgba(139, 92, 246, 0.3)',
    },
    dateText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginTop: 4,
    },
});
