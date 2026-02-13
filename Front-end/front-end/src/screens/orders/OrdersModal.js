import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

const MOCK_ORDERS = [
    { id: '1', number: '#ORD-3122', date: 'Dec 20, 2025', status: 'Delivered', total: 45.99, items: 2 },
    { id: '2', number: '#ORD-3120', date: 'Dec 15, 2025', status: 'Processing', total: 129.50, items: 1 },
    { id: '3', number: '#ORD-3115', date: 'Nov 28, 2025', status: 'Cancelled', total: 14.99, items: 3 },
];

export default function OrdersScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Orders</Text>
            </View>

            <FlatList
                data={MOCK_ORDERS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.orderCard}>
                        <View style={styles.orderHeader}>
                            <Text style={styles.orderNumber}>{item.number}</Text>
                            <Text style={styles.orderDate}>{item.date}</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.orderDetails}>
                            <View>
                                <Text style={styles.detailLabel}>Quantity</Text>
                                <Text style={styles.detailValue}>{item.items} Items</Text>
                            </View>
                            <View>
                                <Text style={styles.detailLabel}>Total Amount</Text>
                                <Text style={styles.detailValue}>${item.total.toFixed(2)}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.detailLabel}>Status</Text>
                                <Text style={[
                                    styles.status,
                                    item.status === 'Delivered' ? { color: COLORS.success } :
                                        item.status === 'Cancelled' ? { color: COLORS.danger } :
                                            { color: COLORS.accent }
                                ]}>{item.status}</Text>
                            </View>
                        </View>

                        <View style={styles.actionRow}>
                            <TouchableOpacity style={styles.detailsBtn}>
                                <Text style={styles.detailsBtnText}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    list: {
        padding: SIZES.padding,
    },
    orderCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        marginBottom: 15,
        padding: 15,
        elevation: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderNumber: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    orderDate: {
        color: COLORS.gray,
        fontSize: 12,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.light,
        marginVertical: 12,
    },
    orderDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    detailLabel: {
        fontSize: 10,
        color: COLORS.gray,
        marginBottom: 2,
    },
    detailValue: {
        fontWeight: '600',
        fontSize: 14,
    },
    status: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    detailsBtn: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
    },
    detailsBtnText: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: 'bold',
    },
});
