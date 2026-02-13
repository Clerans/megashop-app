import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

const ModalHeader = ({ title, onClose }) => (
    <View style={styles.header}>
        <Text style={styles.modalTitle}>{title}</Text>
        <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={COLORS.gray} />
        </TouchableOpacity>
    </View>
);

// --- Existing Modals (Simpler versions found in new design?) ---
// Keeping Location/Wishlist simple as they weren't in the specific "exact match" screenshots but are part of the app.
export const LocationModal = ({ visible, onClose }) => {
    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ModalHeader title="Delivery Location" onClose={onClose} />
                    <View style={styles.content}>
                        <View style={styles.locationIconContainer}>
                            <Ionicons name="location" size={40} color={COLORS.primary} />
                        </View>
                        <Text style={styles.currentLocation}>New York, NY 10001</Text>
                        <Text style={styles.subText}>Current delivery location</Text>
                        <TouchableOpacity style={styles.primaryBtn} onPress={onClose}>
                            <Text style={styles.primaryBtnText}>Confirm Location</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

import { toggleWishlist, selectWishlistItems } from '../redux/wishlistSlice';

export const WishlistModal = ({ visible, onClose }) => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector(selectWishlistItems);

    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { height: '80%' }]}>
                    <ModalHeader title={`My Wishlist (${wishlistItems.length})`} onClose={onClose} />

                    {wishlistItems.length === 0 ? (
                        <View style={[styles.content, { alignItems: 'center', paddingVertical: 40 }]}>
                            <Ionicons name="heart" size={60} color={COLORS.light} />
                            <Text style={[styles.subText, { marginTop: 15 }]}>Your wishlist is empty</Text>
                            <TouchableOpacity style={styles.primaryBtn} onPress={onClose}>
                                <Text style={styles.primaryBtnText}>Start Shopping</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {wishlistItems.map((item) => (
                                <View key={item.id} style={styles.orderItem}>
                                    <Image source={{ uri: item.image }} style={{ width: 60, height: 60, borderRadius: 8, marginRight: 15 }} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.orderId} numberOfLines={1}>{item.name}</Text>
                                        <Text style={styles.orderPrice}>${item.price}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                            <Ionicons name="star" size={12} color={COLORS.accent} />
                                            <Text style={[styles.orderItems, { textAlign: 'left', marginLeft: 4 }]}>{item.rating}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        style={{ padding: 10 }}
                                        onPress={() => dispatch(toggleWishlist(item))}
                                    >
                                        <Ionicons name="heart" size={24} color={COLORS.danger} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </View>
            </View>
        </Modal>
    );
};

// --- NEW MODALS (Exact Desgin Match) ---

import { useDispatch, useSelector } from 'react-redux';
import { setSortBy, setFilters, setPriceRange, resetFilters } from '../redux/productSlice';
import { selectAllCategories } from '../redux/categorySlice';
import { useState, useEffect } from 'react';

export const FilterModal = ({ visible, onClose }) => {
    const dispatch = useDispatch();
    const categories = useSelector(selectAllCategories);
    const currentFilters = useSelector(state => state.products.filters);
    const currentSort = useSelector(state => state.products.sortBy);
    const activeCategory = useSelector(state => state.products.activeCategory);

    // Local state for the modal (apply only on button press)
    const [sortBy, setLocalSortBy] = useState(currentSort);
    const [priceRange, setLocalPriceRange] = useState({ min: currentFilters.minPrice, max: currentFilters.maxPrice });
    const [selectedCategory, setSelectedCategory] = useState(activeCategory);

    // Sync local state when modal opens or Redux state changes
    useEffect(() => {
        if (visible) {
            setLocalSortBy(currentSort);
            setLocalPriceRange({ min: currentFilters.minPrice, max: currentFilters.maxPrice });
            setSelectedCategory(activeCategory);
        }
    }, [visible, currentSort, currentFilters, activeCategory]);

    const handleApply = () => {
        dispatch(setSortBy(sortBy));
        dispatch(setPriceRange(priceRange));
        // We might want to dispatch setCategory from here too if we want the modal to control it
        // Check if setCategory is imported/used in HomeScreen or here.
        // For now, let's assume we can dispatch it here too.
        // We need to import setCategory action first if we want to use it
        // But wait, setCategory is usually for the main view.
        // Let's import it dynamically or assume the user wants to filter within the current view?
        // The design shows "Categories" in the filter modal, so it should update the main category.

        // Dynamic import or rely on HomeScreen?
        // Better to dispatch everything.
        const { setCategory } = require('../redux/productSlice');
        dispatch(setCategory(selectedCategory));

        onClose();
    };

    const handleReset = () => {
        dispatch(resetFilters());
        onClose();
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ModalHeader title="Filters" onClose={onClose} />

                    <Text style={styles.sectionTitle}>Sort By</Text>
                    <View style={styles.tagsContainer}>
                        {['Relevance', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Newest'].map((sort) => {
                            let value = 'relevance';
                            if (sort === 'Price: Low to High') value = 'price-low';
                            if (sort === 'Price: High to Low') value = 'price-high';
                            if (sort === 'Top Rated') value = 'Top Rated'; // Matches slice logic
                            if (sort === 'Newest') value = 'Newest';

                            const isActive = sortBy === value;
                            return (
                                <TouchableOpacity
                                    key={sort}
                                    style={isActive ? styles.tagActive : styles.tag}
                                    onPress={() => setLocalSortBy(value)}
                                >
                                    <Text style={isActive ? styles.tagTextActive : styles.tagText}>{sort}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <Text style={styles.sectionTitle}>Price Range</Text>
                    <View style={styles.sliderContainer}>
                        <View style={styles.sliderTrack}>
                            {/* Visual representation of range - strictly UI for now as no slider lib */}
                            <View style={[styles.sliderFill, { width: '100%' }]} />
                        </View>
                        {/* 
                           In a real app, we'd use @react-native-community/slider or similar.
                           For now, provide simple inputs or presets.
                        */}
                    </View>
                    <View style={styles.priceLabels}>
                        <TextInput
                            style={[styles.priceInput, { width: 60, textAlign: 'center', borderBottomWidth: 1 }]}
                            value={String(priceRange.min)}
                            onChangeText={(text) => setLocalPriceRange({ ...priceRange, min: Number(text) || 0 })}
                            keyboardType="numeric"
                        />
                        <Text>to</Text>
                        <TextInput
                            style={[styles.priceInput, { width: 60, textAlign: 'center', borderBottomWidth: 1 }]}
                            value={String(priceRange.max)}
                            onChangeText={(text) => setLocalPriceRange({ ...priceRange, max: Number(text) || 10000 })}
                            keyboardType="numeric"
                        />
                    </View>

                    <Text style={styles.sectionTitle}>Categories</Text>
                    <View style={styles.categoryPills}>
                        <TouchableOpacity
                            style={selectedCategory === 'All' ? styles.tagActive : styles.tag}
                            onPress={() => setSelectedCategory('All')}
                        >
                            <Text style={selectedCategory === 'All' ? styles.tagTextActive : styles.tagText}>All</Text>
                        </TouchableOpacity>
                        {categories.map(cat => (
                            <TouchableOpacity
                                key={cat.id}
                                style={selectedCategory === cat.name ? styles.tagActive : styles.tag}
                                onPress={() => setSelectedCategory(cat.name)}
                            >
                                <Text style={selectedCategory === cat.name ? styles.tagTextActive : styles.tagText}>{cat.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.footerBtns}>
                        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
                            <Text style={styles.resetBtnText}>Reset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
                            <Text style={styles.applyBtnText}>Apply Filters</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export const OrdersModal = ({ visible, onClose }) => {
    const orders = [
        { id: 'ORD-12345', date: '2025-12-20', price: '$89.97', items: '3 items', status: 'Delivered', statusColor: COLORS.success },
        { id: 'ORD-12346', date: '2025-12-18', price: '$149.99', items: '2 items', status: 'In Transit', statusColor: '#E67E22' }, // Orange
        { id: 'ORD-12347', date: '2025-12-15', price: '$34.99', items: '1 item', status: 'Processing', statusColor: '#F1C40F' }, // Yellow
        { id: 'ORD-12348', date: '2025-12-12', price: '$79.99', items: '2 items', status: 'Delivered', statusColor: COLORS.success },
    ];

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { maxHeight: '80%' }]}>
                    <ModalHeader title="My Orders" onClose={onClose} />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {orders.map((order, index) => (
                            <View key={index} style={styles.orderItem}>
                                <View>
                                    <Text style={styles.orderId}>{order.id}</Text>
                                    <Text style={styles.orderDate}>{order.date}</Text>
                                    <Text style={styles.orderPrice}>{order.price}</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={[styles.orderStatus, { color: order.statusColor }]}>{order.status}</Text>
                                    <Text style={styles.orderItems}>{order.items}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export const ProfileModal = ({ visible, onClose, onOpenOrders }) => {
    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ModalHeader title="My Profile" onClose={onClose} />

                    <View style={styles.profileHeader}>
                        <View style={styles.avatarContainer}>
                            <Ionicons name="person" size={40} color={COLORS.white} />
                        </View>
                        <Text style={styles.profileName}>John Doe</Text>
                        <Text style={styles.profileEmail}>john.doe@example.com</Text>
                    </View>

                    <View style={styles.statsRow}>
                        <TouchableOpacity style={styles.statItem} onPress={() => { onClose(); onOpenOrders(); }}>
                            <Text style={styles.statValue}>15</Text>
                            <Text style={styles.statLabel}>Orders</Text>
                        </TouchableOpacity>
                        <View style={styles.statDivider} />
                        <TouchableOpacity style={styles.statItem}>
                            <Text style={styles.statValue}>8</Text>
                            <Text style={styles.statLabel}>Wishlist</Text>
                        </TouchableOpacity>
                        <View style={styles.statDivider} />
                        <TouchableOpacity style={styles.statItem}>
                            <Text style={styles.statValue}>12</Text>
                            <Text style={styles.statLabel}>Reviews</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons name="create-outline" size={16} color={COLORS.dark} style={{ marginRight: 10 }} />
                        <Text style={styles.menuText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons name="location-outline" size={16} color={COLORS.dark} style={{ marginRight: 10 }} />
                        <Text style={styles.menuText}>Addresses</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons name="card-outline" size={16} color={COLORS.dark} style={{ marginRight: 10 }} />
                        <Text style={styles.menuText}>Payment Methods</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.logoutBtn} onPress={onClose}>
                        <Ionicons name="log-out-outline" size={18} color={COLORS.white} style={{ marginRight: 8 }} />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export const VoiceSearchModal = ({ visible, onClose }) => {
    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { alignItems: 'center', paddingVertical: 40 }]}>
                    <ModalHeader title="Voice Search" onClose={onClose} />

                    <View style={styles.voiceIconContainer}>
                        <Ionicons name="mic" size={50} color={COLORS.primary} />
                    </View>
                    <Text style={styles.listeningText}>Listening...</Text>
                    <Text style={styles.voiceSubText}>Say what you're looking for</Text>

                    <View style={styles.voiceQuote}>
                        <Text style={styles.voiceQuoteText}>"coffee machine"</Text>
                    </View>

                    <TouchableOpacity style={styles.stopBtn} onPress={onClose}>
                        <Text style={styles.stopBtnText}>Stop Listening</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export const CartModal = ({ visible, onClose }) => {
    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { height: '85%' }]}>
                    <ModalHeader title="Your Shopping Cart" onClose={onClose} />

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Empty State */}
                        <View style={styles.emptyCartContainer}>
                            <Ionicons name="cart" size={60} color={COLORS.gray} />
                            <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
                            <Text style={styles.emptyCartSub}>Add some products to get started!</Text>
                            <TouchableOpacity style={styles.startShoppingBtn} onPress={onClose}>
                                <Ionicons name="bag-handle" size={18} color={COLORS.white} style={{ marginRight: 8 }} />
                                <Text style={styles.startShoppingText}>Start Shopping</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Promo Code */}
                        <Text style={styles.sectionTitle}>Promo Code</Text>
                        <View style={styles.promoContainer}>
                            <TextInput
                                style={styles.promoInput}
                                placeholder="Enter promo code"
                                placeholderTextColor={COLORS.gray}
                            />
                            <TouchableOpacity style={styles.applyPromoBtn}>
                                <Text style={styles.applyPromoText}>Apply</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Delivery Options */}
                        <Text style={styles.sectionTitle}>Delivery Options</Text>
                        <View style={styles.radioOptionSelected}>
                            <View style={styles.radioRow}>
                                <View style={styles.radioOuterSelected}>
                                    <View style={styles.radioInnerSelected} />
                                </View>
                                <View style={{ marginLeft: 10, flex: 1 }}>
                                    <Text style={styles.optionTitle}>Standard Delivery</Text>
                                    <Text style={styles.optionSub}>3-5 business days</Text>
                                </View>
                                <Text style={styles.optionPrice}>$5.99</Text>
                            </View>
                        </View>

                        <View style={styles.radioOption}>
                            <View style={styles.radioRow}>
                                <View style={styles.radioOuter} />
                                <View style={{ marginLeft: 10, flex: 1 }}>
                                    <Text style={styles.optionTitle}>Express Delivery</Text>
                                    <Text style={styles.optionSub}>1-2 business days</Text>
                                </View>
                                <Text style={styles.optionPrice}>$12.99</Text>
                            </View>
                        </View>

                        <View style={styles.radioOption}>
                            <View style={styles.radioRow}>
                                <View style={styles.radioOuter} />
                                <View style={{ marginLeft: 10, flex: 1 }}>
                                    <Text style={styles.optionTitle}>Free Delivery</Text>
                                    <Text style={styles.optionSub}>5-7 business days</Text>
                                </View>
                                <Text style={styles.optionPriceFree}>FREE</Text>
                            </View>
                        </View>


                        {/* Payment Method */}
                        <Text style={styles.sectionTitle}>Payment Method</Text>
                        <View style={styles.radioOptionSelected}>
                            <View style={styles.radioRow}>
                                <View style={styles.radioOuterSelected}>
                                    <View style={styles.radioInnerSelected} />
                                </View>
                                <Ionicons name="card" size={24} color={COLORS.primary} style={{ marginLeft: 10, marginRight: 10 }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.optionTitle}>Credit/Debit Card</Text>
                                    <Text style={styles.optionSub}>Pay with card</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.radioOption}>
                            <View style={styles.radioRow}>
                                <View style={styles.radioOuter} />
                                <Ionicons name="logo-paypal" size={24} color="#00457C" style={{ marginLeft: 10, marginRight: 10 }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.optionTitle}>PayPal</Text>
                                    <Text style={styles.optionSub}>Safer, easier way to pay</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.radioOption}>
                            <View style={styles.radioRow}>
                                <View style={styles.radioOuter} />
                                <Ionicons name="logo-google" size={24} color="#EA4335" style={{ marginLeft: 10, marginRight: 10 }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.optionTitle}>Google Pay</Text>
                                    <Text style={styles.optionSub}>Fast checkout</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ height: 20 }} />
                    </ScrollView>

                    <TouchableOpacity style={styles.checkoutBtn}>
                        <Ionicons name="lock-closed" size={18} color={COLORS.white} style={{ marginRight: 8 }} />
                        <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export const SmartSearchModal = ({ visible, onClose }) => {
    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={[styles.centeredView, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
                <View style={[styles.modalView, styles.smartSearchModal]}>
                    <View style={[styles.assistantHeader, { borderBottomWidth: 0, justifyContent: 'space-between', padding: 0, paddingBottom: 10, width: '100%' }]}>
                        <Text style={[styles.assistantTitle, { textAlign: 'left' }]}>AI Smart Search</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color={COLORS.gray} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.robotContainer}>
                        <FontAwesome5 name="robot" size={60} color={COLORS.primary} solid />
                    </View>

                    <Text style={styles.aiTitle}>Describe what you need</Text>
                    <Text style={styles.aiSubtitle}>AI will find the perfect products for you</Text>

                    <View style={styles.aiInputContainer}>
                        <TextInput
                            style={styles.aiInput}
                            placeholder="Example: I need a comfortable office chair under $200..."
                            placeholderTextColor={COLORS.gray}
                            multiline
                            numberOfLines={3}
                        />
                    </View>

                    <TouchableOpacity style={styles.aiSearchBtn}>
                        <Ionicons name="search" size={20} color={COLORS.white} style={{ marginRight: 8 }} />
                        <Text style={styles.aiSearchBtnText}>Search with AI</Text>
                    </TouchableOpacity>

                    <View style={styles.aiExamples}>
                        <Text style={styles.aiExamplesTitle}>AI Search Examples:</Text>
                        <Text style={styles.aiExampleItem}>• "Gifts for my mom's birthday"</Text>
                        <Text style={styles.aiExampleItem}>• "Summer dresses under $30"</Text>
                        <Text style={styles.aiExampleItem}>• "Home office setup on a budget"</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export const AssistantModal = ({ visible, onClose }) => {
    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={[styles.centeredView, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
                <View style={[styles.modalView, styles.assistantModal]}>
                    <View style={styles.assistantHeader}>
                        <Text style={styles.assistantTitle}>AI Shopping Assistant</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color={COLORS.gray} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.chatContainer}>
                        {/* Welcome Message */}
                        <View style={styles.botMessageContainer}>
                            <Text style={styles.botMessageText}>
                                Hello! I'm your AI shopping assistant. How can I help you today?
                            </Text>
                        </View>
                    </View>

                    <View style={styles.chatInputContainer}>
                        <TextInput
                            style={styles.chatInput}
                            placeholder="Ask me anything..."
                            placeholderTextColor={COLORS.gray}
                        />
                        <TouchableOpacity style={styles.chatSendBtn}>
                            <Ionicons name="paper-plane" size={20} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '90%',
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 20,
        ...SHADOWS.medium,
        maxHeight: '90%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.dark,
    },
    content: {
        alignItems: 'center',
    },
    locationIconContainer: {
        marginBottom: 10,
    },
    currentLocation: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.dark,
        marginBottom: 5,
    },
    subText: {
        fontSize: 14,
        color: COLORS.gray,
        marginBottom: 20,
    },
    primaryBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    primaryBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 16,
    },

    // Filter Styles
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.dark,
        marginBottom: 10,
        marginTop: 10,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    tagActive: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    tagText: {
        fontSize: 12,
        color: COLORS.dark,
        fontWeight: '500',
    },
    tagTextActive: {
        fontSize: 12,
        color: COLORS.white,
        fontWeight: 'bold',
    },
    sliderContainer: {
        height: 30,
        justifyContent: 'center',
    },
    sliderTrack: {
        height: 4,
        backgroundColor: '#EEEEEE',
        borderRadius: 2,
        width: '100%',
    },
    sliderFill: {
        height: 4,
        backgroundColor: COLORS.primary,
        borderRadius: 2,
        width: '50%', // Mock value
    },
    sliderThumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        position: 'absolute',
        left: '50%', // Mock value
        marginLeft: -10,
        borderWidth: 2,
        borderColor: COLORS.white,
        ...SHADOWS.small,
    },
    priceLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    priceText: {
        fontSize: 12,
        color: COLORS.gray,
    },
    categoryPills: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
    },
    footerBtns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 15,
    },
    resetBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        alignItems: 'center',
    },
    resetBtnText: {
        color: COLORS.dark,
        fontWeight: 'bold',
    },
    applyBtn: {
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    applyBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },

    // Order Styles
    orderItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderId: {
        fontWeight: 'bold',
        color: COLORS.dark,
        fontSize: 14,
    },
    orderDate: {
        color: COLORS.gray,
        fontSize: 12,
        marginTop: 4,
    },
    orderPrice: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 4,
    },
    orderStatus: {
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'right',
    },
    orderItems: {
        color: COLORS.gray,
        fontSize: 12,
        textAlign: 'right',
        marginTop: 4,
    },

    // Profile Styles
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        ...SHADOWS.medium,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.dark,
    },
    profileEmail: {
        fontSize: 12,
        color: COLORS.gray,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        backgroundColor: '#FAFAFA',
        padding: 15,
        borderRadius: 15,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    statLabel: {
        fontSize: 11,
        color: COLORS.gray,
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        backgroundColor: '#EEEEEE',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
        justifyContent: 'center',
        marginBottom: 5,
    },
    menuText: {
        fontSize: 14,
        color: COLORS.dark,
        fontWeight: '600',
    },
    logoutBtn: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        marginTop: 15,
    },
    logoutText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },

    // Voice Styles
    voiceIconContainer: {
        marginBottom: 20,
    },
    listeningText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.dark,
        marginBottom: 5,
    },
    voiceSubText: {
        color: COLORS.gray,
        fontSize: 14,
        marginBottom: 20,
    },
    voiceQuote: {
        backgroundColor: '#FAFAFA',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 30,
    },
    voiceQuoteText: {
        fontSize: 16,
        color: COLORS.dark,
        fontStyle: 'italic',
    },
    stopBtn: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 40,
        paddingVertical: 12,
        borderRadius: 25,
    },
    stopBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },

    // Assistant Styles
    chatContainer: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },
    botMessage: {
        backgroundColor: COLORS.white,
        padding: 12,
        borderRadius: 12,
        borderTopLeftRadius: 0,
        alignSelf: 'flex-start',
        maxWidth: '80%',
        ...SHADOWS.small,
    },
    botText: {
        fontSize: 14,
        color: COLORS.dark,
        lineHeight: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    chatInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 45,
    },
    sendBtn: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Cart Styles
    emptyCartContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        marginBottom: 20,
    },
    emptyCartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.dark,
        marginTop: 10,
    },
    emptyCartSub: {
        color: COLORS.gray,
        marginTop: 5,
        marginBottom: 15,
    },
    startShoppingBtn: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    startShoppingText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
    promoContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    promoInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: 8,
        paddingHorizontal: 15,
        height: 45,
    },
    applyPromoBtn: {
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    applyPromoText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },

    // Smart Search Styles
    smartSearchModal: {
        padding: 25,
        alignItems: 'center',
    },
    robotContainer: {
        marginBottom: 15,
    },
    aiTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.dark,
        marginBottom: 8,
        textAlign: 'center',
    },
    aiSubtitle: {
        fontSize: 14,
        color: COLORS.gray,
        marginBottom: 25,
        textAlign: 'center',
    },
    aiInputContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#FAFAFA',
    },
    aiInput: {
        textAlignVertical: 'top',
        fontSize: 14,
        color: COLORS.dark,
        minHeight: 120, // Increased height to match screenshot
        paddingTop: 10,
    },
    aiSearchBtn: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        ...SHADOWS.medium,
    },
    aiSearchBtnText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    aiExamples: {
        width: '100%',
        backgroundColor: '#F8F9FA',
        padding: 15,
        borderRadius: 15,
    },
    aiExamplesTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLORS.dark,
    },
    aiExampleItem: {
        color: COLORS.gray,
        marginBottom: 8,
        fontSize: 13,
    },

    // Assistant/Chat Styles
    assistantModal: {
        height: 500, // Fixed height for chat window look
        justifyContent: 'space-between',
        padding: 0, // Remove default padding to handle full width header/footer
    },
    assistantHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    assistantTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.dark,
    },
    chatContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FAFAFA',
    },
    botMessageContainer: {
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: 15,
        borderTopLeftRadius: 0,
        maxWidth: '85%',
        ...SHADOWS.light,
        elevation: 1,
    },
    botMessageText: {
        color: COLORS.dark,
        fontSize: 14,
        lineHeight: 20,
    },
    chatInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
        backgroundColor: COLORS.white,
    },
    chatInput: {
        flex: 1,
        height: 45,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: 25,
        paddingHorizontal: 15,
        backgroundColor: '#FAFAFA',
        marginRight: 10,
        color: COLORS.dark,
    },
    chatSendBtn: {
        width: 45,
        height: 45,
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.small,
    },
    aiExampleItem: {
        color: COLORS.gray,
        marginBottom: 8,
        fontSize: 13,
    },
    radioOption: {
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
    },
    radioOptionSelected: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        backgroundColor: 'rgba(255, 107, 53, 0.05)',
    },
    radioRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.gray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioOuterSelected: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInnerSelected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.primary,
    },
    optionTitle: {
        fontWeight: 'bold',
        color: COLORS.dark,
        fontSize: 14,
    },
    optionSub: {
        color: COLORS.gray,
        fontSize: 11,
    },
    optionPrice: {
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    optionPriceFree: {
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    checkoutBtn: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 12,
        marginTop: 10,
    },
    checkoutBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
