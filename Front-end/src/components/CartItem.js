import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export default function CartItem({ item, onIncrement, onDecrement, onRemove }) {
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
                {/* Attributes like color/size if needed */}
            </View>

            <View style={styles.actions}>
                <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
                    <Ionicons name="trash-outline" size={20} color={COLORS.danger} />
                </TouchableOpacity>

                <View style={styles.qtyContainer}>
                    <TouchableOpacity onPress={onDecrement} style={styles.qtyBtn}>
                        <Text style={styles.qtyBtnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={onIncrement} style={styles.qtyBtn}>
                        <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: SIZES.radius,
        marginBottom: 10,
        alignItems: 'center',
        ...SHADOWS.light,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 10,
    },
    details: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.dark,
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    actions: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 70,
    },
    removeBtn: {
        padding: 5,
    },
    qtyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.light,
        borderRadius: 15,
        padding: 2,
    },
    qtyBtn: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.dark,
    },
    qtyText: {
        marginHorizontal: 8,
        fontSize: 14,
        fontWeight: 'bold',
    },
});
