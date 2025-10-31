import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const addCardStyles = StyleSheet.create({
    formContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },

    // Tab Selector
    tabContainer: {
        flexDirection: "row",
        marginBottom: 32,
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: COLORS.primary,
    },
    tabText: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.textLight,
    },
    activeTabText: {
        color: COLORS.white,
    },

    // Card Number Input
    cardNumberContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.textLight,
        marginBottom: 12,
    },
    cardNumberRow: {
        flexDirection: "row",
        gap: 12,
    },
    cardNumberInput: {
        flex: 1,
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 16,
        fontSize: 18,
        fontWeight: "600",
        color: COLORS.text,
        textAlign: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    // Date Selectors
    dateContainer: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 24,
    },
    dateSelector: {
        flex: 1,
    },
    dateInput: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: COLORS.text,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    // Cardholder Name
    nameContainer: {
        marginBottom: 32,
    },
    nameInput: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: COLORS.text,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    // Submit Button
    submitButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: "center",
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.white,
    },
});
