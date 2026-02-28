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
import * as ImagePicker from 'expo-image-picker';
import { useUser } from "@clerk/clerk-expo";

import { Calendar } from "react-native-calendars";

import { useCategories, useAddTransaction, scanReceipt } from "../../api/queries";
import { CURRENCIES } from "../../constants/currency";

const AddIncomePage = () => {
    const router = useRouter();
    const { user } = useUser();
    const { mutateAsync: addTransaction } = useAddTransaction();
    const { data: categories = [] } = useCategories();

    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [incomeTitle, setIncomeTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currency, setCurrency] = useState("USD");
    const [isRecurring, setIsRecurring] = useState(false);
    const [frequency, setFrequency] = useState("monthly");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [errors, setErrors] = useState({});

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

    const handleScanReceipt = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera is required!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled) {
            setIsScanning(true);
            try {
                const results = await scanReceipt(result.assets[0].uri);
                if (results.title) setIncomeTitle(results.title);
                if (results.amount) setAmount(results.amount.toString());
                if (results.date) setSelectedDate(results.date);
            } catch (err) {
                alert("Failed to scan receipt. Please enter manually.");
            } finally {
                setIsScanning(false);
            }
        }
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await addTransaction({
                userId: user.id,
                title: incomeTitle,
                amount: parseFloat(amount),
                currency,
                type: 'income',
                date: selectedDate,
                categoryId: selectedCategory?.id || null,
                isRecurring,
                frequency: isRecurring ? frequency : null,
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
                    }}>Add Income</Text>

                    <TouchableOpacity
                        style={commonStyles.headerIcon}
                        onPress={handleScanReceipt}
                        disabled={isScanning}
                    >
                        {isScanning ? (
                            <ActivityIndicator size="small" color={COLORS.primary} />
                        ) : (
                            <Ionicons name="scan" size={24} color={COLORS.primary} />
                        )}
                    </TouchableOpacity>
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
                            textDayFontFamily: 'nimbu-demo',
                            textMonthFontFamily: 'nimbu-demo',
                            textDayHeaderFontFamily: 'nimbu-demo',
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
                            {/* Currency Selector */}
                            <TouchableOpacity
                                style={{
                                    paddingHorizontal: 12,
                                    borderRightWidth: 1,
                                    borderColor: COLORS.border,
                                    marginRight: 8,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    const currentIndex = CURRENCIES.findIndex(c => c.code === currency);
                                    const nextIndex = (currentIndex + 1) % CURRENCIES.length;
                                    setCurrency(CURRENCIES[nextIndex].code);
                                }}
                            >
                                <Text style={[addFormStyles.amountSymbol, { fontSize: 18, color: COLORS.primary }]}>
                                    {CURRENCIES.find(c => c.code === currency)?.symbol}
                                </Text>
                            </TouchableOpacity>

                            <TextInput
                                style={{ flex: 1, fontSize: 16, color: COLORS.text, fontFamily: "nimbu-demo" }}
                                placeholder="2500"
                                placeholderTextColor={COLORS.textLight}
                                keyboardType="numeric"
                                value={amount}
                                onChangeText={(text) => {
                                    setAmount(text);
                                    if (errors.amount) setErrors(prev => ({ ...prev, amount: null }));
                                }}
                            />

                            <View style={{ gap: 4 }}>
                                <TouchableOpacity onPress={() => setAmount(prev => (parseFloat(prev || 0) + 1).toString())}>
                                    <Ionicons name="chevron-up" size={16} color={COLORS.textLight} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setAmount(prev => Math.max(0, parseFloat(prev || 0) - 1).toString())}>
                                    <Ionicons name="chevron-down" size={16} color={COLORS.textLight} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {errors.amount && <Text style={{ color: COLORS.error || '#FF4D4D', fontSize: 12, marginTop: 4, marginLeft: 6 }}>{errors.amount}</Text>}
                    </View>

                    {/* Recurring Option */}
                    <View style={addFormStyles.inputGroup}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={addFormStyles.inputLabel}>Recurring Transaction</Text>
                            <TouchableOpacity
                                onPress={() => setIsRecurring(!isRecurring)}
                                style={{
                                    width: 44,
                                    height: 24,
                                    borderRadius: 12,
                                    backgroundColor: isRecurring ? COLORS.primary : COLORS.border,
                                    padding: 2
                                }}
                            >
                                <View style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 10,
                                    backgroundColor: COLORS.white,
                                    transform: [{ translateX: isRecurring ? 20 : 0 }]
                                }} />
                            </TouchableOpacity>
                        </View>

                        {isRecurring && (
                            <View style={{ flexDirection: 'row', marginTop: 12 }}>
                                {['daily', 'weekly', 'monthly'].map((f) => (
                                    <TouchableOpacity
                                        key={f}
                                        style={{
                                            paddingVertical: 6,
                                            paddingHorizontal: 12,
                                            borderRadius: 8,
                                            backgroundColor: frequency === f ? COLORS.primary + '20' : COLORS.card,
                                            borderWidth: 1,
                                            borderColor: frequency === f ? COLORS.primary : COLORS.border,
                                            marginRight: 8
                                        }}
                                        onPress={() => setFrequency(f)}
                                    >
                                        <Text style={{
                                            color: frequency === f ? COLORS.primary : COLORS.text,
                                            textTransform: 'capitalize',
                                            fontSize: 12
                                        }}>{f}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
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
