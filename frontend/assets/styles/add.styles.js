import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const addStyles = StyleSheet.create({
    // Main Container
    optionsContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 32,
        gap: 12,
    },
    optionCard: {
        flex: 1,
        padding: 24,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    incomeCard: {
        backgroundColor: COLORS.card,
    },
    expenseCard: {
        backgroundColor: COLORS.card,
    },
    optionIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    incomeIconContainer: {
        backgroundColor: COLORS.primary + "15",
    },
    expenseIconContainer: {
        backgroundColor: COLORS.secondary + "15",
    },
    optionText: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.text,
        fontFamily: "nimbu-demo",
    },

    // Last Added Section
    lastAddedSection: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    lastAddedTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 16,
        fontFamily: "nimbu-demo",
    },
    transactionCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.card,
        padding: 18,
        borderRadius: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    transactionLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    transactionIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    transactionTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.text,
        marginBottom: 4,
        fontFamily: "nimbu-demo",
    },
    transactionDate: {
        fontSize: 12,
        color: COLORS.textLight,
        fontFamily: "nimbu-demo",
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "nimbu-demo",
    },
    positiveAmount: {
        color: "#10B981",
    },
    negativeAmount: {
        color: "#EF4444",
    },
});
