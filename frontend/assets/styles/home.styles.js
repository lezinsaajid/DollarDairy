import { StyleSheet, Platform } from "react-native";
import { COLORS } from "@/constants/colors";

export const homeStyles = StyleSheet.create({
    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 20,
    },
    userInfo: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    userGreeting: {
        fontSize: 14,
        color: COLORS.textLight,
        marginBottom: 2,
        fontFamily: "nimbu-demo",
    },
    userName: {
        fontSize: 28,
        fontWeight: "bold",
        color: COLORS.text,
        fontFamily: "nimbu-demo",
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.card,
    },
    // Balance Card
    balanceCard: {
        marginHorizontal: 20,
        padding: 24,
        borderRadius: 24,
        marginBottom: 32,
        elevation: 10,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    balanceHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    balanceLabelContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    balanceLabel: {
        color: COLORS.white,
        fontSize: 16,
        opacity: 0.8,
        fontFamily: "nimbu-demo",
    },
    balanceAmount: {
        fontSize: 36,
        fontWeight: "bold",
        color: COLORS.white,
        marginBottom: 20,
        fontFamily: "nimbu-demo",
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
        fontFamily: "nimbu-demo",
    },
    balanceItemAmount: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "nimbu-demo",
    },

    // Transactions Section
    transactionsSection: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },

    // Desktop Layout
    desktopContainer: {
        flexDirection: 'row',
        paddingHorizontal: 40,
        paddingTop: 20,
        gap: 24,
    },
    leftColumn: {
        flex: 1,
        maxWidth: 400,
    },
    rightColumn: {
        flex: 1.5,
    },
    webHoverEffect: Platform.select({
        web: {
            cursor: 'pointer',
            transition: 'transform 0.15s ease-out, shadow 0.15s ease-out',
            ':hover': {
                transform: 'translateY(-2px)',
                shadowOpacity: 0.15,
                shadowRadius: 10,
            }
        },
        default: {}
    })
});
