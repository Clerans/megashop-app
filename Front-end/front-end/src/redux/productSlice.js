import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../api/client';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await client.get('/products');
    return response.data;
});

const initialState = {
    products: [],
    filteredProducts: [],
    status: 'idle',
    error: null,
    activeCategory: 'All',
    sortBy: 'relevance', // relevance, price-low, price-high, rating, newest
    filters: {
        minPrice: 0,
        maxPrice: 10000,
        rating: 0,
        freeShipping: false,
    },
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.activeCategory = action.payload;
            state.filteredProducts = applyFilters(state);
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
            state.filteredProducts = applyFilters(state);
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            state.filteredProducts = applyFilters(state);
        },
        setPriceRange: (state, action) => {
            state.filters.minPrice = action.payload.min;
            state.filters.maxPrice = action.payload.max;
            state.filteredProducts = applyFilters(state);
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
            state.activeCategory = 'All';
            state.sortBy = initialState.sortBy;
            state.filteredProducts = applyFilters(state);
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const backendData = action.payload.data || [];
                state.products = backendData.map(item => ({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    category: item.category,
                    price: Number(item.price),
                    originalPrice: item.original_price ? Number(item.original_price) : null,
                    rating: Number(item.rating),
                    reviewCount: item.review_count,
                    reviews: item.review_count,
                    soldCount: item.sold_count,
                    badges: item.badges || [],
                    image: item.images && item.images.length > 0 ? item.images[0] : null,
                    images: item.images || [],
                    delivery: item.delivery_info,
                    colors: item.colors || [],
                    sizes: item.sizes || [],
                    seller: item.seller,
                    created_at: item.created_at // Assuming backend provides this or we mock it
                }));
                state.filteredProducts = applyFilters(state);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

// Helper to apply all filters
const applyFilters = (state) => {
    let result = [...state.products];

    // Category
    if (state.activeCategory !== 'All') {
        const lowerCategory = state.activeCategory.toLowerCase();
        result = result.filter(p =>
            p.category && (p.category === state.activeCategory || p.category.name === state.activeCategory || p.category.toLowerCase() === lowerCategory)
        );
    }

    // Price
    result = result.filter(
        p => p.price >= state.filters.minPrice && p.price <= state.filters.maxPrice
    );

    // Rating
    if (state.filters.rating > 0) {
        result = result.filter(p => (p.rating || 0) >= state.filters.rating);
    }

    // Sorting
    switch (state.sortBy) {
        case 'price-low':
            result.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            result.sort((a, b) => b.price - a.price);
            break;
        case 'rating': // or 'Top Rated'
        case 'Top Rated':
            result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
        case 'newest':
        case 'Newest':
            // Mock newest by id desc if no date
            result.sort((a, b) => b.id - a.id);
            break;
        case 'relevance':
        default:
            // Default sort (e.g. by id or original order)
            result.sort((a, b) => a.id - b.id);
            break;
    }

    return result;
};

export const { setCategory, setSortBy, setFilters, setPriceRange, resetFilters } = productSlice.actions;

export const selectAllProducts = (state) => state.products.products;
export const selectFilteredProducts = (state) => state.products.filteredProducts;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;

export default productSlice.reducer;
