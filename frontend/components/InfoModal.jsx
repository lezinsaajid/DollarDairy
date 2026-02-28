import React from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

const { height } = Dimensions.get("window");

const InfoModal = ({ visible, onClose, title, type, data }) => {
    const renderContent = () => {
        if (type === "account") {
            return (
                <View style={styles.section}>
                    <InfoItem label="Full Name" value={data?.fullName || "Not set"} icon="person-outline" />
                    <InfoItem label="Email Address" value={data?.email || "Not set"} icon="mail-outline" />
                    <InfoItem label="Member Since" value={data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : "Unknown"} icon="calendar-outline" />
                    <InfoItem label="User ID" value={data?.id || "N/A"} icon="finger-print-outline" />
                </View>
            );
        } else if (type === "security") {
            return (
                <View style={styles.section}>
                    <Text style={styles.description}>
                        Below is your unique security code for account verification. Keep this private.
                    </Text>
                    <View style={styles.codeContainer}>
                        <Text style={styles.securityCode}>DDSR-4921-X92B</Text>
                    </View>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>Generate New Code</Text>
                    </TouchableOpacity>
                </View>
            );
        } else if (type === "privacy") {
            return (
                <ScrollView showsVerticalScrollIndicator={false} style={styles.paragraphContainer}>
                    <Text style={styles.privacyHeader}>1. Data Collection</Text>
                    <Text style={styles.privacyText}>
                        We collect minimal personal information required to maintain your financial records securely. This includes your email and encrypted transaction data.
                    </Text>
                    <Text style={styles.privacyHeader}>2. Security</Text>
                    <Text style={styles.privacyText}>
                        Your data is stored using industry-standard AES-256 encryption. We never share your financial patterns with third-party advertisers.
                    </Text>
                    <Text style={styles.privacyHeader}>3. Your Rights</Text>
                    <Text style={styles.privacyText}>
                        You have the right to export or delete your data at any time via the Settings menu in this application.
                    </Text>
                </ScrollView>
            );
        }
        return null;
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color={COLORS.text} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        {renderContent()}
                    </View>
                    <TouchableOpacity style={styles.doneButton} onPress={onClose}>
                        <Text style={styles.doneButtonText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const InfoItem = ({ label, value, icon }) => (
    <View style={styles.infoItem}>
        <View style={styles.infoIconWrapper}>
            <Ionicons name={icon} size={20} color={COLORS.primary} />
        </View>
        <View>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    modalContainer: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        maxHeight: height * 0.8,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: COLORS.text,
    },
    closeButton: {
        padding: 4,
    },
    content: {
        marginBottom: 24,
    },
    section: {
        gap: 20,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    infoIconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: COLORS.primary + "15",
        justifyContent: "center",
        alignItems: "center",
    },
    infoLabel: {
        fontSize: 12,
        color: COLORS.textLight,
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.text,
    },
    description: {
        fontSize: 14,
        color: COLORS.textLight,
        lineHeight: 20,
    },
    codeContainer: {
        backgroundColor: COLORS.card,
        padding: 24,
        borderRadius: 16,
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
        borderStyle: "dashed",
    },
    securityCode: {
        fontSize: 24,
        fontWeight: "bold",
        letterSpacing: 2,
        color: COLORS.primary,
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    actionButton: {
        backgroundColor: COLORS.primary + "10",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    actionButtonText: {
        color: COLORS.primary,
        fontWeight: "600",
    },
    paragraphContainer: {
        maxHeight: 400,
    },
    privacyHeader: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.text,
        marginTop: 16,
        marginBottom: 8,
    },
    privacyText: {
        fontSize: 14,
        color: COLORS.textLight,
        lineHeight: 22,
    },
    doneButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
    },
    doneButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default InfoModal;
