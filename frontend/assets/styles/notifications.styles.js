import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const notificationsStyles = StyleSheet.create({
    notificationsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.textLight,
        marginBottom: 16,
        marginTop: 8,
    },
    notificationItem: {
        flexDirection: "row",
        alignItems: "flex-start",
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
    notificationIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    notificationContent: {
        flex: 1,
    },
    notificationText: {
        fontSize: 14,
        color: COLORS.text,
        lineHeight: 20,
        marginBottom: 4,
    },
    notificationTime: {
        fontSize: 12,
        color: COLORS.textLight,
    },
    payButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginLeft: 8,
        alignSelf: "flex-start",
    },
    payButtonText: {
        fontSize: 12,
        fontWeight: "600",
        color: COLORS.white,
    },
});
