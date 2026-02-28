import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/colors";
import { commonStyles } from "../../assets/styles/common.styles";
import { homeStyles } from "../../assets/styles/home.styles";
import QuickActions from "../../components/QuickActions";

import { useUser } from "@clerk/clerk-expo";
import useTransactionStore from "../../store/useTransactionStore";

// Helper function to create darker shade for gradient
const darkenColor = (color, percent = 20) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
    const B = Math.max(0, (num & 0x0000ff) - amt);
    return (
        "#" +
        (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)
    );
};

const HomePage = () => {
    const router = useRouter();
    const { user } = useUser();
    const [refreshing, setRefreshing] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(false);

    const { transactions, stats, isLoading, fetchTransactions } = useTransactionStore();

    // Quick Actions for Home Page
    const quickActions = [
        {
            icon: "add-circle",
            label: "Add Income",
            color: COLORS.primary,
            onPress: () => router.push("/(modals)/add-income"),
        },
        {
            icon: "remove-circle",
            label: "Add Expense",
            color: COLORS.secondary,
            onPress: () => router.push("/(modals)/add-expense"),
        },
        {
            icon: "stats-chart",
            label: "View Reports",
            color: "#10B981",
            onPress: () => router.push("/overview"),
        },
        {
            icon: "card",
            label: "My Cards",
            color: "#8B5CF6",
            onPress: () => router.push("/mycards"),
        },
        {
            icon: "settings",
            label: "Settings",
            color: "#F59E0B",
            onPress: () => router.push("/(modals)/settings"),
        },
        {
            icon: "notifications",
            label: "Notifications",
            color: "#EF4444",
            onPress: () => router.push("/(modals)/notifications"),
        },
    ];

    const onRefresh = async () => {
        setRefreshing(true);
        if (user) {
            await fetchTransactions(user.id);
        }
        setRefreshing(false);
    };

    useEffect(() => {
        if (user) {
            fetchTransactions(user.id);
        }
    }, [user]);

    // Navigation handlers
    const handleNavigateToNotifications = () => {
        router.push("/(modals)/notifications");
    };

    if (isLoading && transactions.length === 0) {
        return (
            <View style={commonStyles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <>
            <ScrollView
                style={commonStyles.container}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* Header */}
                <View style={commonStyles.header}>
                    <TouchableOpacity
                        style={commonStyles.headerIcon}
                        onPress={() => setShowQuickActions(true)}
                    >
                        <Ionicons name="menu" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text style={{
                        fontFamily: "NimbusReg",
                        fontSize: 28,
                        fontWeight: "bold",
                        color: COLORS.text,
                        textAlign: "center",
                    }}>Home</Text>
                    <View style={{ width: 24 }} />
                </View >

                {/* Balance Card */}
                <LinearGradient
                    colors={[COLORS.primary, darkenColor(COLORS.primary, 20)]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={homeStyles.balanceCard}
                >
                    <View style={homeStyles.balanceHeader}>
                        <View style={homeStyles.balanceLabelContainer}>
                            <Text style={homeStyles.balanceLabel}>Total Balance</Text>
                            <Ionicons name="chevron-down" size={16} color={COLORS.white} />
                        </View>
                        <TouchableOpacity>
                            <Ionicons
                                name="ellipsis-horizontal"
                                size={24}
                                color={COLORS.white}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={homeStyles.balanceAmount}>
                        ${stats.totalBalance.toFixed(2)}
                    </Text>

                    <View style={homeStyles.balanceDetails}>
                        <View style={homeStyles.balanceItem}>
                            <View style={homeStyles.iconContainer}>
                                <Ionicons name="arrow-down" size={16} color={COLORS.white} />
                            </View>
                            <View>
                                <Text style={homeStyles.balanceItemLabel}>Income</Text>
                                <Text style={homeStyles.balanceItemAmount}>
                                    ${stats.income.toFixed(2)}
                                </Text>
                            </View>
                        </View>

                        <View style={homeStyles.balanceItem}>
                            <View style={homeStyles.iconContainer}>
                                <Ionicons name="arrow-up" size={16} color={COLORS.white} />
                            </View>
                            <View>
                                <Text style={homeStyles.balanceItemLabel}>Expenses</Text>
                                <Text style={homeStyles.balanceItemAmount}>
                                    ${stats.expenses.toFixed(2)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                {/* Transactions Section */}
                <View style={homeStyles.transactionsSection}>
                    <View style={commonStyles.sectionHeader}>
                        <Text style={commonStyles.sectionTitle}>Transactions</Text>
                        <TouchableOpacity>
                            <Text style={commonStyles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {transactions.length === 0 ? (
                        <View style={{
                            padding: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.card,
                            borderRadius: 20,
                            marginTop: 10,
                            borderWidth: 1,
                            borderColor: COLORS.border,
                            borderStyle: 'dashed'
                        }}>
                            <View style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                backgroundColor: COLORS.primary + '10',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 16
                            }}>
                                <Ionicons name="receipt-outline" size={40} color={COLORS.primary} />
                            </View>
                            <Text style={{
                                color: COLORS.text,
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginBottom: 8,
                                textAlign: 'center'
                            }}>No transactions yet</Text>
                            <Text style={{
                                color: COLORS.textLight,
                                fontSize: 14,
                                textAlign: 'center',
                                marginBottom: 24,
                                lineHeight: 20
                            }}>Start tracking your expenses and income to see them here.</Text>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: COLORS.primary,
                                    paddingVertical: 12,
                                    paddingHorizontal: 24,
                                    borderRadius: 12,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                                onPress={() => setShowQuickActions(true)}
                            >
                                <Ionicons name="add" size={20} color={COLORS.white} style={{ marginRight: 8 }} />
                                <Text style={{ color: COLORS.white, fontWeight: '600' }}>Add Transaction</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        transactions.map((transaction) => {
                            const isExpense = transaction.type === "expense";
                            const amount = parseFloat(transaction.amount);

                            // Map backend icons or use defaults
                            const icon = isExpense ? "remove-circle" : "add-circle";
                            const color = isExpense ? COLORS.secondary : COLORS.primary;

                            return (
                                <TouchableOpacity
                                    key={transaction.id}
                                    style={commonStyles.transactionItem}
                                    activeOpacity={0.7}
                                >
                                    <View style={commonStyles.transactionLeft}>
                                        <View
                                            style={[
                                                commonStyles.transactionIcon,
                                                { backgroundColor: color + "15" },
                                            ]}
                                        >
                                            <Ionicons
                                                name={icon}
                                                size={24}
                                                color={color}
                                            />
                                        </View>
                                        <View>
                                            <Text style={commonStyles.transactionType}>
                                                {transaction.title}
                                            </Text>
                                            <Text style={commonStyles.transactionTime}>
                                                {new Date(transaction.date).toLocaleDateString()}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text
                                        style={[
                                            commonStyles.transactionAmount,
                                            !isExpense
                                                ? commonStyles.positiveAmount
                                                : commonStyles.negativeAmount,
                                        ]}
                                    >
                                        {!isExpense ? "+" : "-"}$
                                        {Math.abs(amount).toFixed(2)}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })
                    )}
                </View>
            </ScrollView>

            {/* Quick Actions Bottom Sheet */}
            <QuickActions
                visible={showQuickActions}
                onClose={() => setShowQuickActions(false)}
                actions={quickActions}
            />
        </>
    );
};

export default HomePage;
