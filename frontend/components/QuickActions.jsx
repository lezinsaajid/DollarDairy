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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeScreen from "./SafeScreen";
import { COLORS } from "@/constants/colors";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.75; // Drawer takes 75% of screen width

/**
 * QuickActions Side Drawer Component
 * 
 * Shows a slide-in drawer from the left with action items
 * 
 * Props:
 * - visible: Boolean to show/hide drawer
 * - onClose: Function called when drawer is closed
 * - actions: Array of action objects with { icon, label, color, onPress }
 */
const QuickActions = ({ visible, onClose, actions }) => {
    // Animation for slide-in effect
    const slideAnim = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    
    // Get safe area insets for bottom padding
    const insets = useSafeAreaInsets();

    // Animate drawer when visible prop changes
    React.useEffect(() => {
        if (visible) {
            // Slide in with spring animation
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 65,
                friction: 11,
            }).start();
        } else {
            // Slide out with timing animation
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
                {/* Dark overlay - tap to close */}
                <Pressable style={styles.overlay} onPress={onClose} />
                
                {/* Animated drawer that slides in from left */}
                <Animated.View
                    style={[
                        styles.drawer,
                        {
                            transform: [{ translateX: slideAnim }],
                        },
                    ]}
                >
                    {/* 
                        SafeScreen handles top safe area (notch/status bar)
                        Set backgroundColor to transparent so drawer background shows through
                    */}
                    <SafeScreen 
                        backgroundColor="transparent"
                        style={{ paddingTop: 0 }} // Override default padding, we'll handle it manually
                    >
                        {/* Manual top padding for safe area */}
                        <View style={{ paddingTop: insets.top }}>
                            {/* Header with app title and close button */}
                            <View style={styles.header}>
                                <Text
                                    style={{
                                        fontFamily: "NimbusReg",
                                        fontSize: 28,
                                        fontWeight: "bold",
                                        color: COLORS.text,
                                        marginBottom: -9,
                                        textAlign: "center",
                                    }}
                                >
                                    DOLLAR DAIRY
                                </Text>
                                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                    <Ionicons name="close" size={24} color={COLORS.text} />
                                </TouchableOpacity>
                            </View>

                            {/* Scrollable list of action items */}
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={[
                                    styles.actionsContainer,
                                    { 
                                        // Add bottom padding to avoid home indicator
                                        paddingBottom: insets.bottom + 40 
                                    }
                                ]}
                            >
                                {/* Render each action item */}
                                {actions.map((action, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.actionItem}
                                        onPress={() => {
                                            onClose(); // Close drawer first
                                            action.onPress(); // Then execute action
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        {/* Icon with colored background */}
                                        <View
                                            style={[
                                                styles.actionIcon,
                                                { backgroundColor: action.color + "15" }, // 15 = 15% opacity
                                            ]}
                                        >
                                            <Ionicons
                                                name={action.icon}
                                                size={22}
                                                color={action.color}
                                            />
                                        </View>
                                        
                                        {/* Action label text */}
                                        <Text style={styles.actionText}>{action.label}</Text>
                                        
                                        {/* Chevron arrow on right */}
                                        <Ionicons
                                            name="chevron-forward"
                                            size={20}
                                            color={COLORS.textLight}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </SafeScreen>
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
        // Cover entire screen with semi-transparent black
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    drawer: {
        // Fixed position drawer on left side
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: DRAWER_WIDTH,
        backgroundColor: COLORS.background,
        
        // Shadow for iOS
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        
        // Elevation for Android
        elevation: 16,
    },
    header: {
        // Header with title and close button
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
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
        gap: 12, // Space between action items
    },
    actionItem: {
        // Individual action button
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.card,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        
        // Shadow for iOS
        elevation: 1,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    actionIcon: {
        // Icon container with colored background
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    actionText: {
        // Action label text
        flex: 1,
        fontSize: 16,
        color: COLORS.text,
        fontWeight: "500",
    },
});

export default QuickActions;
