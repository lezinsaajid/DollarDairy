import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Pressable,
    Animated,
    Dimensions,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.75; // 75% of screen width

const QuickActions = ({ visible, onClose, actions }) => {
    const slideAnim = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;

    React.useEffect(() => {
        if (visible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 65,
                friction: 11,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: -DRAWER_WIDTH,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <Pressable style={styles.overlay} onPress={onClose} />
                
                <Animated.View
                    style={[
                        styles.drawer,
                        {
                            transform: [{ translateX: slideAnim }],
                        },
                    ]}
                >
                    <View style={styles.header}>
                        <Text style={{fontFamily: "NimbusReg",
                                        fontSize: 28,
                                        fontWeight: "bold",
                                        color: COLORS.text,
                                        marginBottom: 9,
                                        textAlign: "center",}}>DOLLAR DAIRY</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color={COLORS.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.actionsContainer}
                    >
                        {actions.map((action, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.actionItem}
                                onPress={() => {
                                    onClose();
                                    action.onPress();
                                }}
                                activeOpacity={0.7}
                            >
                                <View
                                    style={[
                                        styles.actionIcon,
                                        { backgroundColor: action.color + "15" },
                                    ]}
                                >
                                    <Ionicons
                                        name={action.icon}
                                        size={22}
                                        color={action.color}
                                    />
                                </View>
                                <Text style={styles.actionText}>{action.label}</Text>
                                <Ionicons
                                    name="chevron-forward"
                                    size={20}
                                    color={COLORS.textLight}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    drawer: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: DRAWER_WIDTH,
        backgroundColor: COLORS.background,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        color: COLORS.text,
    },
    closeButton: {
        padding: 4,
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    actionsContainer: {
        padding: 20,
        gap: 12,
    },
    actionItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.card,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        elevation: 1,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    actionText: {
        flex: 1,
        fontSize: 16,
        color: COLORS.text,
        fontWeight: "500",
    },
});

export default QuickActions;
