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

const MyCardsPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(false);
    const [cards, setCards] = useState([]);

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

    // Fetch cards from backend
    const fetchCards = async () => {
        setIsLoading(true);
        try {
            setCards([
                {
                    id: 1,
                    type: "VISA",
                    balance: 2310.0,
                    cardNumber: "4836 7489 4562 1258",
                    cardHolder: "Leslie Alexander",
                    gradientColors: ["#FF6B9D", "#C06C84"],
                },
                {
                    id: 2,
                    type: "VISA",
                    balance: 3257.0,
                    cardNumber: "5247 5687 3025 5697",
                    cardHolder: "Leslie Alexander",
                    gradientColors: ["#667eea", "#764ba2"],
                },
                {
                    id: 3,
                    type: "VISA",
                    balance: 1962.0,
                    cardNumber: "8475 2358 2259 2053",
                    cardHolder: "Leslie Alexander",
                    gradientColors: ["#FFA751", "#FFE259"],
                },
            ]);
        } catch (error) {
            console.error("Error fetching cards:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchCards();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchCards();
    }, []);

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
                        <Ionicons name="menu" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontFamily: "NimbusReg",
                            fontSize: 28,
                            fontWeight: "bold",
                            color: COLORS.text,
                            textAlign: "center",
                        }}
                    >
                        My Cards
                    </Text>
                    <TouchableOpacity
                        style={commonStyles.headerIcon}
                        onPress={handleAddCard}
                    >
                        <Ionicons name="add" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
