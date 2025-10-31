import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/colors";
import { commonStyles } from "../../assets/styles/common.styles";
import { notificationsStyles } from "../../assets/styles/notifications.styles";

const NotificationsPage = () => {
    const router = useRouter();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // TODO: Fetch from backend
        setNotifications([
            {
                id: 1,
                type: "payment",
                icon: "person-circle",
                iconBg: COLORS.primary + "15",
                iconColor: COLORS.primary,
                text: "You received a payment of $1500 from Smith Jonson.",
                time: "02:23 PM",
                section: "today",
            },
            {
                id: 2,
                type: "success",
                icon: "card",
                iconBg: "#FFA72615",
                iconColor: "#FFA726",
                text: "Your new payment method has been added successfully.",
                time: "11:05 AM",
                section: "today",
            },
            {
                id: 3,
                type: "request",
                icon: "person",
                iconBg: COLORS.primary + "15",
                iconColor: COLORS.primary,
                text: "William James requested a payment of $400.",
                time: "10:16 AM",
                hasAction: true,
                section: "today",
            },
            {
                id: 4,
                type: "discount",
                icon: "pricetag",
                iconBg: "#EF444415",
                iconColor: "#EF4444",
                text: "You get $100 discount from your shopping.",
                time: "09:10 AM",
                section: "today",
            },
            {
                id: 5,
                type: "payment",
                icon: "briefcase",
                iconBg: "#10B98115",
                iconColor: "#10B981",
                text: "You received a new payment from upwork.",
                time: "12:28 PM",
                section: "yesterday",
            },
            {
                id: 6,
                type: "alert",
                icon: "warning",
                iconBg: "#EF444415",
                iconColor: "#EF4444",
                text: "Your monthly expense almost break the budget.",
                time: "10:10 AM",
                section: "yesterday",
            },
            {
                id: 7,
                type: "success",
                icon: "flash",
                iconBg: "#FFA72615",
                iconColor: "#FFA726",
                text: "Your electric bill is successfully paid.",
                time: "09:50 AM",
                section: "yesterday",
            },
        ]);
    }, []);

    const todayNotifications = notifications.filter((n) => n.section === "today");
    const yesterdayNotifications = notifications.filter(
        (n) => n.section === "yesterday"
    );

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
            {/* Header */}
            <View style={commonStyles.header}>
                <TouchableOpacity
                    style={commonStyles.headerIcon}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={commonStyles.headerTitle}>Notifications</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={notificationsStyles.notificationsContainer}
            >
                {/* Today */}
                <Text style={notificationsStyles.sectionTitle}>Today</Text>
                {todayNotifications.map((notification) => (
                    <TouchableOpacity
                        key={notification.id}
                        style={notificationsStyles.notificationItem}
                        activeOpacity={0.7}
                    >
                        <View
                            style={[
                                notificationsStyles.notificationIconContainer,
                                { backgroundColor: notification.iconBg },
                            ]}
                        >
                            <Ionicons
                                name={notification.icon}
                                size={22}
                                color={notification.iconColor}
                            />
                        </View>
                        <View style={notificationsStyles.notificationContent}>
                            <Text style={notificationsStyles.notificationText}>
                                {notification.text}
                            </Text>
                            <Text style={notificationsStyles.notificationTime}>
                                {notification.time}
                            </Text>
                        </View>
                        {notification.hasAction && (
                            <TouchableOpacity style={notificationsStyles.payButton}>
                                <Text style={notificationsStyles.payButtonText}>
                                    Pay
                                </Text>
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                ))}

                {/* Yesterday */}
                <Text style={notificationsStyles.sectionTitle}>Yesterday</Text>
                {yesterdayNotifications.map((notification) => (
                    <TouchableOpacity
                        key={notification.id}
                        style={notificationsStyles.notificationItem}
                        activeOpacity={0.7}
                    >
                        <View
                            style={[
                                notificationsStyles.notificationIconContainer,
                                { backgroundColor: notification.iconBg },
                            ]}
                        >
                            <Ionicons
                                name={notification.icon}
                                size={22}
                                color={notification.iconColor}
                            />
                        </View>
                        <View style={notificationsStyles.notificationContent}>
                            <Text style={notificationsStyles.notificationText}>
                                {notification.text}
                            </Text>
                            <Text style={notificationsStyles.notificationTime}>
                                {notification.time}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default NotificationsPage;
