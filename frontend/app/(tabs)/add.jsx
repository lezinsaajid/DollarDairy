import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/colors";
import { commonStyles } from "../../assets/styles/common.styles";
import { addStyles } from "../../assets/styles/add.styles";

const AddPage = () => {
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const [lastAdded, setLastAdded] = useState([]);

    const fetchLastAdded = async () => {
        try {
            // TODO: Replace with your backend API endpoint
            // const response = await fetch('YOUR_API_ENDPOINT/recent-transactions');
            // const result = await response.json();
            // setLastAdded(result);

            // Sample data
            setLastAdded([
                {
                    id: 1,
                    title: "Salary",
                    date: "30 Apr 2022",
                    amount: 1500,
                    icon: "cash",
                    type: "income",
                },
                {
                    id: 2,
                    title: "Paypal",
                    date: "28 Apr 2022",
                    amount: 3500,
                    icon: "logo-paypal",
                    type: "income",
                },
                {
                    id: 3,
                    title: "Food",
                    date: "25 Apr 2022",
                    amount: -300,
                    icon: "fast-food",
                    type: "expense",
                },
                {
                    id: 4,
                    title: "Upwork",
                    date: "23 Apr 2022",
                    amount: 800,
                    icon: "briefcase",
                    type: "income",
                },
                {
                    id: 5,
                    title: "Bill",
                    date: "22 Apr 2022",
                    amount: -600,
                    icon: "receipt",
                    type: "expense",
                },
                {
                    id: 6,
                    title: "Discount",
                    date: "20 Apr 2022",
                    amount: 200,
                    icon: "pricetag",
                    type: "income",
                },
            ]);
        } catch (error) {
            console.error("Error fetching last added:", error);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchLastAdded();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchLastAdded();
    }, []);

    const handleAddIncome = () => {
        router.push("/(modals)/add-income");
    };

    const handleAddExpense = () => {
        router.push("/(modals)/add-expense");
    };


    return (
        <ScrollView
            style={commonStyles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {/* Header */}
            {/* Header Top Row */}
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingTop: 10,
                marginBottom: 20,
            }}>
                <TouchableOpacity
                    style={commonStyles.headerIcon}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>

                <Text style={{
                    fontFamily: "nimbu-demo",
                    fontSize: 18,
                    fontWeight: "600",
                    color: COLORS.text,
                }}>Add</Text>

                <View style={{ width: 32 }} />
            </View>

            {/* Add Options */}
            <View style={addStyles.optionsContainer}>
                {/* Add Income */}
                <TouchableOpacity
                    style={[addStyles.optionCard, addStyles.incomeCard]}
                    onPress={handleAddIncome}
                    activeOpacity={0.7}
                >
                    <View
                        style={[
                            addStyles.optionIconContainer,
                            addStyles.incomeIconContainer,
                        ]}
                    >
                        <Ionicons name="add" size={28} color={COLORS.primary} />
                    </View>
                    <Text style={addStyles.optionText}>Add Income</Text>
                </TouchableOpacity>

                {/* Add Expense */}
                <TouchableOpacity
                    style={[addStyles.optionCard, addStyles.expenseCard]}
                    onPress={handleAddExpense}
                    activeOpacity={0.7}
                >
                    <View
                        style={[
                            addStyles.optionIconContainer,
                            addStyles.expenseIconContainer,
                        ]}
                    >
                        <Ionicons name="remove" size={28} color={COLORS.secondary} />
                    </View>
                    <Text style={addStyles.optionText}>Add Expense</Text>
                </TouchableOpacity>
            </View>

            {/* Last Added Section */}
            <View style={addStyles.lastAddedSection}>
                <Text style={addStyles.lastAddedTitle}>Last Added</Text>

                {lastAdded.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={addStyles.transactionCard}
                        activeOpacity={0.7}
                    >
                        <View style={addStyles.transactionLeft}>
                            <View
                                style={[
                                    addStyles.transactionIconContainer,
                                    {
                                        backgroundColor:
                                            item.type === "income"
                                                ? COLORS.primary + "15"
                                                : COLORS.secondary + "15",
                                    },
                                ]}
                            >
                                <Ionicons
                                    name={item.icon}
                                    size={24}
                                    color={
                                        item.type === "income"
                                            ? COLORS.primary
                                            : COLORS.secondary
                                    }
                                />
                            </View>
                            <View>
                                <Text style={addStyles.transactionTitle}>
                                    {item.title}
                                </Text>
                                <Text style={addStyles.transactionDate}>
                                    {item.date}
                                </Text>
                            </View>
                        </View>
                        <Text
                            style={[
                                addStyles.transactionAmount,
                                item.amount > 0
                                    ? addStyles.positiveAmount
                                    : addStyles.negativeAmount,
                            ]}
                        >
                            {item.amount > 0 ? "+" : ""}${Math.abs(item.amount)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

export default AddPage;
