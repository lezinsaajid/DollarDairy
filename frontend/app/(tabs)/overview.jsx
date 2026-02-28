import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { COLORS, addOpacity } from "../../constants/colors";
import { commonStyles } from "../../assets/styles/common.styles";
import { overviewStyles } from "../../assets/styles/overview.styles";
import QuickActions from "../../components/QuickActions";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

import useTransactionStore from "../../store/useTransactionStore";
import useCategoryStore from "../../store/useCategoryStore";

import FilterByDate from "../(modals)/FilterByDate";
import FilterCategories from "../(modals)/FilterCategories";
import ExportData from "../(modals)/ExportData";

import { useTransactions, useCategories, useBudgets, useInsights, downloadMonthlyReport } from "../../api/queries";
import { useResponsive } from "../../hooks/useResponsive";

const screenWidth = Dimensions.get("window").width;

const OverviewPage = () => {
    const router = useRouter();
    const { user } = useUser();
    const { isDesktop, width: windowWidth } = useResponsive();

    const [refreshing, setRefreshing] = useState(false);

    const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
    const [selectedTab, setSelectedTab] = useState("Income");
    const [showQuickActions, setShowQuickActions] = useState(false);
    const [showDateFilter, setShowDateFilter] = useState(false);
    const [showCategoryFilter, setShowCategoryFilter] = useState(false);
    const [showExportDialog, setShowExportDialog] = useState(false);
    const [filters, setFilters] = useState({});

    const { data: transactions = [], isLoading: txLoading, refetch: refetchTxs } = useTransactions(filters);
    const { data: categories = [] } = useCategories();
    const { data: budgets = [] } = useBudgets();
    const { data: insights = [], refetch: refetchInsights } = useInsights();

    const [chartData, setChartData] = useState({
        labels: ["W1", "W2", "W3", "W4"],
        datasets: [{ data: [0, 0, 0, 0] }]
    });

    const quickActions = [
        {
            icon: "calendar",
            label: "Filter by Date",
            color: COLORS.primary,
            onPress: () => setShowDateFilter(true),
        },
        {
            icon: "filter",
            label: "Filter Categories",
            color: "#10B981",
            onPress: () => setShowCategoryFilter(true),
        },
        {
            icon: "document-text",
            label: "Monthly Report (PDF)",
            color: "#EF4444",
            onPress: () => handleDownloadReport(),
        },
        {
            icon: "download",
            label: "Export CSV",
            color: "#8B5CF6",
            onPress: () => setShowExportDialog(true),
        },
        {
            icon: "add-circle",
            label: "Add Transaction",
            color: COLORS.secondary,
            onPress: () => router.push("/(tabs)/add"),
        },
    ];

    // Aggregation logic for charts
    const processDataForChart = (txs) => {
        if (!txs || txs.length === 0) {
            setChartData({
                labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                datasets: [{ data: [0, 0, 0, 0] }]
            });
            return;
        }

        const filteredTxs = txs.filter(t => t.type.toLowerCase() === selectedTab.toLowerCase().slice(0, -1) || t.type === selectedTab.toLowerCase());
        const weeklyData = [0, 0, 0, 0];
        filteredTxs.forEach(t => {
            const date = new Date(t.date);
            const weekIdx = Math.min(Math.floor(date.getDate() / 7), 3);
            weeklyData[weekIdx] += parseFloat(t.amount);
        });

        setChartData({
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [{
                data: weeklyData,
                color: (opacity = 1) => selectedTab === "Income" ? COLORS.primary : COLORS.secondary
            }]
        });
    };

    const stats = transactions.reduce((acc, t) => {
        const amount = parseFloat(t.amount);
        if (t.type === 'income') acc.income += amount;
        else acc.expenses += amount;
        return acc;
    }, { income: 0, expenses: 0 });

    const onRefresh = async () => {
        setRefreshing(true);
        await Promise.all([refetchTxs(), refetchInsights()]);
        setRefreshing(false);
    };

    const handleDownloadReport = async () => {
        const now = new Date();
        const url = await downloadMonthlyReport(now.getFullYear(), now.getMonth() + 1);
        alert(`Report generation link: ${url}\n(In production, this would open your browser to download the PDF)`);
    };

    const handleApplyDateFilter = async (filterData) => {
        const { range, customStart, customEnd } = filterData;
        let startDate, endDate;
        if (range === 'today') {
            startDate = endDate = new Date().toISOString().split('T')[0];
        } else if (range === 'week') {
            const now = new Date();
            const start = new Date(now.setDate(now.getDate() - now.getDay()));
            startDate = start.toISOString().split('T')[0];
            endDate = new Date().toISOString().split('T')[0];
        } else if (range === 'month') {
            const now = new Date();
            startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
            endDate = new Date().toISOString().split('T')[0];
        } else if (range === 'custom') {
            startDate = customStart;
            endDate = customEnd;
        }
        setFilters(prev => ({ ...prev, startDate, endDate }));
        setSelectedPeriod(range.charAt(0).toUpperCase() + range.slice(1));
    };

    const handleApplyCategoryFilter = async (selectedCategoryIds) => {
        if (selectedCategoryIds.length === 1) {
            setFilters(prev => ({ ...prev, categoryId: selectedCategoryIds[0] }));
        } else {
            setFilters(prev => {
                const newFilters = { ...prev };
                delete newFilters.categoryId;
                return newFilters;
            });
        }
    };

    useEffect(() => {
        processDataForChart(transactions);
    }, [transactions, selectedTab]);

    const handleExport = () => setShowExportDialog(false);

    // Global Web Scrollbar Injection
    useEffect(() => {
        if (Platform.OS === 'web') {
            const style = document.createElement('style');
            style.textContent = `
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: ${COLORS.background}; }
                ::-webkit-scrollbar-thumb { 
                    background: ${addOpacity(COLORS.primary, 0.3)}; 
                    border-radius: 4px; 
                }
                ::-webkit-scrollbar-thumb:hover { background: ${COLORS.primary}; }
            `;
            document.head.append(style);
            return () => style.remove();
        }
    }, []);

    const chartWidth = isDesktop ? 720 : (windowWidth - 40);

    return (
        <ScrollView
            style={commonStyles.container}
            contentContainerStyle={isDesktop && commonStyles.webContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {/* Header */}
            {/* Header Top Row */}
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingTop: 10,
                marginBottom: 20,
            }}>
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
                }}>Overview</Text>

                <TouchableOpacity style={commonStyles.headerIcon}>
                    <Ionicons name="share-outline" size={24} color={COLORS.text} />
                </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
                <Text style={{
                    fontFamily: "nimbu-demo",
                    fontSize: 28,
                    fontWeight: "bold",
                    color: COLORS.text,
                }}>Analytics</Text>
            </View>

            {isDesktop ? (
                <View style={{ flexDirection: 'row', gap: 24, paddingHorizontal: isDesktop ? 40 : 20 }}>
                    {/* Left Column: Charts and Stats */}
                    <View style={{ flex: 2 }}>
                        {/* Summary Cards Row */}
                        <View style={{ flexDirection: 'row', gap: 16, marginBottom: 24 }}>
                            {/* Income Card */}
                            <View style={[overviewStyles.summaryCard, { backgroundColor: addOpacity(COLORS.primary, 0.1) }]}>
                                <Text style={overviewStyles.summaryLabel}>Total Income</Text>
                                <Text style={[overviewStyles.summaryAmount, { fontSize: 24 }]}>${stats.income.toLocaleString()}</Text>
                            </View>
                            {/* Expense Card */}
                            <View style={[overviewStyles.summaryCard, { backgroundColor: addOpacity(COLORS.secondary, 0.1) }]}>
                                <Text style={overviewStyles.summaryLabel}>Total Expenses</Text>
                                <Text style={[overviewStyles.summaryAmount, { fontSize: 24 }]}>${stats.expenses.toLocaleString()}</Text>
                            </View>
                        </View>

                        {/* Big Chart */}
                        <View style={overviewStyles.statisticsSection}>
                            <View style={commonStyles.sectionHeader}>
                                <Text style={commonStyles.sectionTitle}>Spending Trends</Text>
                                <View style={{ flexDirection: 'row', gap: 8 }}>
                                    <TouchableOpacity
                                        style={[overviewStyles.legendButton, selectedTab === 'Income' && overviewStyles.legendButtonActive]}
                                        onPress={() => setSelectedTab('Income')}
                                    >
                                        <Text style={[overviewStyles.legendText, selectedTab === 'Income' && overviewStyles.legendTextActive]}>Income</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[overviewStyles.legendButton, selectedTab === 'Expenses' && overviewStyles.legendButtonActive]}
                                        onPress={() => setSelectedTab('Expenses')}
                                    >
                                        <Text style={[overviewStyles.legendText, selectedTab === 'Expenses' && overviewStyles.legendTextActive]}>Expenses</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <BarChart
                                data={chartData}
                                width={chartWidth}
                                height={300}
                                yAxisLabel="$"
                                chartConfig={{
                                    backgroundColor: COLORS.card,
                                    backgroundGradientFrom: COLORS.card,
                                    backgroundGradientTo: COLORS.card,
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => selectedTab === "Income" ? COLORS.primary : COLORS.secondary,
                                    labelColor: (opacity = 1) => COLORS.textLight,
                                }}
                                style={{ borderRadius: 16, marginTop: 16 }}
                            />
                        </View>

                        {/* Recent Activity */}
                        <View style={{ marginTop: 24 }}>
                            <Text style={[commonStyles.sectionTitle, { marginBottom: 16 }]}>Recent Activity</Text>
                            {transactions.slice(0, 8).map(tx => (
                                <View key={tx.id} style={commonStyles.transactionItem}>
                                    <View style={commonStyles.transactionLeft}>
                                        <View style={[commonStyles.transactionIcon, { backgroundColor: (tx.type === 'income' ? COLORS.primary : COLORS.secondary) + '15' }]}>
                                            <Ionicons name={tx.type === 'income' ? 'add' : 'remove'} size={20} color={tx.type === 'income' ? COLORS.primary : COLORS.secondary} />
                                        </View>
                                        <View>
                                            <Text style={commonStyles.transactionType}>{tx.title}</Text>
                                            <Text style={commonStyles.transactionTime}>{new Date(tx.date).toLocaleDateString()}</Text>
                                        </View>
                                    </View>
                                    <Text style={[commonStyles.transactionAmount, tx.type === 'income' ? commonStyles.positiveAmount : commonStyles.negativeAmount]}>
                                        {tx.type === 'income' ? '+' : '-'}${parseFloat(tx.amount).toFixed(2)}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Right Column: Insights and Budgets */}
                    <View style={{ flex: 1, gap: 24 }}>
                        {/* Monthly Report Quick Action */}
                        <TouchableOpacity
                            style={[commonStyles.primaryButton, { flexDirection: 'row', justifyContent: 'center', gap: 10 }]}
                            onPress={handleDownloadReport}
                        >
                            <Ionicons name="document-text" size={20} color={COLORS.white} />
                            <Text style={commonStyles.primaryButtonText}>Download Monthly Report</Text>
                        </TouchableOpacity>

                        {/* Insights */}
                        <View style={commonStyles.card}>
                            <Text style={[commonStyles.sectionTitle, { marginBottom: 16 }]}>Financial Insights</Text>
                            {insights.map((insight, idx) => (
                                <View key={idx} style={{ marginBottom: 16, paddingBottom: 16, borderBottomWidth: idx < insights.length - 1 ? 1 : 0, borderBottomColor: COLORS.border }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                                        <Ionicons
                                            name={insight.type === 'warning' ? 'warning' : 'bulb'}
                                            size={18}
                                            color={insight.type === 'warning' ? COLORS.secondary : COLORS.primary}
                                        />
                                        <Text style={{ marginLeft: 8, fontWeight: '700', fontSize: 14 }}>{insight.title}</Text>
                                    </View>
                                    <Text style={{ color: COLORS.textLight, fontSize: 12 }}>{insight.description}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Budgets */}
                        <View style={commonStyles.card}>
                            <Text style={[commonStyles.sectionTitle, { marginBottom: 16 }]}>Budgets</Text>
                            {budgets.map(budget => {
                                const category = categories.find(c => c.id === budget.categoryId);
                                const spent = transactions.filter(t => t.categoryId === budget.categoryId && t.type === 'expense').reduce((sum, t) => sum + parseFloat(t.amount), 0);
                                const progress = Math.min((spent / parseFloat(budget.amount)) * 100, 100);
                                return (
                                    <View key={budget.id} style={{ marginBottom: 12 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <Text style={{ fontSize: 12, fontWeight: '600' }}>{category?.name}</Text>
                                            <Text style={{ fontSize: 12 }}>{progress.toFixed(0)}%</Text>
                                        </View>
                                        <View style={{ height: 6, backgroundColor: COLORS.border, borderRadius: 3 }}>
                                            <View style={{ width: `${progress}%`, height: '100%', backgroundColor: COLORS.primary, borderRadius: 3 }} />
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </View>
            ) : (
                <>
                    {/* Mobile Rendering (Simplified placeholder or existing logic) */}
                    <View style={overviewStyles.summaryContainer}>
                        <View style={[overviewStyles.summaryCard, { backgroundColor: addOpacity(COLORS.primary, 0.1) }]}>
                            <Text style={overviewStyles.summaryLabel}>Income</Text>
                            <Text style={overviewStyles.summaryAmount}>${stats.income.toLocaleString()}</Text>
                        </View>
                        <View style={[overviewStyles.summaryCard, { backgroundColor: addOpacity(COLORS.secondary, 0.1) }]}>
                            <Text style={overviewStyles.summaryLabel}>Expenses</Text>
                            <Text style={overviewStyles.summaryAmount}>${stats.expenses.toLocaleString()}</Text>
                        </View>
                    </View>

                    {insights.length > 0 && (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 20 }}>
                            {insights.map((insight, idx) => (
                                <View key={idx} style={{ width: 200, backgroundColor: addOpacity(COLORS.primary, 0.05), padding: 12, borderRadius: 12, marginRight: 12 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{insight.title}</Text>
                                    <Text style={{ fontSize: 10, marginTop: 4 }}>{insight.description}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    )}

                    <View style={overviewStyles.statisticsSection}>
                        <BarChart
                            data={chartData}
                            width={windowWidth - 40}
                            height={220}
                            chartConfig={{
                                backgroundColor: COLORS.card,
                                backgroundGradientFrom: COLORS.card,
                                backgroundGradientTo: COLORS.card,
                                color: (opacity = 1) => selectedTab === "Income" ? COLORS.primary : COLORS.secondary,
                            }}
                        />
                    </View>
                </>
            )}

            <QuickActions visible={showQuickActions} onClose={() => setShowQuickActions(false)} actions={quickActions} />

            <FilterByDate
                visible={showDateFilter}
                onClose={() => setShowDateFilter(false)}
                onApplyFilter={handleApplyDateFilter}
            />
            <FilterCategories
                visible={showCategoryFilter}
                onClose={() => setShowCategoryFilter(false)}
                onApplyFilter={handleApplyCategoryFilter}
            />
            <ExportData
                visible={showExportDialog}
                onClose={() => setShowExportDialog(false)}
                onExport={handleExport}
            />
        </ScrollView>
    );
};

export default OverviewPage;
