import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
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

const AddIncomePage = () => {
    const router = useRouter();
    const { user } = useUser();
    const { addTransaction } = useTransactionStore();
    const { categories, fetchCategories } = useCategoryStore();

    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [incomeTitle, setIncomeTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchCategories();
    }, []);

    // Effect to set default category once loaded
    useEffect(() => {
        if (categories.length > 0 && !selectedCategory) {
            const firstIncomeCat = categories.find(c => c.type === 'income');
            if (firstIncomeCat) setSelectedCategory(firstIncomeCat);
        }
    }, [categories]);

    const validate = () => {
        const newErrors = {};
        if (!incomeTitle.trim()) {
            newErrors.title = "Title is required";
        }
        if (!amount) {
            newErrors.amount = "Amount is required";
        } else if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            newErrors.amount = "Enter a valid positive amount";
        }
        if (!selectedCategory) {
            newErrors.category = "Category is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await addTransaction({
                userId: user.id,
                title: incomeTitle,
                amount: parseFloat(amount),
                type: 'income',
                date: selectedDate,
                categoryId: selectedCategory?.id || null,
            });

            // Navigate back
            router.back();
        } catch (error) {
            console.error("Error adding income:", error);
            alert("Failed to add income. Please try again.");
        } finally {
            setIsSubmitting(false);
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
                    <Text style={commonStyles.headerTitle}>Add Income</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Calendar */}
                <View style={addFormStyles.calendarContainer}>
                    <Calendar
                        onDayPress={day => {
                            setSelectedDate(day.dateString);
                        }}
                        markedDates={{
                            [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: COLORS.primary }
                        }}
                        theme={{
                            backgroundColor: COLORS.card,
                            calendarBackground: COLORS.card,
                            textSectionTitleColor: COLORS.textLight,
                            selectedDayBackgroundColor: COLORS.primary,
                            selectedDayTextColor: COLORS.white,
                            todayTextColor: COLORS.primary,
                            dayTextColor: COLORS.text,
                            textDisabledColor: COLORS.textLight + '50',
                            dotColor: COLORS.primary,
                            selectedDotColor: COLORS.white,
                            arrowColor: COLORS.primary,
                            monthTextColor: COLORS.text,
                            indicatorColor: COLORS.primary,
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
                    {/* Income Title */}
                    <View style={addFormStyles.inputGroup}>
                        <Text style={addFormStyles.inputLabel}>Income Title</Text>
                        <TextInput
                            style={[
                                addFormStyles.textInput,
                                errors.title && { borderColor: COLORS.error || '#FF4D4D' }
                            ]}
                            placeholder="Remote Job"
                            placeholderTextColor={COLORS.textLight}
                            value={incomeTitle}
                            onChangeText={(text) => {
                                setIncomeTitle(text);
                                if (errors.title) setErrors(prev => ({ ...prev, title: null }));
                            }}
                        />
                        {errors.title && <Text style={{ color: COLORS.error || '#FF4D4D', fontSize: 12, marginTop: 4, marginLeft: 6 }}>{errors.title}</Text>}
                    </View>

                    {/* Amount */}
                    <View style={addFormStyles.inputGroup}>
                        <Text style={addFormStyles.inputLabel}>Amount</Text>
                        <View style={[
                            addFormStyles.amountInput,
                            errors.amount && { borderColor: COLORS.error || '#FF4D4D' }
                        ]}>
                            <Text style={addFormStyles.amountSymbol}>$</Text>
                            <TextInput
                                style={{ flex: 1, fontSize: 16, color: COLORS.text }}
                                placeholder="2500"
                                placeholderTextColor={COLORS.textLight}
                                keyboardType="numeric"
                                value={amount}
                                onChangeText={(text) => {
                                    setAmount(text);
                                    if (errors.amount) setErrors(prev => ({ ...prev, amount: null }));
                                }}
                            />
                        </View>
                        {errors.amount && <Text style={{ color: COLORS.error || '#FF4D4D', fontSize: 12, marginTop: 4, marginLeft: 6 }}>{errors.amount}</Text>}
                    </View>

                    {/* Category */}
                    <View style={addFormStyles.inputGroup}>
                        <Text style={addFormStyles.inputLabel}>Category</Text>
                        <View style={addFormStyles.categoryContainer}>
                            {categories.filter(c => c.type === 'income').map((category) => (
                                <TouchableOpacity
                                    key={category.id}
                                    style={[
                                        addFormStyles.categoryButton,
                                        selectedCategory?.id === category.id &&
                                        addFormStyles.categoryButtonActive,
                                    ]}
                                    onPress={() => {
                                        setSelectedCategory(category);
                                        if (errors.category) setErrors(prev => ({ ...prev, category: null }));
                                    }}
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
                            {categories.filter(c => c.type === 'income').length === 0 && (
                                <Text style={{ color: COLORS.textLight, fontSize: 12 }}>No income categories. Add one in Settings.</Text>
                            )}
                            <TouchableOpacity style={addFormStyles.addCategoryButton} onPress={() => router.push("/(modals)/settings")}>
                                <Ionicons name="add" size={20} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>
                        {errors.category && <Text style={{ color: COLORS.error || '#FF4D4D', fontSize: 12, marginTop: 4, marginLeft: 6 }}>{errors.category}</Text>}
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={[
                            addFormStyles.submitButton,
                            isSubmitting && { opacity: 0.7 }
                        ]}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                        activeOpacity={0.8}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color={COLORS.white} />
                        ) : (
                            <Text style={addFormStyles.submitButtonText}>
                                Add Income
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddIncomePage;
