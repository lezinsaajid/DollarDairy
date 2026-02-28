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

import { Calendar } from "react-native-calendars";

import { useUser } from "@clerk/clerk-expo";
import useTransactionStore from "../../store/useTransactionStore";
import useCategoryStore from "../../store/useCategoryStore";

const AddExpensePage = () => {
    const router = useRouter();
    const { user } = useUser();
    const { addTransaction } = useTransactionStore();
    const { categories, fetchCategories } = useCategoryStore();

    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [expenseTitle, setExpenseTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    // Effect to set default category once loaded
    useEffect(() => {
        if (categories.length > 0 && !selectedCategory) {
            const firstExpenseCat = categories.find(c => c.type === 'expense');
            if (firstExpenseCat) setSelectedCategory(firstExpenseCat);
        }
    }, [categories]);

    const handleSubmit = async () => {
        if (!expenseTitle || !amount) {
            alert("Please fill in all fields");
            return;
        }

        try {
            await addTransaction({
                userId: user.id,
                title: expenseTitle,
                amount: parseFloat(amount),
                type: 'expense',
                date: selectedDate,
                categoryId: selectedCategory?.id || null,
            });

            // Navigate back
            router.back();
        } catch (error) {
            console.error("Error adding expense:", error);
            alert("Failed to add expense. Please try again.");
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
                        onPress={() => router.push("/(tabs)/add")}
                    >
                        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                    </TouchableOpacity>

                    <Text style={commonStyles.headerTitle}>Add Expense</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Calendar */}
                <View style={addFormStyles.calendarContainer}>
                    <Calendar
                        onDayPress={day => {
                            setSelectedDate(day.dateString);
                        }}
                        markedDates={{
                            [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: COLORS.secondary }
                        }}
                        theme={{
                            backgroundColor: COLORS.card,
                            calendarBackground: COLORS.card,
                            textSectionTitleColor: COLORS.textLight,
                            selectedDayBackgroundColor: COLORS.secondary,
                            selectedDayTextColor: COLORS.white,
                            todayTextColor: COLORS.secondary,
                            dayTextColor: COLORS.text,
                            textDisabledColor: COLORS.textLight + '50',
                            dotColor: COLORS.secondary,
                            selectedDotColor: COLORS.white,
                            arrowColor: COLORS.secondary,
                            monthTextColor: COLORS.text,
                            indicatorColor: COLORS.secondary,
                            textDayFontFamily: 'NimbusReg',
                            textMonthFontFamily: 'NimbusReg',
                            textDayHeaderFontFamily: 'NimbusReg',
                            textDayFontWeight: '400',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '400',
                            textDayFontSize: 14,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 12
                        }}
                    />
                </View>

                {/* Form */}
                <View style={addFormStyles.formContainer}>
                    {/* Expense Title */}
                    <View style={addFormStyles.inputGroup}>
                        <Text style={addFormStyles.inputLabel}>Expense Title</Text>
                        <TextInput
                            style={addFormStyles.textInput}
                            placeholder="Groceries"
                            placeholderTextColor={COLORS.textLight}
                            value={expenseTitle}
                            onChangeText={setExpenseTitle}
                        />
                    </View>

                    {/* Amount */}
                    <View style={addFormStyles.inputGroup}>
                        <Text style={addFormStyles.inputLabel}>Amount</Text>
                        <View style={addFormStyles.amountInput}>
                            <Text style={addFormStyles.amountSymbol}>$</Text>
                            <TextInput
                                style={{ flex: 1, fontSize: 16, color: COLORS.text }}
                                placeholder="150"
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
                            {categories.filter(c => c.type === 'expense').map((category) => (
                                <TouchableOpacity
                                    key={category.id}
                                    style={[
                                        addFormStyles.categoryButton,
                                        selectedCategory?.id === category.id &&
                                        addFormStyles.categoryButtonExpenseActive,
                                    ]}
                                    onPress={() => setSelectedCategory(category)}
                                >
                                    <Text
                                        style={[
                                            addFormStyles.categoryText,
                                            selectedCategory?.id === category.id &&
                                            addFormStyles.categoryTextActive,
                                        ]}
                                    >
                                        {category.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                            {categories.filter(c => c.type === 'expense').length === 0 && (
                                <Text style={{ color: COLORS.textLight, fontSize: 12 }}>No expense categories. Add one in Settings.</Text>
                            )}
                            <TouchableOpacity style={addFormStyles.addCategoryButton} onPress={() => router.push("/(modals)/settings")}>
                                <Ionicons name="add" size={20} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={[
                            addFormStyles.submitButton,
                            addFormStyles.submitButtonExpense,
                        ]}
                        onPress={handleSubmit}
                        activeOpacity={0.8}
                    >
                        <Text style={addFormStyles.submitButtonText}>
                            Add Expense
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddExpensePage;
