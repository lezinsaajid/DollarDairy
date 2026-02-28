import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const editProfileStyles = StyleSheet.create({
    // Progress Bar
    progressContainer: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    progressText: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 8,
        fontFamily: "nimbu-demo",
    },
    progressSubtext: {
        fontSize: 12,
        color: COLORS.textLight,
        marginBottom: 12,
        fontFamily: "nimbu-demo",
    },
    progressBar: {
        height: 6,
        backgroundColor: COLORS.border,
        borderRadius: 3,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: 3,
    },

    // Avatar Section
    avatarSection: {
        alignItems: "center",
        paddingVertical: 24,
        marginBottom: 24,
    },
    avatarContainer: {
        position: "relative",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.primary + "20",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editAvatarButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: COLORS.background,
    },

    // Form
    formContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.textLight,
        marginBottom: 8,
        fontFamily: "nimbu-demo",
    },
    inputField: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: COLORS.text,
        borderWidth: 1,
        borderColor: COLORS.border,
        fontFamily: "nimbu-demo",
    },
    disabledInput: {
        backgroundColor: COLORS.background,
        color: COLORS.textLight,
    },

    // Save Button
    saveButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 12,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.white,
        fontFamily: "nimbu-demo",
    },
});
