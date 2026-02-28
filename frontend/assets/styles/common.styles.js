import { StyleSheet, Platform } from "react-native";
import { COLORS } from "@/constants/colors";

export const commonStyles = StyleSheet.create({
    // Container
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
    },

    // Header - SafeScreen already handles top safe area
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 16, // Reduced since SafeScreen handles safe area
        paddingBottom: 16,
        backgroundColor: COLORS.background,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: COLORS.text,
        fontFamily: "nimbu-demo",
    },
    headerIcon: {
        padding: 4,
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
    },

    // Section Header
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: COLORS.text,
        fontFamily: "nimbu-demo",
    },
    seeAllText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: "500",
        fontFamily: "nimbu-demo",
    },

    // Transaction Item
    transactionItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.card,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 1,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    transactionLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    transactionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    transactionType: {
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.text,
        marginBottom: 4,
        fontFamily: "nimbu-demo",
    },
    transactionTime: {
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

    // Card
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    // Button
    primaryButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.white,
        fontFamily: "nimbu-demo",
    },
    secondaryButton: {
        backgroundColor: COLORS.card,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.text,
        fontFamily: "nimbu-demo",
    },

    // Web Specifics
    webContainer: {
        maxWidth: 1200,
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: Platform.OS === 'web' ? 40 : 20,
    },
    desktopGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    hoverScale: Platform.select({
        web: {
            transition: 'transform 0.2s ease-in-out',
            ':hover': {
                transform: 'scale(1.02)',
            }
        },
        default: {}
    })
});
