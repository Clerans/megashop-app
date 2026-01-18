import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../store/slices/cartSlice';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>

                <View style={styles.controls}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                    >
                        <Ionicons name="remove" size={16} color={colors.gray[600]} />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    >
                        <Ionicons name="add" size={16} color={colors.gray[600]} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.deleteButton]}
                        onPress={() => dispatch(removeFromCart(item.id))}
                    >
                        <Ionicons name="trash-outline" size={16} color={colors.danger} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 12,
    },
    details: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 8,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        width: 28,
        height: 28,
        borderRadius: 6,
        backgroundColor: colors.gray[100],
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    quantity: {
        fontSize: 14,
        fontWeight: '600',
        marginRight: 10,
    },
    deleteButton: {
        marginLeft: 'auto',
        backgroundColor: colors.gray[50],
    }
});

export default CartItem;
