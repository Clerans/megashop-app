import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import { toggleWishlist, selectIsInWishlist } from '../../redux/wishlistSlice';

const ProductCard = ({ product, onPress }) => {
    const dispatch = useDispatch();
    const isWishlist = useSelector(state => selectIsInWishlist(state, product.id));

    const handleWishlist = () => {
        dispatch(toggleWishlist(product));
    };

    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(product)}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: product.image }} style={styles.image} />
                {/* Badges */}
                <View style={styles.badgesContainer}>
                    {product.badges && product.badges.includes('best-seller') && (
                        <View style={[styles.badge, { backgroundColor: COLORS.primary }]}>
                            <Ionicons name="flame" size={10} color={COLORS.white} />
                            <Text style={styles.badgeText}>Best Seller</Text>
                        </View>
                    )}
                    {product.badges && product.badges.includes('discount') && (
                        <View style={[styles.badge, { backgroundColor: COLORS.danger }]}>
                            <Ionicons name="pricetag" size={10} color={COLORS.white} />
                            <Text style={styles.badgeText}>Sale</Text>
                        </View>
                    )}
                </View>
                {/* Wishlist Button */}
                <TouchableOpacity
                    style={styles.wishlistBtn}
                    onPress={handleWishlist}
                >
                    <Ionicons
                        name={isWishlist ? "heart" : "heart-outline"}
                        size={18}
                        color={isWishlist ? COLORS.danger : COLORS.gray}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={2}>{product.name}</Text>

                <View style={styles.priceRow}>
                    <Text style={styles.price}>${product.price}</Text>
                    {product.originalPrice && (
                        <Text style={styles.originalPrice}>${product.originalPrice}</Text>
                    )}
                </View>

                <View style={styles.footer}>
                    <View style={styles.rating}>
                        <Ionicons name="star" size={12} color={COLORS.accent} />
                        <Text style={styles.ratingText}>{product.rating}</Text>
                        <Text style={styles.soldText}>| {product.soldCount} sold</Text>
                    </View>

                    <TouchableOpacity style={styles.addBtn}>
                        <Ionicons name="add" size={18} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default React.memo(ProductCard);

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        marginBottom: SIZES.medium,
        width: '48%', // For Grid
        ...SHADOWS.light,
        overflow: 'hidden',
    },
    imageContainer: {
        height: 150,
        width: '100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    badgesContainer: {
        position: 'absolute',
        top: 8,
        left: 8,
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
        color: COLORS.white,
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 2,
    },
    details: {
        padding: 10,
    },
    title: {
        fontSize: 13,
        fontWeight: '500',
        color: COLORS.text,
        marginBottom: 5,
        height: 36, // Fixed height for 2 lines
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    originalPrice: {
        fontSize: 11,
        color: COLORS.gray,
        textDecorationLine: 'line-through',
        marginLeft: 6,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 11,
        marginLeft: 3,
        fontWeight: '600',
        color: COLORS.dark,
    },
    soldText: {
        fontSize: 10,
        color: COLORS.gray,
        marginLeft: 4,
    },
    addBtn: {
        padding: 4,
        backgroundColor: COLORS.light,
        borderRadius: 15,
    },
    wishlistBtn: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.small,
    },
});
