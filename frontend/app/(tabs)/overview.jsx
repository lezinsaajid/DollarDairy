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
import { useRouter } from "expo-router";
import { COLORS, addOpacity } from "../../constants/colors";
import { commonStyles } from "../../assets/styles/common.styles";
import { overviewStyles } from "../../assets/styles/overview.styles";
import QuickActions from "../../components/QuickActions";

const OverviewPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
    const [selectedTab, setSelectedTab] = useState("Income");
    const [showQuickActions, setShowQuickActions] = useState(false);
    const [data, setData] = useState({
        totalIncome: 0,
        totalExpenses: 0,
        statistics: [],
        recentTransactions: [],
    });

    // Quick Actions for Overview Page
    const quickActions = [
        {
            icon: "calendar",
            label: "Filter by Date",
            color: COLORS.primary,
            onPress: () => console.log("Filter by Date"),
        },
        {
            icon: "filter",
            label: "Filter Categories",
            color: "#10B981",
            onPress: () => console.log("Filter Categories"),
        },
        {
            icon: "download",
            label: "Export Data",
            color: "#8B5CF6",
            onPress: () => console.log("Export Data"),
        },
        {
            icon: "pie-chart",
            label: "View Charts",
            color: "#F59E0B",
            onPress: () => console.log("View Charts"),
        },
        {
            icon: "add-circle",
            label: "Add Transaction",
            color: COLORS.secondary,
            onPress: () => router.push("/add"),
        },
        {
            icon: "settings",
            label: "Settings",
            color: "#EF4444",
            onPress: () => router.push("/(modals)/settings"),
        },
    ];

    // Fetch data from backend
    const fetchData = async () => {
        setIsLoading(true);
        try {
            setData({
                totalIncome: 8500,
                totalExpenses: 3800,
                statistics: [
                    { week: "Week 1", income: 1800, expenses: 900 },
                    { week: "Week 2", income: 2200, expenses: 1200 },
                    { week: "Week 3", income: 2500, expenses: 800 },
                    { week: "Week 4", income: 2000, expenses: 900 },
                ],
                recentTransactions: [
                    {
                        id: 1,
                        title: "Shopping",
                        date: "30 Apr 2022",
                        amount: -1550,
                        icon: "bag-handle",
                        color: COLORS.secondary,
                    },
                    {
                        id: 2,
                        title: "Laptop",
                        date: "28 Apr 2022",
                        amount: -1200,
                        icon: "laptop",
                        color: COLORS.primary,
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

    const getMaxValue = () => {
        const values = data.statistics.flatMap((item) => [
            item.income,
            item.expenses,
        ]);
        return Math.max(...values, 1);
    };

    const maxValue = getMaxValue();

    if (isLoading && data.statistics.length === 0) {
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
                    <Text
                        style={{
                            fontFamily: "NimbusReg",
                            fontSize: 28,
                            fontWeight: "bold",
                            color: COLORS.text,
                            textAlign: "center",
                        }}
                    >
                        Overview
                    </Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Summary Cards */}
                <View style={overviewStyles.summaryContainer}>
                    <View
                        style={[
                            overviewStyles.summaryCard,
                            overviewStyles.summaryCardIncome,
                            { backgroundColor: addOpacity(COLORS.primary, 0.1) },
                        ]}
                    >
                        <View
                            style={[
                                overviewStyles.summaryDot,
                                overviewStyles.summaryDotIncome,
                            ]}
                        />
                        <Text style={overviewStyles.summaryLabel}>Total Income</Text>
                        <Text style={overviewStyles.summaryAmount}>
                            ${data.totalIncome.toLocaleString()}
                        </Text>
                    </View>

                    <View
                        style={[
                            overviewStyles.summaryCard,
                            overviewStyles.summaryCardExpense,
                            { backgroundColor: addOpacity(COLORS.secondary, 0.1) },
                        ]}
                    >
                        <View
                            style={[
                                overviewStyles.summaryDot,
                                overviewStyles.summaryDotExpense,
                            ]}
                        />
                        <Text style={overviewStyles.summaryLabel}>Total Expenses</Text>
                        <Text style={overviewStyles.summaryAmount}>
                            ${data.totalExpenses.toLocaleString()}
                        </Text>
                    </View>
                </View>

                {/* Statistics Section */}
                <View style={overviewStyles.statisticsSection}>
                    <View style={commonStyles.sectionHeader}>
                        <Text style={commonStyles.sectionTitle}>Statistics</Text>
                        <TouchableOpacity style={overviewStyles.periodSelector}>
                            <Text style={overviewStyles.periodText}>{selectedPeriod}</Text>
                            <Ionicons name="chevron-down" size={16} color={COLORS.text} />
                        </TouchableOpacity>
                    </View>

                    <Text style={overviewStyles.dateRange}>Apr 01 - Apr 30</Text>

                    {/* Chart */}
                    <View style={overviewStyles.chartContainer}>
                        <View style={overviewStyles.yAxisLabels}>
                            <Text style={overviewStyles.yAxisLabel}>$4k</Text>
                            <Text style={overviewStyles.yAxisLabel}>$3k</Text>
                            <Text style={overviewStyles.yAxisLabel}>$2k</Text>
                            <Text style={overviewStyles.yAxisLabel}>$1k</Text>
                            <Text style={overviewStyles.yAxisLabel}>$0</Text>
                        </View>

                        <View style={overviewStyles.barsContainer}>
                            {data.statistics.map((item, index) => (
                                <View key={index} style={overviewStyles.barGroup}>
                                    <View style={overviewStyles.bars}>
                                        <View
                                            style={[
                                                overviewStyles.bar,
                                                overviewStyles.incomeBar,
                                                {
                                                    height: `${
                                                        (item.income / maxValue) * 100
                                                    }%`,
                                                },
                                            ]}
                                        />
                                        <View
                                            style={[
                                                overviewStyles.bar,
                                                overviewStyles.expensesBar,
                                                {
                                                    height: `${
                                                        (item.expenses / maxValue) * 100
                                                    }%`,
                                                },
                                            ]}
                                        />
                                    </View>
                                    <Text style={overviewStyles.weekLabel}>
                                        {item.week}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Legend */}
                    <View style={overviewStyles.legend}>
                        <TouchableOpacity
                            style={[
                                overviewStyles.legendButton,
                                selectedTab === "Income" &&
                                    overviewStyles.legendButtonActive,
                            ]}
                            onPress={() => setSelectedTab("Income")}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={[
                                    overviewStyles.legendText,
                                    selectedTab === "Income" &&
                                        overviewStyles.legendTextActive,
                                ]}
                            >
                                Income
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                overviewStyles.legendButton,
                                selectedTab === "Expenses" &&
                                    overviewStyles.legendButtonActive,
                            ]}
                            onPress={() => setSelectedTab("Expenses")}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={[
                                    overviewStyles.legendText,
                                    selectedTab === "Expenses" &&
                                        overviewStyles.legendTextActive,
                                ]}
                            >
                                Expenses
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Recent Transactions */}
                <View style={overviewStyles.transactionsSection}>
                    {data.recentTransactions.map((transaction) => (
                        <TouchableOpacity
                            key={transaction.id}
                            style={commonStyles.transactionItem}
                            activeOpacity={0.7}
                        >
                            <View style={commonStyles.transactionLeft}>
                                <View
                                    style={[
                                        commonStyles.transactionIcon,
                                        { backgroundColor: transaction.color + "20" },
                                    ]}
                                >
                                    <Ionicons
                                        name={transaction.icon}
                                        size={24}
                                        color={transaction.color}
                                    />
                                </View>
                                <View>
                                    <Text style={overviewStyles.transactionTitle}>
                                        {transaction.title}
                                    </Text>
                                    <Text style={overviewStyles.transactionDate}>
                                        {transaction.date}
                                    </Text>
                                </View>
                            </View>
                            <Text
                                style={[
                                    commonStyles.transactionAmount,
                                    commonStyles.negativeAmount,
                                ]}
                            >
                                {transaction.amount < 0 ? "-" : "+"}$
                                {Math.abs(transaction.amount)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Quick Actions Side Drawer */}
            <QuickActions
                visible={showQuickActions}
                onClose={() => setShowQuickActions(false)}
                actions={quickActions}
            />
        </>
    );
};

export default OverviewPage;
