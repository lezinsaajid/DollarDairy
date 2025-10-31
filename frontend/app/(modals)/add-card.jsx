import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/colors";
import { commonStyles } from "../../assets/styles/common.styles";
import { addCardStyles } from "@/assets/styles/addCard.styles";

const AddCardPage = () => {
    const router = useRouter();
    const [cardType, setCardType] = useState("debit"); // 'debit' or 'credit'
    const [cardNumbers, setCardNumbers] = useState(["", "", "", ""]);
    const [selectedMonth, setSelectedMonth] = useState("06");
    const [selectedYear, setSelectedYear] = useState("2018");
    const [cardholderName, setCardholderName] = useState("");

    const handleCardNumberChange = (index, value) => {
        // Only allow numbers and limit to 4 digits
        const numericValue = value.replace(/[^0-9]/g, "").slice(0, 4);
        const newCardNumbers = [...cardNumbers];
        newCardNumbers[index] = numericValue;
        setCardNumbers(newCardNumbers);
    };

    const handleSubmit = async () => {
        try {
            const fullCardNumber = cardNumbers.join(" ");
            
            // TODO: Replace with your backend API endpoint
            // const response = await fetch('YOUR_API_ENDPOINT/add-card', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         cardType,
            //         cardNumber: fullCardNumber,
            //         expiryMonth: selectedMonth,
            //         expiryYear: selectedYear,
            //         cardholderName,
            //     }),
            // });

            console.log("Card added:", {
                cardType,
                cardNumber: fullCardNumber,
                expiryMonth: selectedMonth,
                expiryYear: selectedYear,
                cardholderName,
            });

            // Navigate back
            router.back();
        } catch (error) {
            console.error("Error adding card:", error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={commonStyles.container}>
                {/* Header */}
                <View style={commonStyles.header}>
                    <TouchableOpacity
                        style={commonStyles.headerIcon}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text style={commonStyles.headerTitle}>ADD NEW CARD</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={addCardStyles.formContainer}
                >
                    {/* Card Type Tabs */}
                    <View style={addCardStyles.tabContainer}>
                        <TouchableOpacity
                            style={[
                                addCardStyles.tab,
                                cardType === "debit" && addCardStyles.activeTab,
                            ]}
                            onPress={() => setCardType("debit")}
                        >
                            <Text
                                style={[
                                    addCardStyles.tabText,
                                    cardType === "debit" && addCardStyles.activeTabText,
                                ]}
                            >
                                DEBIT CARD
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                addCardStyles.tab,
                                cardType === "credit" && addCardStyles.activeTab,
                            ]}
                            onPress={() => setCardType("credit")}
                        >
                            <Text
                                style={[
                                    addCardStyles.tabText,
                                    cardType === "credit" && addCardStyles.activeTabText,
                                ]}
                            >
                                CREDIT CARD
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Card Number */}
                    <View style={addCardStyles.cardNumberContainer}>
                        <Text style={addCardStyles.label}>Card Number</Text>
                        <View style={addCardStyles.cardNumberRow}>
                            {cardNumbers.map((number, index) => (
                                <TextInput
                                    key={index}
                                    style={addCardStyles.cardNumberInput}
                                    value={number}
                                    onChangeText={(value) =>
                                        handleCardNumberChange(index, value)
                                    }
                                    keyboardType="numeric"
                                    maxLength={4}
                                    placeholder="0000"
                                    placeholderTextColor={COLORS.textLight}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Expiry Date */}
                    <View style={addCardStyles.dateContainer}>
                        <View style={addCardStyles.dateSelector}>
                            <Text style={addCardStyles.label}>Select Month</Text>
                            <TextInput
                                style={addCardStyles.dateInput}
                                value={selectedMonth}
                                onChangeText={setSelectedMonth}
                                placeholder="MM"
                                placeholderTextColor={COLORS.textLight}
                                keyboardType="numeric"
                                maxLength={2}
                            />
                        </View>
                        <View style={addCardStyles.dateSelector}>
                            <Text style={addCardStyles.label}>Select Year</Text>
                            <TextInput
                                style={addCardStyles.dateInput}
                                value={selectedYear}
                                onChangeText={setSelectedYear}
                                placeholder="YYYY"
                                placeholderTextColor={COLORS.textLight}
                                keyboardType="numeric"
                                maxLength={4}
                            />
                        </View>
                    </View>

                    {/* Cardholder Name */}
                    <View style={addCardStyles.nameContainer}>
                        <Text style={addCardStyles.label}>Card Holder Name</Text>
                        <TextInput
                            style={addCardStyles.nameInput}
                            value={cardholderName}
                            onChangeText={setCardholderName}
                            placeholder="Amit Kumar"
                            placeholderTextColor={COLORS.textLight}
                        />
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={addCardStyles.submitButton}
                        onPress={handleSubmit}
                        activeOpacity={0.8}
                    >
                        <Text style={addCardStyles.submitButtonText}>ADD CARD</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default AddCardPage;
