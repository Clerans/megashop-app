import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - SIZES.padding * 2 - 15) / 2; // 2 columns with spacing for Card variant

export default function CategoryItem({ category, image, onPress, variant = 'icon' }) {
    if (variant === 'card') {
        return (
            <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
                <View style={styles.cardImageContainer}>
                    <Image
                        source={typeof image === 'string' ? { uri: image } : image}
                        style={styles.cardImage}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.cardDetails}>
                    <Text style={styles.cardName}>{category.name}</Text>
                    <Text style={styles.cardCount}>{category.product_count || 0} items</Text>
                </View>
            </TouchableOpacity>
        );
    }

    // Default 'icon' variant for Home Screen
    return (
        <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
            <View style={styles.iconCircle}>
                <Ionicons name={category.icon || 'list'} size={32} color={COLORS.primary} />
            </View>
            <Text style={styles.iconName}>{category.name}</Text>
            <Text style={styles.iconCount}>{(category.product_count || 0) + ' Items'}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    // Card Variant Styles
    cardContainer: {
        width: CARD_WIDTH,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        marginBottom: 15,
        ...SHADOWS.medium,
        overflow: 'hidden',
    },
    cardImageContainer: {
        height: 100,
        backgroundColor: COLORS.light,
        width: '100%',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    cardDetails: {
        padding: 12,
    },
    cardName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.dark,
        marginBottom: 4,
    },
    cardCount: {
        fontSize: 12,
        color: COLORS.gray,
    },

    // Icon Variant Styles (Micro Cards for Home)
    iconContainer: {
        alignItems: 'center',
        marginBottom: 15,
        width: '23%', // 4 columns with spacing
        backgroundColor: COLORS.white,
        borderRadius: 12,
        paddingVertical: 15,
        marginHorizontal: '1%',
        ...SHADOWS.light,
        elevation: 2,
    },
    iconCircle: {
        width: 40,
        height: 40,
        // backgroundColor: COLORS.light, // Removed background
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    iconName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.dark,
        textAlign: 'center',
        marginBottom: 4,
    },
    iconCount: {
        fontSize: 10,
        color: COLORS.gray,
        textAlign: 'center',
    },
});
