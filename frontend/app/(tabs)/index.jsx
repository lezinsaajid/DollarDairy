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

import { useTransactions } from "../../api/queries";
import { useResponsive } from "../../hooks/useResponsive";

const HomePage = () => {
    const router = useRouter();
    const { user } = useUser();
    const { isDesktop } = useResponsive();
    const [refreshing, setRefreshing] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(false);

    const { data: transactions = [], isLoading, refetch } = useTransactions();

    // ... existing stats calculation ...
    const stats = transactions.reduce((acc, t) => {
        const amount = parseFloat(t.amount);
        if (t.type === 'income') acc.income += amount;
        else acc.expenses += amount;
        acc.totalBalance = acc.income - acc.expenses;
        return acc;
    }, { totalBalance: 0, income: 0, expenses: 0 });

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const quickActions = [
        { icon: "add-circle", label: "Add Expense", color: COLORS.secondary, onPress: () => router.push("/(modals)/add-expense") },
        { icon: "add-circle", label: "Add Income", color: COLORS.primary, onPress: () => router.push("/(modals)/add-income") },
        { icon: "calendar", label: "Overview", color: "#10B981", onPress: () => router.push("/(tabs)/overview") },
        { icon: "options", label: "Settings", color: "#8B5CF6", onPress: () => router.push("/(modals)/settings") },
    ];

    if (isLoading && transactions.length === 0) {
        return (
            <View style={commonStyles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    const renderBalanceCard = () => (
        <LinearGradient
            colors={[COLORS.primary, darkenColor(COLORS.primary, 30)]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[homeStyles.balanceCard, isDesktop && { marginHorizontal: 0 }]}
        >
            <View style={homeStyles.balanceHeader}>
                <View style={homeStyles.balanceLabelContainer}>
                    <Text style={[homeStyles.balanceLabel, { fontFamily: 'nimbu-demo' }]}>Total Balance</Text>
                    <Ionicons name="chevron-down" size={16} color={COLORS.white} />
                </View>
                <TouchableOpacity>
                    <Ionicons
                        name="ellipsis-horizontal"
                        size={20}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
            </View>

            <Text style={[homeStyles.balanceAmount, { fontFamily: 'nimbu-demo', fontSize: 42 }]}>
                ${stats.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Text>

            <View style={homeStyles.balanceDetails}>
                <View style={homeStyles.balanceItem}>
                    <View style={homeStyles.iconContainer}>
                        <Ionicons name="arrow-down-circle" size={20} color={COLORS.white} />
                    </View>
                    <View>
                        <Text style={[homeStyles.balanceItemLabel, { fontFamily: 'nimbu-demo' }]}>Income</Text>
                        <Text style={[homeStyles.balanceItemAmount, { fontFamily: 'nimbu-demo' }]}>
                            ${stats.income.toLocaleString()}
                        </Text>
                    </View>
                </View>

                <View style={homeStyles.balanceItem}>
                    <View style={homeStyles.iconContainer}>
                        <Ionicons name="arrow-up-circle" size={20} color={COLORS.white} />
                    </View>
                    <View>
                        <Text style={[homeStyles.balanceItemLabel, { fontFamily: 'nimbu-demo' }]}>Expenses</Text>
                        <Text style={[homeStyles.balanceItemAmount, { fontFamily: 'nimbu-demo' }]}>
                            ${stats.expenses.toLocaleString()}
                        </Text>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );

    const renderTransactions = () => (
        <View style={[homeStyles.transactionsSection, isDesktop && { paddingHorizontal: 0 }]}>
            <View style={commonStyles.sectionHeader}>
                <Text style={commonStyles.sectionTitle}>Recent Transactions</Text>
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
                    <Ionicons name="receipt-outline" size={48} color={COLORS.textLight} />
                    <Text style={{ color: COLORS.textLight, marginTop: 12 }}>No transactions yet</Text>
                </View>
            ) : (
                transactions.slice(0, 10).map((transaction) => {
                    const isExpense = transaction.type === "expense";
                    const amount = parseFloat(transaction.amount);
                    const color = isExpense ? COLORS.secondary : COLORS.primary;

                    return (
                        <TouchableOpacity
                            key={transaction.id}
                            style={[commonStyles.transactionItem, homeStyles.webHoverEffect]}
                            activeOpacity={0.7}
                        >
                            <View style={commonStyles.transactionLeft}>
                                <View style={[commonStyles.transactionIcon, { backgroundColor: color + "15" }]}>
                                    <Ionicons name={isExpense ? "arrow-up" : "arrow-down"} size={22} color={color} />
                                </View>
                                <View>
                                    <Text style={commonStyles.transactionType}>{transaction.title}</Text>
                                    <Text style={commonStyles.transactionTime}>{new Date(transaction.date).toLocaleDateString()}</Text>
                                </View>
                            </View>
                            <Text style={[commonStyles.transactionAmount, !isExpense ? commonStyles.positiveAmount : commonStyles.negativeAmount]}>
                                {!isExpense ? "+" : "-"}${Math.abs(amount).toFixed(2)}
                            </Text>
                        </TouchableOpacity>
                    );
                })
            )}
        </View>
    );

    return (
        <ScrollView
            style={commonStyles.container}
            contentContainerStyle={isDesktop && commonStyles.webContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {/* Header Top Row */}
            <View style={homeStyles.headerTop}>
                <TouchableOpacity
                    style={commonStyles.headerIcon}
                    onPress={() => setShowQuickActions(true)}
                >
                    <Ionicons name="apps-outline" size={24} color={COLORS.text} />
                </TouchableOpacity>

                <Text style={{
                    fontFamily: "nimbu-demo",
                    fontSize: 18,
                    fontWeight: "600",
                    color: COLORS.text,
                }}>Home</Text>

                <TouchableOpacity style={commonStyles.headerIcon}>
                    <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
                </TouchableOpacity>
            </View>

            {/* User Greeting Section */}
            <View style={homeStyles.userInfo}>
                <Text style={[homeStyles.userGreeting, { fontFamily: "nimbu-demo" }]}>
                    Hi, {user?.firstName || "User"} 👋
                </Text>
                <Text style={{
                    fontFamily: "nimbu-demo",
                    fontSize: 28,
                    fontWeight: "bold",
                    color: COLORS.text,
                }}>Dashboard</Text>
            </View>

            {isDesktop ? (
                <View style={homeStyles.desktopContainer}>
                    <View style={homeStyles.leftColumn}>
                        {renderBalanceCard()}
                        <View style={{ marginTop: 24 }}>
                            <Text style={[commonStyles.sectionTitle, { marginBottom: 16 }]}>Quick Access</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                                {quickActions.map(action => (
                                    <TouchableOpacity
                                        key={action.label}
                                        onPress={action.onPress}
                                        style={{
                                            backgroundColor: action.color + '10',
                                            padding: 16,
                                            borderRadius: 12,
                                            width: '47%',
                                            alignItems: 'center',
                                            borderWidth: 1,
                                            borderColor: action.color + '30'
                                        }}
                                    >
                                        <Ionicons name={action.icon} size={24} color={action.color} />
                                        <Text style={{ marginTop: 8, fontSize: 12, fontWeight: '600', color: action.color }}>{action.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                    <View style={homeStyles.rightColumn}>
                        {renderTransactions()}
                    </View>
                </View>
            ) : (
                <>
                    {renderBalanceCard()}
                    {renderTransactions()}
                </>
            )}

            <QuickActions
                visible={showQuickActions}
                onClose={() => setShowQuickActions(false)}
                actions={quickActions}
            />
        </ScrollView>
    );
};

export default HomePage;
