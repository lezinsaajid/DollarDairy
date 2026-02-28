import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { COLORS } from "../constants/colors";

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        { name: "Home", icon: "home", path: "/(tabs)" },
        { name: "Overview", icon: "stats-chart", path: "/(tabs)/overview" },
        { name: "Add", icon: "add-circle", path: "/(tabs)/add" },
        { name: "My Cards", icon: "card", path: "/(tabs)/mycards" },
        { name: "Profile", icon: "person", path: "/(tabs)/profile" },
    ];

    const isActive = (path) => {
        if (path === "/(tabs)" && pathname === "/") return true;
        return pathname.includes(path.replace("(tabs)/", ""));
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <View style={styles.logoBox}>
                    <Ionicons name="wallet" size={24} color={COLORS.white} />
                </View>
                <Text style={styles.logoText}>DollarDairy</Text>
            </View>

            <View style={styles.nav}>
                {menuItems.map((item) => {
                    const active = isActive(item.path);
                    return (
                        <TouchableOpacity
                            key={item.path}
                            style={[styles.navItem, active && styles.activeNavItem]}
                            onPress={() => router.push(item.path)}
                            activeOpacity={0.7}
                        >
                            <Ionicons
                                name={active ? item.icon : `${item.icon}-outline`}
                                size={22}
                                color={active ? COLORS.primary : COLORS.textLight}
                            />
                            <Text style={[styles.navText, active && styles.activeNavText]}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Version 1.0.0</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 260,
        height: '100%',
        backgroundColor: COLORS.card,
        borderRightWidth: 1,
        borderColor: COLORS.border,
        padding: 24,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    logoBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    nav: {
        flex: 1,
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 8,
    },
    activeNavItem: {
        backgroundColor: COLORS.primary + '10',
    },
    navText: {
        fontSize: 16,
        marginLeft: 12,
        color: COLORS.textLight,
        fontWeight: '500',
    },
    activeNavText: {
        color: COLORS.primary,
        fontWeight: '600',
    },
    footer: {
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    footerText: {
        color: COLORS.textLight,
        fontSize: 12,
        textAlign: 'center',
    }
});

export default Sidebar;
