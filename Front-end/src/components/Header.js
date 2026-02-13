import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

export default function Header({ onSearch, onProfile, onCart, onLocation, onWishlist, onVoice, onAssistant }) {
    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <LinearGradient
            colors={[COLORS.primary, '#FF8E53']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.header}
        >
            <SafeAreaView edges={['top', 'left', 'right']}>
                {/* Top Row */}
                <View style={styles.topRow}>
                    <View style={styles.logoContainer}>
                        <Ionicons name="bag-handle" size={26} color={COLORS.white} />
                        <Text style={styles.logoText}>MegaShop</Text>
                    </View>

                    <View style={styles.actionsContainer}>
                        <TouchableOpacity style={styles.iconButton} onPress={onLocation}>
                            <Ionicons name="location" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="notifications" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={onWishlist}>
                            <Ionicons name="heart" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={onProfile}>
                            <Ionicons name="person" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Promo Banner - Inside Header for Gradient Background */}
                <View style={styles.promoBanner}>
                    <View style={styles.promoContent}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                                <Ionicons name="bus" size={16} color="#FFD166" style={{ marginRight: 5 }} />
                                <Text style={styles.promoTitle}>FREE SHIPPING</Text>
                            </View>
                            <Text style={styles.promoSubtitle}>Special for you • No minimum purchase</Text>
                        </View>
                        <View style={styles.guaranteeBadge}>
                            <Text style={styles.guaranteeText}>Delivery Guarantee</Text>
                        </View>
                    </View>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBox}>
                        <Ionicons name="search" size={20} color={COLORS.gray} style={styles.searchIcon} />
                        <TextInput
                            placeholder="Search millions of products..."
                            placeholderTextColor={COLORS.gray}
                            style={styles.input}
                        />
                        <View style={styles.searchActions}>
                            <TouchableOpacity style={styles.micBtn} onPress={onVoice}>
                                <Ionicons name="mic" size={18} color={COLORS.white} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botBtn} onPress={onAssistant}>
                                <FontAwesome5 name="robot" size={16} color={COLORS.white} solid />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: SIZES.padding,
        paddingBottom: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 5,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    actionsContainer: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 12,
    },
    promoBanner: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent white
        borderRadius: 12,
        padding: 15,
        marginTop: 5,
        marginBottom: 15, // Space before search bar
    },
    promoContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    promoTitle: {
        fontSize: 16, // Larger
        fontWeight: 'bold',
        color: COLORS.white,
    },
    promoSubtitle: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    guaranteeBadge: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    guaranteeText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: COLORS.primary, // Orange text
    },
    searchContainer: {
        marginTop: 0,
    },
    searchBox: {
        backgroundColor: COLORS.white,
        borderRadius: 30, // More rounded
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 50, // Taller
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: COLORS.dark,
        fontSize: 14,
    },
    searchActions: {
        flexDirection: 'row',
        gap: 8,
    },
    micBtn: {
        backgroundColor: COLORS.secondary, // Teal background
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    botBtn: {
        backgroundColor: COLORS.secondary, // Same Teal background
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: COLORS.danger,
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
});
