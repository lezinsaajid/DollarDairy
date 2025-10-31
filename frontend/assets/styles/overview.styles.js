import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const overviewStyles = StyleSheet.create({
    // Summary Cards
    summaryContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        marginBottom: 24,
        gap: 12,
    },
    summaryCard: {
        flex: 1,
        padding: 16,
        borderRadius: 16,
        elevation: 2,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    summaryCardIncome: {
        backgroundColor: COLORS.card,
    },
    summaryCardExpense: {
        backgroundColor: COLORS.card,
    },
    summaryDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginBottom: 8,
    },
    summaryDotIncome: {
        backgroundColor: COLORS.primary,
    },
    summaryDotExpense: {
        backgroundColor: COLORS.secondary, // NOW USES THEME SECONDARY
    },
    summaryLabel: {
        fontSize: 12,
        color: COLORS.textLight,
        marginBottom: 4,
    },
    summaryAmount: {
        fontSize: 18,
        fontWeight: "600",
        color: COLORS.text,
    },

    // Statistics Section
    statisticsSection: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    periodSelector: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    periodText: {
        fontSize: 14,
        color: COLORS.text,
        fontWeight: "500",
    },
    dateRange: {
        fontSize: 12,
        color: COLORS.textLight,
        marginBottom: 20,
    },

    // Chart
    chartContainer: {
        flexDirection: "row",
        height: 200,
        marginBottom: 20,
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    yAxisLabels: {
        justifyContent: "space-between",
        paddingRight: 8,
        paddingVertical: 10,
    },
    yAxisLabel: {
        fontSize: 10,
        color: COLORS.textLight,
        fontWeight: "500",
    },
    barsContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
    },
    barGroup: {
        alignItems: "center",
        flex: 1,
    },
    bars: {
        flexDirection: "row",
        alignItems: "flex-end",
        height: 150,
        gap: 4,
    },
    bar: {
        width: 16,
        borderRadius: 4,
        minHeight: 8,
    },
    incomeBar: {
        backgroundColor: COLORS.primary, // Primary color
    },
    expensesBar: {
        backgroundColor: COLORS.secondary, // NOW USES THEME SECONDARY
    },
    weekLabel: {
        fontSize: 10,
        color: COLORS.textLight,
        marginTop: 8,
        fontWeight: "500",
    },

    // Legend
    legend: {
        flexDirection: "row",
        gap: 12,
        marginTop: 4,
    },
    legendButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    legendButtonActive: {
        backgroundColor: COLORS.secondary, // NOW USES THEME SECONDARY
        borderColor: COLORS.secondary,
    },
    legendText: {
        fontSize: 14,
        color: COLORS.text,
        fontWeight: "500",
    },
    legendTextActive: {
        color: COLORS.white,
    },

    // Transactions Section
    transactionsSection: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    transactionTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.text,
        marginBottom: 4,
    },
    transactionDate: {
        fontSize: 12,
        color: COLORS.textLight,
    },
});
