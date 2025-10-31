import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "@/constants/colors";

const { width } = Dimensions.get("window");

export const addFormStyles = StyleSheet.create({
    // Calendar
    calendarContainer: {
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 20,
        marginBottom: 24,
        elevation: 2,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    calendarHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    calendarMonth: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.text,
    },
    calendarWeekDays: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 12,
    },
    weekDay: {
        width: (width - 72) / 7,
        textAlign: "center",
        fontSize: 12,
        color: COLORS.textLight,
        fontWeight: "500",
    },
    calendarDays: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    dayButton: {
        width: (width - 72) / 7,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 4,
        borderRadius: 8,
    },
    dayText: {
        fontSize: 14,
        color: COLORS.text,
    },
    selectedDay: {
        backgroundColor: COLORS.primary,
    },
    selectedDayText: {
        color: COLORS.white,
        fontWeight: "600",
    },

    // Form
    formContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    inputGroup: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 12,
    },
    textInput: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: COLORS.text,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    amountInput: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: COLORS.text,
        borderWidth: 1,
        borderColor: COLORS.border,
        flexDirection: "row",
        alignItems: "center",
    },
    amountSymbol: {
        fontSize: 16,
        color: COLORS.textLight,
        marginRight: 8,
    },

    // Category
    categoryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    categoryButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    categoryButtonActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    categoryButtonExpenseActive: {
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.secondary,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: "500",
        color: COLORS.text,
    },
    categoryTextActive: {
        color: COLORS.white,
    },
    addCategoryButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    // Submit Button
    submitButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 8,
    },
    submitButtonExpense: {
        backgroundColor: COLORS.secondary,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.white,
    },
});
