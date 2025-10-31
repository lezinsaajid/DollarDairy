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
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(false);
    const [data, setData] = useState({
        totalBalance: 0,
        income: 0,
        expenses: 0,
        transactions: [],
    });

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

    // Fetch data from backend
    const fetchData = async () => {
        setIsLoading(true);
        try {
            setData({
                totalBalance: 3257.0,
                income: 2350.0,
                expenses: 950.0,
                transactions: [
                    {
                        id: 1,
                        type: "Money Transfer",
                        time: "12:35 PM",
                        amount: -450,
                        icon: "person-circle",
                        color: COLORS.primary,
                    },
                    {
                        id: 2,
                        type: "Paypal",
                        time: "10:20 AM",
                        amount: 1200,
                        icon: "logo-paypal",
                        color: "#0070BA",
                    },
                    {
                        id: 3,
                        type: "Uber",
                        time: "08:40 AM",
                        amount: -150,
                        icon: "car",
                        color: COLORS.text,
                    },
                    {
                        id: 4,
                        type: "Bata Store",
                        time: "Yesterday",
                        amount: -200,
                        icon: "storefront",
                        color: "#EF4444",
                    },
                    {
                        id: 5,
                        type: "Bank Transfer",
                        time: "Yesterday",
                        amount: -600,
                        icon: "business",
                        color: "#3B82F6",
                    },
                ],
            });
        } catch (error) {
            console.error("Error fetching ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Navigation handlers
    const handleNavigateToNotifications = () => {
        router.push("/(modals)/notifications");
    };

    if (isLoading && data.transactions.length === 0) {
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
                    <Text style={{ fontFamily: "NimbusReg",
                fontSize: 28,
                fontWeight: "bold",
                color: COLORS.text,
                textAlign: "center",}}>Home</Text>
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
                        ${data.totalBalance.toFixed(2)}
                    </Text>

                    <View style={homeStyles.balanceDetails}>
                        <View style={homeStyles.balanceItem}>
                            <View style={homeStyles.iconContainer}>
                                <Ionicons name="arrow-down" size={16} color={COLORS.white} />
                            </View>
                            <View>
                                <Text style={homeStyles.balanceItemLabel}>Income</Text>
                                <Text style={homeStyles.balanceItemAmount}>
                                    ${data.income.toFixed(2)}
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
                                    ${data.expenses.toFixed(2)}
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

                    {data.transactions.map((transaction) => (
                        <TouchableOpacity
                            key={transaction.id}
                            style={commonStyles.transactionItem}
                            activeOpacity={0.7}
                        >
                            <View style={commonStyles.transactionLeft}>
                                <View
                                    style={[
                                        commonStyles.transactionIcon,
                                        { backgroundColor: transaction.color + "15" },
                                    ]}
                                >
                                    <Ionicons
                                        name={transaction.icon}
                                        size={24}
                                        color={transaction.color}
                                    />
                                </View>
                                <View>
                                    <Text style={commonStyles.transactionType}>
                                        {transaction.type}
                                    </Text>
                                    <Text style={commonStyles.transactionTime}>
                                        {transaction.time}
                                    </Text>
                                </View>
                            </View>
                            <Text
                                style={[
                                    commonStyles.transactionAmount,
                                    transaction.amount > 0
                                        ? commonStyles.positiveAmount
                                        : commonStyles.negativeAmount,
                                ]}
                            >
                                {transaction.amount > 0 ? "+" : ""}$
                                {Math.abs(transaction.amount)}
                            </Text>
                        </TouchableOpacity>
                    ))}
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
