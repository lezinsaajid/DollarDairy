import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/colors";
import { commonStyles } from "../../assets/styles/common.styles";
import { settingsStyles } from "../../assets/styles/settings.styles";

const SettingsPage = () => {
    const router = useRouter();

    const settingsItems = [
        {
            id: 1,
            icon: "card",
            label: "Payment",
            color: COLORS.primary,
            backgroundColor: COLORS.primary + "15",
        },
        {
            id: 2,
            icon: "pulse",
            label: "Activity",
            color: "#FFA726",
            backgroundColor: "#FFA72615",
        },
        {
            id: 3,
            icon: "chatbubbles",
            label: "Message Center",
            color: "#78909C",
            backgroundColor: "#78909C15",
        },
        {
            id: 4,
            icon: "notifications",
            label: "Reminder",
            color: COLORS.secondary,
            backgroundColor: COLORS.secondary + "15",
        },
        {
            id: 5,
            icon: "language",
            label: "Language",
            color: "#EF5350",
            backgroundColor: "#EF535015",
            hasFlag: true,
        },
        {
            id: 6,
            icon: "help-circle",
            label: "FAQs",
            color: COLORS.primary,
            backgroundColor: COLORS.primary + "15",
        },
        {
            id: 7,
            icon: "send",
            label: "Send Feedback",
            color: "#AB47BC",
            backgroundColor: "#AB47BC15",
        },
        {
            id: 8,
            icon: "warning",
            label: "Report a Problem",
            color: "#EF4444",
            backgroundColor: "#EF444415",
        },
    ];

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
                <Text style={commonStyles.headerTitle}>Settings</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={settingsStyles.settingsContainer}
            >
                {settingsItems.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={settingsStyles.settingItem}
                        activeOpacity={0.7}
                        onPress={() => console.log(item.label)}
                    >
                        <View
                            style={[
                                settingsStyles.settingIconContainer,
                                { backgroundColor: item.backgroundColor },
                            ]}
                        >
                            <Ionicons name={item.icon} size={22} color={item.color} />
                        </View>
                        <Text style={settingsStyles.settingText}>{item.label}</Text>
                        {item.hasFlag && (
                            <Text style={settingsStyles.languageFlag}>🇺🇸</Text>
                        )}
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={COLORS.textLight}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default SettingsPage;
