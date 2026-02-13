import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import Header from '../../components/Header';
import ProductCard from './ProductCard';
import CategoryItem from '../../components/CategoryItem';
import FloatingAssistant from '../../components/FloatingAssistant';
import { LocationModal, WishlistModal, FilterModal, OrdersModal, ProfileModal, VoiceSearchModal, AssistantModal, SmartSearchModal, CartModal } from '../../components/ActionModals';
import { CATEGORIES } from '../../data/mockData';
import { fetchProducts, selectFilteredProducts, getProductsStatus, getProductsError, setCategory, setSortBy, setFilters } from '../../redux/productSlice';
import { fetchCategories, selectAllCategories, getCategoriesStatus } from '../../redux/categorySlice';

export default function HomeScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const products = useSelector(selectFilteredProducts); // Use filtered products
    const productStatus = useSelector(getProductsStatus);
    const productError = useSelector(getProductsError);

    // Category State
    const categories = useSelector(selectAllCategories);
    const categoryStatus = useSelector(getCategoriesStatus);

    const [locationVisible, setLocationVisible] = useState(false);
    const [wishlistVisible, setWishlistVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);
    const [ordersVisible, setOrdersVisible] = useState(false);
    const [profileVisible, setProfileVisible] = useState(false);
    const [voiceVisible, setVoiceVisible] = useState(false);
    const [assistantVisible, setAssistantVisible] = useState(false);
    const [smartSearchVisible, setSmartSearchVisible] = useState(false);
    const [cartVisible, setCartVisible] = useState(false);

    // Get active filters from Redux for UI feedback if needed
    const activeCategory = useSelector(state => state.products.activeCategory);
    const sortBy = useSelector(state => state.products.sortBy);

    // Fetch Products & Categories on mount
    useEffect(() => {
        if (productStatus === 'idle') {
            dispatch(fetchProducts());
        }
        if (categoryStatus === 'idle') {
            dispatch(fetchCategories());
        }
    }, [productStatus, categoryStatus, dispatch]);

    // Handle Navigation Params (e.g. from CategoriesScreen)
    useEffect(() => {
        if (route.params?.category) {
            // If passed a category param, update the filter
            // Import action dynamically or use the one we have if we imported it
            // We need to import setCategory action
            dispatch(setCategory(route.params.category));
            // clear params to avoid stuck state?
            navigation.setParams({ category: undefined });
        }
    }, [route.params?.category, dispatch, navigation]);

    // Import Actions
    // Note: We need to import these at the top level

    // Memoized Navigation Handler
    const handleProductPress = useCallback((item) => {
        navigation.navigate('ProductDetail', { product: item });
    }, [navigation]);

    // Memoized Render Item
    const renderProductItem = useCallback(({ item }) => (
        <ProductCard
            product={item}
            onPress={handleProductPress}
        />
    ), [handleProductPress]);

    const renderHeader = () => (
        <View>
            {/* Quick Actions - Map to Redux Filters */}
            <View style={styles.quickActions}>
                <QuickAction icon="trophy" label="Best-Selling" onPress={() => dispatch(setSortBy('best-selling'))} />
                <QuickAction icon="star" label="5-Star" onPress={() => dispatch(setFilters({ rating: 5 }))} />
                <QuickAction icon="flash" label="New In" onPress={() => dispatch(setSortBy('newest'))} />
                <QuickAction icon="grid" label="Categories" onPress={() => navigation.navigate('Categories')} />
                <QuickAction icon="funnel" label="Filters" onPress={() => setFilterVisible(true)} />
            </View>

            {/* Delivery Info */}
            <View style={styles.deliveryInfo}>
                <View style={styles.deliveryHeader}>
                    <Ionicons name="bus" size={20} color={COLORS.white} />
                    <Text style={styles.deliveryTitle}>Delivery Guarantee</Text>
                </View>
                <View style={styles.deliveryFeatures}>
                    <DeliveryFeature icon="cube" title="Free Shipping" desc="On all orders" />
                    <DeliveryFeature icon="shield-checkmark" title="100% Refund" desc="For any issues" />
                    <DeliveryFeature icon="time" title="Fast Delivery" desc="2-4 days avg" />
                </View>
            </View>

            {/* Best Selling Header */}
            <SectionHeader title={activeCategory === 'All' ? "All Products" : activeCategory} onSeeAll={() => { }} />

            {/* Filter Pills - Horizontal List */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
                <TouchableOpacity
                    style={[styles.filterPill, activeCategory === 'All' ? styles.filterPillActive : null]}
                    onPress={() => dispatch(setCategory('All'))}
                >
                    <Text style={[styles.filterText, activeCategory === 'All' ? styles.filterTextActive : null]}>All</Text>
                </TouchableOpacity>
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat.id}
                        style={[
                            styles.filterPill,
                            activeCategory === cat.name ? styles.filterPillActive : null
                        ]}
                        onPress={() => dispatch(setCategory(cat.name))}
                    >
                        <Text style={[
                            styles.filterText,
                            activeCategory === cat.name ? styles.filterTextActive : null
                        ]}>{cat.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    if (productStatus === 'loading' || categoryStatus === 'loading') {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (productStatus === 'failed') {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
                <Ionicons name="alert-circle-outline" size={60} color={COLORS.danger} />
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, color: COLORS.dark }}>Failed to load products</Text>
                <Text style={{ textAlign: 'center', color: COLORS.gray, marginVertical: 10 }}>{productError}</Text>
                <TouchableOpacity
                    style={{ backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 }}
                    onPress={() => dispatch(fetchProducts())}
                >
                    <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header
                onProfile={() => setProfileVisible(true)}
                onCart={() => setCartVisible(true)}
                onLocation={() => setLocationVisible(true)}
                onWishlist={() => setWishlistVisible(true)}
                onVoice={() => setVoiceVisible(true)}
                onAssistant={() => setSmartSearchVisible(true)}
            />

            <FlatList
                data={products}
                numColumns={2}
                keyExtractor={item => item.id.toString()}
                renderItem={renderProductItem}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={() => (
                    <View>
                        <SectionHeader title="Shop Categories" onSeeAll={() => navigation.navigate('Categories')} />
                        <View style={styles.categoriesGrid}>
                            {categories.map(cat => {
                                const icons = {
                                    'Electronics': 'desktop-outline',
                                    'Beauty': 'flower-outline',
                                    'Fashion': 'shirt-outline',
                                    'Home': 'home-outline',
                                    'Sports': 'barbell-outline',
                                    'Toys': 'game-controller-outline',
                                    'Books': 'book-outline',
                                    'Groceries': 'basket-outline',
                                };
                                return (
                                    <CategoryItem
                                        key={cat.id}
                                        category={{ ...cat, icon: icons[cat.name] || 'grid-outline' }}
                                        onPress={() => dispatch(setCategory(cat.name))}
                                    />
                                );
                            })}
                        </View>
                    </View>
                )}
            />

            <FloatingAssistant onPress={() => setAssistantVisible(true)} />

            {/* Modals */}
            <LocationModal visible={locationVisible} onClose={() => setLocationVisible(false)} />
            <WishlistModal visible={wishlistVisible} onClose={() => setWishlistVisible(false)} />
            <FilterModal visible={filterVisible} onClose={() => setFilterVisible(false)} />
            <OrdersModal visible={ordersVisible} onClose={() => setOrdersVisible(false)} />
            <ProfileModal
                visible={profileVisible}
                onClose={() => setProfileVisible(false)}
                onOpenOrders={() => setOrdersVisible(true)}
            />
            <VoiceSearchModal visible={voiceVisible} onClose={() => setVoiceVisible(false)} />
            <SmartSearchModal visible={smartSearchVisible} onClose={() => setSmartSearchVisible(false)} />
            <AssistantModal visible={assistantVisible} onClose={() => setAssistantVisible(false)} />
            <CartModal visible={cartVisible} onClose={() => setCartVisible(false)} />
        </View>
    );
}

// Sub-components for Home
const QuickAction = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.actionItem} onPress={onPress}>
        <View style={styles.actionIcon}>
            <Ionicons name={icon} size={20} color={COLORS.primary} />
        </View>
        <Text style={styles.actionText}>{label}</Text>
    </TouchableOpacity>
);

const DeliveryFeature = ({ icon, title, desc }) => (
    <View style={styles.feature}>
        <Ionicons name={icon} size={18} color={COLORS.accent} style={{ marginBottom: 5 }} />
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDesc}>{desc}</Text>
    </View>
);

const SectionHeader = ({ title, onSeeAll }) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={onSeeAll}>
            <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    listContent: {
        paddingBottom: 20,
        paddingHorizontal: SIZES.padding,
    },
    row: {
        justifyContent: 'space-between',
    },
    promoBanner: {
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        borderRadius: SIZES.radius,
        padding: 12,
        marginTop: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 107, 53, 0.2)',
    },
    promoContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    promoTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    promoSubtitle: {
        fontSize: 11,
        color: COLORS.dark,
    },
    guaranteeBadge: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    guaranteeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: SIZES.radius,
        marginBottom: 15,
        ...SHADOWS.light,
    },
    actionItem: {
        alignItems: 'center',
    },
    actionIcon: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.light,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        position: 'relative'
    },
    actionText: {
        fontSize: 10,
        fontWeight: '500',
        color: COLORS.dark,
    },
    deliveryInfo: {
        backgroundColor: COLORS.secondary, // Or gradient if needed
        borderRadius: SIZES.radius,
        padding: 15,
        marginBottom: 20,
    },
    deliveryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 15,
    },
    deliveryTitle: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    deliveryFeatures: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    feature: {
        alignItems: 'center',
    },
    featureTitle: {
        color: COLORS.white,
        fontSize: 11,
        fontWeight: 'bold',
    },
    featureDesc: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 9,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.dark,
    },
    seeAll: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: '500',
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    filterContainer: {
        paddingVertical: 5,
        marginBottom: 15,
        gap: 10,
    },
    filterPill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        marginRight: 8,
    },
    filterPillActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    filterText: {
        fontSize: 13,
        color: COLORS.text,
        fontWeight: '500',
    },
    filterTextActive: {
        color: COLORS.white,
    },
});
