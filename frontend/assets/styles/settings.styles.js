import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const settingsStyles = StyleSheet.create({
    settingsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    settingItem: {
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
    settingIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    settingText: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.text,
    },
    languageFlag: {
        fontSize: 20,
        marginRight: 8,
    },
});
