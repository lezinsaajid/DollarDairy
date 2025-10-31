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
import { addFormStyles } from "../../assets/styles/addForm.styles";

const AddIncomePage = () => {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(23);
    const [incomeTitle, setIncomeTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Salary");

    const categories = ["Salary", "Freelance", "Discount", "Investment", "Gift"];

    const handleSubmit = async () => {
        try {
            // TODO: Replace with your backend API endpoint
            // const response = await fetch('YOUR_API_ENDPOINT/add-income', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         title: incomeTitle,
            //         amount: parseFloat(amount),
            //         category: selectedCategory,
            //         date: selectedDate,
            //     }),
            // });

            console.log("Income added:", {
                title: incomeTitle,
                amount,
                category: selectedCategory,
                date: selectedDate,
            });

            // Navigate back
            router.back();
        } catch (error) {
            console.error("Error adding income:", error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                style={commonStyles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={commonStyles.header}>
                    <TouchableOpacity
                        style={commonStyles.headerIcon}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text style={commonStyles.headerTitle}>Add Income</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Calendar */}
                <View style={addFormStyles.calendarContainer}>
                    <View style={addFormStyles.calendarHeader}>
                        <TouchableOpacity>
                            <Ionicons
                                name="chevron-back"
                                size={20}
                                color={COLORS.text}
                            />
                        </TouchableOpacity>
                        <Text style={addFormStyles.calendarMonth}>April 2022</Text>
                        <TouchableOpacity>
                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color={COLORS.text}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Week Days */}
                    <View style={addFormStyles.calendarWeekDays}>
                        {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                            <Text key={index} style={addFormStyles.weekDay}>
                                {day}
                            </Text>
                        ))}
                    </View>

                    {/* Calendar Days */}
                    <View style={addFormStyles.calendarDays}>
                        {[18, 19, 20, 21, 22, 23, 24].map((day) => (
                            <TouchableOpacity
                                key={day}
                                style={[
                                    addFormStyles.dayButton,
                                    selectedDate === day && addFormStyles.selectedDay,
                                ]}
                                onPress={() => setSelectedDate(day)}
                            >
                                <Text
                                    style={[
                                        addFormStyles.dayText,
                                        selectedDate === day &&
                                            addFormStyles.selectedDayText,
                                    ]}
                                >
                                    {day}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Form */}
                <View style={addFormStyles.formContainer}>
                    {/* Income Title */}
                    <View style={addFormStyles.inputGroup}>
                        <Text style={addFormStyles.inputLabel}>Income Title</Text>
                        <TextInput
                            style={addFormStyles.textInput}
                            placeholder="Remote Job"
                            placeholderTextColor={COLORS.textLight}
                            value={incomeTitle}
                            onChangeText={setIncomeTitle}
                        />
                    </View>

                    {/* Amount */}
                    <View style={addFormStyles.inputGroup}>
                        <Text style={addFormStyles.inputLabel}>Amount</Text>
                        <View style={addFormStyles.amountInput}>
                            <Text style={addFormStyles.amountSymbol}>$</Text>
                            <TextInput
                                style={{ flex: 1, fontSize: 16, color: COLORS.text }}
                                placeholder="2500"
                                placeholderTextColor={COLORS.textLight}
                                keyboardType="numeric"
                                value={amount}
                                onChangeText={setAmount}
                            />
                        </View>
                    </View>

                    {/* Category */}
                    <View style={addFormStyles.inputGroup}>
                        <Text style={addFormStyles.inputLabel}>Category</Text>
                        <View style={addFormStyles.categoryContainer}>
                            {categories.map((category) => (
                                <TouchableOpacity
                                    key={category}
                                    style={[
                                        addFormStyles.categoryButton,
                                        selectedCategory === category &&
                                            addFormStyles.categoryButtonActive,
                                    ]}
                                    onPress={() => setSelectedCategory(category)}
                                >
                                    <Text
                                        style={[
                                            addFormStyles.categoryText,
                                            selectedCategory === category &&
                                                addFormStyles.categoryTextActive,
                                        ]}
                                    >
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity style={addFormStyles.addCategoryButton}>
                                <Ionicons name="add" size={20} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={addFormStyles.submitButton}
                        onPress={handleSubmit}
                        activeOpacity={0.8}
                    >
                        <Text style={addFormStyles.submitButtonText}>
                            Add Income
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddIncomePage;
