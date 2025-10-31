import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "@/constants/colors";

const { width } = Dimensions.get("window");

export const myCardsStyles = StyleSheet.create({
    // Cards Container
    cardsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    
    // Credit Card
    creditCard: {
        width: width - 40,
        height: 200,
        borderRadius: 20,
        padding: 24,
        marginBottom: 20,
        justifyContent: "space-between",
        elevation: 8,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    
    // Card Header
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    cardLogo: {
        fontSize: 32,
        fontWeight: "bold",
        color: COLORS.white,
        letterSpacing: 2,
    },
    cardBalance: {
        alignItems: "flex-end",
    },
    balanceLabel: {
        fontSize: 12,
        color: COLORS.white,
        opacity: 0.9,
        marginBottom: 4,
    },
    balanceAmount: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.white,
    },
    
    // Card Number
    cardNumber: {
        fontSize: 18,
        color: COLORS.white,
        letterSpacing: 2,
        fontWeight: "500",
        marginBottom: 8,
    },
    
    // Card Holder
    cardHolder: {
        fontSize: 14,
        color: COLORS.white,
        opacity: 0.9,
    },
    
    // Add Card Button
    addCardButton: {
        width: width - 40,
        height: 80,
        borderRadius: 20,
        backgroundColor: COLORS.card,
        borderWidth: 2,
        borderColor: COLORS.border,
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    addCardIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.primary + "15",
        justifyContent: "center",
        alignItems: "center",
    },
    addCardText: {
        fontSize: 14,
        color: COLORS.textLight,
        marginTop: 8,
    },
});
