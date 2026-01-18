import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const CategoryCard = ({ category, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.iconContainer}>
                <Ionicons name={getIconName(category.icon)} size={24} color={colors.primary} />
            </View>
            <Text style={styles.name}>{category.name}</Text>
            {category.count && <Text style={styles.count}>{category.count} items</Text>}
        </TouchableOpacity>
    );
};

const getIconName = (faClass) => {
    if (faClass.includes('tv')) return 'tv-outline';
    if (faClass.includes('spa')) return 'rose-outline';
    if (faClass.includes('tshirt')) return 'shirt-outline';
    if (faClass.includes('home')) return 'home-outline';
    if (faClass.includes('dumbbell')) return 'fitness-outline';
    if (faClass.includes('gamepad')) return 'game-controller-outline';
    if (faClass.includes('book')) return 'book-outline';
    if (faClass.includes('shopping-basket')) return 'basket-outline';
    return 'grid-outline';
};

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.light,
        borderRadius: 10,
        padding: 12,
        width: '23%', // Approx 1/4th of screen width minus gap
        marginBottom: 10,
    },
    iconContainer: {
        marginBottom: 8,
    },
    name: {
        fontSize: 11,
        color: colors.dark,
        fontWeight: '500',
        textAlign: 'center',
    },
    count: {
        fontSize: 9,
        color: colors.gray[400],
        marginTop: 2,
    },
});

export default CategoryCard;
