import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

import { Ionicons } from '@expo/vector-icons';
import CategoryItem from '../../components/CategoryItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectAllCategories, getCategoriesStatus } from '../../redux/categorySlice';
import { setCategory } from '../../redux/productSlice';

// Map backend category names to local images (since backend might not return images yet)
const CATEGORY_IMAGES = {
    'Electronics': 'https://i3.wp.com/img.freepik.com/premium-photo/modern-minimalist-tech-accessories-white-background-young-professionals_960396-868234.jpg?ga=GA1.1.862615335.1720693316&semt=ais_hybrid&w=1068&resize=1068,0&ssl=1',
    'Beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    'Fashion': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
    'Home': 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400',
    'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
    'Toys': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400',
    'Books': 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
    'Groceries': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
    'default': 'https://images.unsplash.com/photo-1472851294608-41552241e2cd?w=400'
};

export default function CategoriesScreen({ navigation }) {
    const dispatch = useDispatch();
    const categories = useSelector(selectAllCategories);
    const status = useSelector(getCategoriesStatus);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories());
        }
    }, [status, dispatch]);

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCategoryPress = (item) => {
        // Update Redux state directly as well, just in case
        dispatch(setCategory(item.name));
        // Navigate to Home with params to trigger the effect in HomeScreen
        navigation.navigate('Home', { screen: 'ProductList', params: { category: item.name } });
    };

    const renderCategory = ({ item }) => (
        <CategoryItem
            category={item}
            variant="card"
            onPress={() => handleCategoryPress(item)}
            image={CATEGORY_IMAGES[item.name] || CATEGORY_IMAGES.default}
        />
    );

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.headerTop}>
                <View style={styles.logoRow}>
                    <Ionicons name="bag-handle" size={24} color={COLORS.white} />
                    <Text style={styles.logoText}>MegaShop</Text>
                </View>
                <View style={styles.headerIcons}>
                    <Ionicons name="location-outline" size={24} color={COLORS.white} style={styles.icon} />
                    <Ionicons name="notifications-outline" size={24} color={COLORS.white} style={styles.icon} />
                    <Ionicons name="heart-outline" size={24} color={COLORS.white} style={styles.icon} />
                    <Ionicons name="person-outline" size={24} color={COLORS.white} />
                </View>
            </View>

            {/* Promo Banner inside Header */}
            <View style={styles.promoBanner}>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                        <Ionicons name="car" size={16} color="#FFD700" />
                        <Text style={styles.promoTitle}> FREE SHIPPING</Text>
                    </View>
                    <Text style={styles.promoSubtitle}>Special for you • No minimum purchase</Text>
                </View>
                <View style={styles.guaranteeBadge}>
                    <Text style={styles.guaranteeText}>Delivery Guarantee</Text>
                </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color={COLORS.gray} style={styles.searchIcon} />
                <TextInput
                    placeholder="coffee machine"
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <View style={styles.searchActions}>
                    <TouchableOpacity style={styles.micBtn}>
                        <Ionicons name="mic" size={20} color={COLORS.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botBtn}>
                        <Ionicons name="happy" size={20} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderQuickFilters = () => (
        <View style={styles.quickFilters}>
            <QuickFilterIcon icon="trophy" label="Best-Selling" color="#FF6B35" />
            <QuickFilterIcon icon="star" label="5-Star Rated" color="#FF6B35" />
            <QuickFilterIcon icon="flash" label="New In" color="#FF6B35" />
            <QuickFilterIcon icon="grid" label="Categories" color="#FF6B35" />
            <QuickFilterIcon icon="funnel" label="Filters" color="#FF6B35" />
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}

            <View style={styles.contentContainer}>
                {renderQuickFilters()}

                <View style={styles.listHeader}>
                    <Text style={styles.sectionTitle}>All Categories</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.backLink}>Back to Home</Text>
                    </TouchableOpacity>
                </View>

                {status === 'loading' ? (
                    <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
                ) : (
                    <FlatList
                        data={filteredCategories}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2}
                        renderItem={renderCategory}
                        columnWrapperStyle={styles.row}
                        contentContainerStyle={styles.list}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </View>
    );
}

const QuickFilterIcon = ({ icon, label, color }) => (
    <TouchableOpacity style={styles.quickFilterItem}>
        <View style={[styles.iconCircle, { backgroundColor: '#FFF0E6' }]}>
            <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={styles.quickFilterLabel}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    headerContainer: {
        backgroundColor: '#FF6B35', // Orange background
        paddingTop: 50, // Safe area approximation
        paddingHorizontal: SIZES.padding,
        paddingBottom: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 8,
    },
    headerIcons: {
        flexDirection: 'row',
    },
    icon: {
        marginRight: 15,
    },
    promoBanner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
    },
    promoTitle: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 14,
    },
    promoSubtitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 11,
    },
    guaranteeBadge: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    guaranteeText: {
        color: '#FF6B35',
        fontWeight: 'bold',
        fontSize: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 50,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        color: COLORS.dark,
    },
    searchActions: {
        flexDirection: 'row',
        gap: 8,
    },
    micBtn: {
        backgroundColor: '#00897B', // Teal color
        padding: 6,
        borderRadius: 20,
    },
    botBtn: {
        backgroundColor: '#00897B',
        padding: 6,
        borderRadius: 20,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: SIZES.padding,
    },
    quickFilters: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        marginBottom: 10,
    },
    quickFilterItem: {
        alignItems: 'center',
        width: 60,
    },
    iconCircle: {
        width: 45,
        height: 45,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    quickFilterLabel: {
        fontSize: 10,
        color: COLORS.dark,
        textAlign: 'center',
        fontWeight: '500',
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.dark,
    },
    backLink: {
        color: '#FF6B35',
        fontWeight: 'bold',
        fontSize: 14,
    },
    list: {
        paddingBottom: 20,
    },
    row: {
        justifyContent: 'space-between',
    },
});
