import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist, selectIsInWishlist } from '../../redux/wishlistSlice';
import { addToCart } from '../../redux/cartSlice';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ navigation, route }) {
    const { product } = route.params;
    const dispatch = useDispatch();
    const isWishlist = useSelector(state => selectIsInWishlist(state, product.id));

    const handleWishlist = () => {
        dispatch(toggleWishlist(product));
    };

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        Toast.show({
            type: 'success',
            text1: 'Added to Cart',
            text2: `${product.name} has been added!`,
            position: 'top',
        });
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Product Details</Text>
                <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('Cart')}>
                    <Ionicons name="cart-outline" size={24} color={COLORS.dark} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Image */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.image }} style={styles.image} />
                    {/* Badges */}
                    <View style={styles.badgesContainer}>
                        {product.badges.map((badge, index) => (
                            <View key={index} style={[styles.badge,
                            {
                                backgroundColor: badge === 'best-seller' ? COLORS.primary :
                                    badge === 'discount' ? COLORS.danger :
                                        badge === 'new' ? COLORS.secondary : COLORS.success
                            }]}>
                                <Text style={styles.badgeText}>{badge.replace('-', ' ').toUpperCase()}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Info */}
                <View style={styles.infoContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{product.name}</Text>
                        <View style={styles.rating}>
                            <Ionicons name="star" size={16} color={COLORS.accent} />
                            <Text style={styles.ratingText}>{product.rating} ({product.reviews})</Text>
                        </View>
                    </View>

                    <Text style={styles.seller}>Sold by {product.seller}</Text>

                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${product.price}</Text>
                        {product.originalPrice && <Text style={styles.originalPrice}>${product.originalPrice}</Text>}
                        {product.originalPrice && (
                            <View style={styles.discountBadge}>
                                <Text style={styles.discountText}>
                                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    <View style={styles.divider} />

                    {/* Delivery Info */}
                    <View style={styles.deliveryRow}>
                        <Ionicons name="truck-outline" size={20} color={COLORS.secondary} />
                        <Text style={styles.deliveryText}>{product.delivery}</Text>
                    </View>

                    <View style={styles.spacer} />
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.wishlistBtn} onPress={handleWishlist}>
                        <Ionicons
                            name={isWishlist ? "heart" : "heart-outline"}
                            size={24}
                            color={isWishlist ? COLORS.danger : COLORS.primary}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    backBtn: {
        padding: 5,
    },
    cartBtn: {
        padding: 5,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    imageContainer: {
        width: width,
        height: 300,
        backgroundColor: COLORS.light,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    badgesContainer: {
        position: 'absolute',
        top: 15,
        left: 15,
        alignItems: 'flex-start',
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginBottom: 5,
    },
    badgeText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
    infoContainer: {
        padding: SIZES.padding,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.dark,
        flex: 1,
        marginRight: 10,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.light,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 12,
        fontWeight: '600',
    },
    seller: {
        fontSize: 12,
        color: COLORS.gray,
        marginBottom: 15,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    originalPrice: {
        fontSize: 16,
        color: COLORS.gray,
        textDecorationLine: 'line-through',
        marginLeft: 10,
    },
    discountBadge: {
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginLeft: 10,
    },
    discountText: {
        color: COLORS.danger,
        fontSize: 12,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.light,
        marginVertical: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: COLORS.gray,
        lineHeight: 22,
    },
    deliveryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(42, 157, 143, 0.1)',
        padding: 12,
        borderRadius: SIZES.radius,
    },
    deliveryText: {
        marginLeft: 10,
        color: COLORS.secondary,
        fontWeight: '500',
    },
    spacer: {
        height: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: COLORS.light,
        paddingBottom: 30, // Safe area
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 15,
    },
    wishlistBtn: {
        width: 50,
        height: 50,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: COLORS.light,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartBtn: {
        flex: 1,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    addToCartText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
