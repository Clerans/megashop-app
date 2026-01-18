import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

const ProductCard = ({ product, onPress }) => {
    const dispatch = useDispatch();
    const [isWishlisted, setIsWishlisted] = React.useState(false);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        // Dispatch to user/wishlist slice in real app
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: product.image }} style={styles.image} />

            <TouchableOpacity style={styles.wishlistButton} onPress={toggleWishlist}>
                <Ionicons name={isWishlisted ? "heart" : "heart-outline"} size={20} color={isWishlisted ? colors.primary : colors.gray[400]} />
            </TouchableOpacity>

            <View style={styles.badgesContainer}>
                {product.badges.includes('best-seller') && (
                    <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                        <Ionicons name="trophy" size={10} color={colors.white} style={{ marginRight: 2 }} />
                        <Text style={styles.badgeText}>Best Seller</Text>
                    </View>
                )}
                {product.badges.includes('free-ship') && (
                    <View style={[styles.badge, { backgroundColor: colors.success || '#2ECC71' }]}>
                        <Ionicons name="boat" size={10} color={colors.white} style={{ marginRight: 2 }} />
                        <Text style={styles.badgeText}>Free Ship</Text>
                    </View>
                )}
                {product.badges.includes('new') && (
                    <View style={[styles.badge, { backgroundColor: colors.secondary }]}>
                        <Ionicons name="star" size={10} color={colors.white} style={{ marginRight: 2 }} />
                        <Text style={styles.badgeText}>New</Text>
                    </View>
                )}
                {product.originalPrice > product.price && (
                    <View style={[styles.badge, { backgroundColor: '#E74C3C' }]}>
                        <Ionicons name="pricetag" size={10} color={colors.white} style={{ marginRight: 2 }} />
                        <Text style={styles.badgeText}>{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF</Text>
                    </View>
                )}
            </View>
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#eab308" />
                    <Text style={styles.rating}>{product.rating} ({product.reviews})</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                    <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                        <Ionicons name="add" size={20} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 12,
        marginBottom: 16,
        width: '48%',
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    content: {
        padding: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.gray[800],
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    rating: {
        fontSize: 12,
        color: colors.gray[500],
        marginLeft: 4,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary,
    },
    addButton: {
        backgroundColor: colors.primary,
        borderRadius: 20,
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgesContainer: {
        position: 'absolute',
        top: 8,
        left: 8,
        zIndex: 1,
        alignItems: 'flex-start',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginBottom: 4,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.white,
    },
    wishlistButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 2,
        backgroundColor: colors.white,
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
    },
});

export default ProductCard;
