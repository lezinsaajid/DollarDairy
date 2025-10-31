import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const profileStyles = StyleSheet.create({
    // Profile Header
    profileHeader: {
        alignItems: "center",
        paddingVertical: 32,
        paddingHorizontal: 20,
    },
    avatarContainer: {
        position: "relative",
        marginBottom: 16,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.primary + "20",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    editAvatarButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: COLORS.white,
    },
    userName: {
        fontSize: 24,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: COLORS.textLight,
    },

    // Menu Items
    menuContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    menuItem: {
        flexDirection: "row",
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
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.text,
    },
    logoutItem: {
        backgroundColor: "#FEE",
    },
    logoutIconContainer: {
        backgroundColor: "#FEE",
    },
    logoutText: {
        color: "#EF4444",
    },
});
