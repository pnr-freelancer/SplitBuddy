import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import moment from 'moment'; // Import moment for duration calculation

interface TransactionsWidgetProps {
    expenses: Expense[];
    getCategoryName: (categoryId: string) => string;
    getPaymentMethodName: (paymentMethodId: string) => string;
}

const TransactionsWidget: React.FC<TransactionsWidgetProps> = ({ expenses, getCategoryName, getPaymentMethodName }) => {
    return (
        <View>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Last Transaction</Text>
                <Text style={styles.seeAll}>See all</Text>
            </View>

            <FlatList
                data={expenses}
                renderItem={({ item }) => {
                    const duration = moment(item.date).fromNow(); // Calculate duration using moment

                    return (
                        <View style={styles.transactionItem}>
                            <Avatar.Icon icon="receipt" size={48} style={styles.transactionIcon} />
                            <View style={styles.transactionDetails}>
                                <Text style={styles.transactionDescription}>{item.description}</Text>
                                <Text style={styles.transactionCategory}>{getCategoryName(item.category)}</Text>
                            </View>
                            <View style={styles.transactionAmountContainer}>
                                <Text style={styles.transactionTime}>{duration}</Text>
                                <Text style={styles.transactionAmount}>₹{item.amount.toFixed(2)}</Text>
                                <Text style={styles.transactionPaymentMethod}>{getPaymentMethodName(item.paymentMethod)}</Text>
                            </View>
                        </View>
                    );
                }}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    seeAll: {
        fontSize: 16,
        color: '#6200EE',
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 5,
        elevation: 2,
    },
    transactionIcon: {
        backgroundColor: '#E3E1F0',
    },
    transactionDetails: {
        flex: 1,
        marginLeft: 10,
    },
    transactionDescription: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    transactionCategory: {
        fontSize: 14,
        color: '#757575',
    },
    transactionAmountContainer: {
        alignItems: 'flex-end',
    },
    transactionTime: {
        fontSize: 12,
        color: '#757575',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    transactionPaymentMethod: {
        fontSize: 14,
        color: '#757575',
    },
});

export default TransactionsWidget;