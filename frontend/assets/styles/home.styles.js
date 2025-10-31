import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const homeStyles = StyleSheet.create({
    // Balance Card
    balanceCard: {
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 20,
        marginBottom: 24,
        elevation: 4,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    balanceHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    balanceLabelContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    balanceLabel: {
        color: COLORS.white,
        fontSize: 14,
        opacity: 0.9,
        marginRight: 4,
    },
    balanceAmount: {
        fontSize: 36,
        fontWeight: "bold",
        color: COLORS.white,
        marginBottom: 20,
    },
    balanceDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    balanceItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    balanceItemLabel: {
        color: COLORS.white,
        fontSize: 12,
        opacity: 0.9,
    },
    balanceItemAmount: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "600",
    },

    // Transactions Section
    transactionsSection: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
});
