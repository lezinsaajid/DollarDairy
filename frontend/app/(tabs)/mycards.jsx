import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/colors";
import { commonStyles } from "../../assets/styles/common.styles";
import { myCardsStyles } from "../../assets/styles/mycards.styles";
import QuickActions from "../../components/QuickActions";

import { useCards } from "../../api/queries";

const MyCardsPage = () => {
    const router = useRouter();
    const [showQuickActions, setShowQuickActions] = useState(false);

    // Fetch cards from backend using React Query
    const { data: cards = [], isLoading, refetch } = useCards();

    // Quick Actions for MyCards Page
    const quickActions = [
        {
            icon: "add-circle",
            label: "Add New Card",
            color: COLORS.primary,
            onPress: () => router.push("/(modals)/add-card"),
        },
        {
            icon: "document-text",
            label: "View Statements",
            color: "#10B981",
            onPress: () => console.log("View Statements"),
        },
        {
            icon: "card",
            label: "Manage Cards",
            color: "#8B5CF6",
            onPress: () => console.log("Manage Cards"),
        },
        {
            icon: "shield-checkmark",
            label: "Card Security",
            color: "#F59E0B",
            onPress: () => console.log("Card Security"),
        },
        {
            icon: "lock-closed",
            label: "Block/Unblock Card",
            color: "#EF4444",
            onPress: () => console.log("Block/Unblock Card"),
        },
        {
            icon: "settings",
            label: "Settings",
            color: COLORS.secondary,
            onPress: () => router.push("/(modals)/settings"),
        },
    ];

    const onRefresh = async () => {
        await refetch();
    };

    const handleAddCard = () => {
        router.push("/(modals)/add-card");
    };

    if (isLoading && cards.length === 0) {
        return (
            <View style={commonStyles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: COLORS.background }}>
                {/* Header */}
                <View style={commonStyles.header}>
                    <TouchableOpacity
                        style={commonStyles.headerIcon}
                        onPress={() => setShowQuickActions(true)}
                    >
                        <Ionicons name="menu" size={28} color={COLORS.text} />
                    </TouchableOpacity>

                    <Text style={{
                        fontFamily: "nimbu-demo",
                        fontSize: 28,
                        fontWeight: "bold",
                        color: COLORS.text,
                        flex: 1,
                        textAlign: "center",
                    }}>My Cards</Text>

                    <TouchableOpacity
                        style={commonStyles.headerIcon}
                        onPress={() => router.push("/(modals)/add-card")}
                    >
                        <Ionicons
                            name="add-circle"
                            size={28}
                            color={COLORS.secondary}
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                    }
                    contentContainerStyle={myCardsStyles.cardsContainer}
                >
                    {/* Credit Cards */}
                    {cards.map((card) => (
                        <TouchableOpacity
                            key={card.id}
                            activeOpacity={0.9}
                            onPress={() => console.log("Card pressed:", card.id)}
                        >
                            <LinearGradient
                                colors={card.gradientColors}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={myCardsStyles.creditCard}
                            >
                                {/* Card Header */}
                                <View style={myCardsStyles.cardHeader}>
                                    <Text style={myCardsStyles.cardLogo}>
                                        {card.type}
                                    </Text>
                                    <View style={myCardsStyles.cardBalance}>
                                        <Text style={myCardsStyles.balanceLabel}>
                                            Current Balance
                                        </Text>
                                        <Text style={myCardsStyles.balanceAmount}>
                                            ${card.balance.toFixed(2)}
                                        </Text>
                                    </View>
                                </View>

                                {/* Card Number */}
                                <View>
                                    <Text style={myCardsStyles.cardNumber}>
                                        {card.cardNumber}
                                    </Text>
                                    <Text style={myCardsStyles.cardHolder}>
                                        {card.cardHolder}
                                    </Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Quick Actions Side Drawer */}
            <QuickActions
                visible={showQuickActions}
                onClose={() => setShowQuickActions(false)}
                actions={quickActions}
            />
        </>
    );
};

export default MyCardsPage;
