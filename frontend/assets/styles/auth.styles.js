import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "@/constants/colors";

const { height } = Dimensions.get("window");

export const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
    },
    imageContainer: {
        height: height * 0.3,
        marginBottom: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 320,
        height: 320,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: COLORS.text,
        textAlign: "center",
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textLight,
        textAlign: "center",
        marginBottom: 30,
    },
    formContainer: {
        flex: 1,
    },
    inputContainer: {
        marginBottom: 20,
        position: "relative",
    },
    textInput: {
        fontSize: 16,
        color: COLORS.text,
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: COLORS.background,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    eyeButton: {
        position: "absolute",
        right: 16,
        top: 16,
        padding: 4,
    },
    authButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 18,
        borderRadius: 12,
        marginTop: 20,
        marginBottom: 30,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.white,
        textAlign: "center",
    },
    linkContainer: {
        alignItems: "center",
        paddingBottom: 20,
    },
    linkText: {
        fontSize: 16,
        color: COLORS.textLight,
    },
    link: {
        color: COLORS.primary,
        fontWeight: "600",
    },

socialButtonsRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
},

socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    marginHorizontal: 4,
    backgroundColor: COLORS.background,
},

dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
},
dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
},
dividerText: {
    marginHorizontal: 8,
    color: COLORS.textLight,
    fontSize: 16,
},
cardContainer: {
    borderRadius: 16,
    backgroundColor: COLORS.background,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 6,
    padding: 28,
},

});