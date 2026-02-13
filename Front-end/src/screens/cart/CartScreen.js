import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../../redux/cartSlice';

export default function CartScreen({ navigation }) {
    const { items, totalAmount } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [deliveryOption, setDeliveryOption] = useState('Standard');
    const [paymentMethod, setPaymentMethod] = useState('Card');

    const getDeliveryPrice = () => {
        switch (deliveryOption) {
            case 'Standard': return 5.99;
            case 'Express': return 12.99;
            case 'Free': return 0;
            default: return 0;
        }
    };

    const deliveryPrice = getDeliveryPrice();
    const finalTotal = totalAmount + deliveryPrice;

    const renderRadioOption = (title, sub, price, value, selectedValue, onSelect, isPayment = false, icon = null) => {
        const isSelected = value === selectedValue;
        return (
            <TouchableOpacity
                style={isSelected ? styles.radioOptionSelected : styles.radioOption}
                onPress={() => onSelect(value)}
                activeOpacity={0.8}
            >
                <View style={styles.radioRow}>
                    <View style={isSelected ? styles.radioOuterSelected : styles.radioOuter}>
                        {isSelected && <View style={styles.radioInnerSelected} />}
                    </View>

                    {icon && <Ionicons name={icon.name} size={24} color={icon.color} style={{ marginLeft: 10, marginRight: 10 }} />}

                    <View style={{ marginLeft: icon ? 0 : 10, flex: 1 }}>
                        <Text style={styles.optionTitle}>{title}</Text>
                        <Text style={styles.optionSub}>{sub}</Text>
                    </View>

                    {!isPayment && (
                        <Text style={price === 'FREE' ? styles.optionPriceFree : styles.optionPrice}>
                            {price === 'FREE' ? 'FREE' : `$${price}`}
                        </Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Your Shopping Cart</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={24} color={COLORS.gray} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Empty State / Cart Content */}
                {items.length === 0 ? (
                    <View style={styles.emptyCartContainer}>
                        <Ionicons name="cart" size={60} color={COLORS.gray} />
                        <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
                        <Text style={styles.emptyCartSub}>Add some products to get started!</Text>
                        <TouchableOpacity style={styles.startShoppingBtn} onPress={() => navigation.navigate('Home')}>
                            <Ionicons name="bag-handle" size={18} color={COLORS.white} style={{ marginRight: 8 }} />
                            <Text style={styles.startShoppingText}>Start Shopping</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        {/* Cart Items List Preview (Optional - user wanted exact design which implied just the options, but functional cart usually shows items. 
                           I'll stick to the EXACT design requested: Promo -> Delivery -> Payment, but I'll add a small summary text if needed or just keep it as the form.)
                           Actually, standard cart screens usually list items. The screenshot showed the BOTTOM part of a cart or a cart modal. 
                           To be safe and functional, I should probably show the items, but the user was very specific about "exact like this".
                           "This" image shows: Empty Cart OR (implied) Options.
                           BUT, the user just said "in this cart screen i cant select...". 
                           I will keep the list HIDDEN to match the screenshot 'look' if that's what they want, 
                           OR I really should render the items. 
                           Given the "Empty Cart" text in the screenshot is visible, it implies the screenshot IS the empty state version OR the form version.
                           I will implement the form version as the primary view when items exist.
                        */}
                    </>
                )}

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
                {renderRadioOption('Standard Delivery', '3-5 business days', '5.99', 'Standard', deliveryOption, setDeliveryOption)}
                {renderRadioOption('Express Delivery', '1-2 business days', '12.99', 'Express', deliveryOption, setDeliveryOption)}
                {renderRadioOption('Free Delivery', '5-7 business days', 'FREE', 'Free', deliveryOption, setDeliveryOption)}

                {/* Payment Method */}
                <Text style={styles.sectionTitle}>Payment Method</Text>
                {renderRadioOption('Credit/Debit Card', 'Pay with card', null, 'Card', paymentMethod, setPaymentMethod, true, { name: 'card', color: COLORS.primary })}
                {renderRadioOption('PayPal', 'Safer, easier way to pay', null, 'PayPal', paymentMethod, setPaymentMethod, true, { name: 'logo-paypal', color: '#00457C' })}
                {renderRadioOption('Google Pay', 'Fast checkout', null, 'GooglePay', paymentMethod, setPaymentMethod, true, { name: 'logo-google', color: '#EA4335' })}

                {/* Order Summary (for functional completeness) */}
                <View style={styles.summaryContainer}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>${totalAmount.toFixed(2)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Shipping</Text>
                        <Text style={styles.summaryValue}>${deliveryPrice === 0 ? 'Free' : deliveryPrice.toFixed(2)}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryTotalLabel}>Total</Text>
                        <Text style={styles.summaryTotalValue}>${finalTotal.toFixed(2)}</Text>
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.checkoutBtn} onPress={() => dispatch(clearCart())}>
                    <Ionicons name="lock-closed" size={18} color={COLORS.white} style={{ marginRight: 8 }} />
                    <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
                </TouchableOpacity>
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
        padding: 20,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.dark,
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
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
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.dark,
        marginBottom: 10,
        marginTop: 10,
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
        backgroundColor: COLORS.secondary, // Teal from screenshot
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 8,
        height: 45,
    },
    applyPromoText: {
        color: COLORS.white,
        fontWeight: 'bold',
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
        color: COLORS.success,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    checkoutBtn: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 12,
    },
    checkoutBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    summaryContainer: {
        backgroundColor: '#FAFAFA',
        padding: 15,
        borderRadius: 12,
        marginTop: 10,
        marginBottom: 20,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryLabel: {
        color: COLORS.gray,
        fontSize: 14,
    },
    summaryValue: {
        color: COLORS.dark,
        fontWeight: '600',
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginVertical: 10,
    },
    summaryTotalLabel: {
        color: COLORS.dark,
        fontWeight: 'bold',
        fontSize: 16,
    },
    summaryTotalValue: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 18,
    },
});
