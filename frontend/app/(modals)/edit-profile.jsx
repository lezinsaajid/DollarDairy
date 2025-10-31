import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/colors";
import { commonStyles } from "../../assets/styles/common.styles";
import { editProfileStyles } from "../../assets/styles/editProfile.styles";

const EditProfilePage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    // Form state
    const [firstName, setFirstName] = useState("Leslie");
    const [lastName, setLastName] = useState("Alexander");
    const [email, setEmail] = useState("reallegger@gmail.com");
    const [phoneNumber, setPhoneNumber] = useState("9876543210");
    const [dateOfBirth, setDateOfBirth] = useState("04/06/2000");
    const [country, setCountry] = useState("Indonesia");

    // Profile completion percentage
    const profileCompletion = 70;

    const handleSaveChanges = async () => {
        setIsLoading(true);
        try {
            // TODO: Replace with your backend API endpoint
            // const response = await fetch('YOUR_API_ENDPOINT/update-profile', {
            //     method: 'PUT',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         firstName,
            //         lastName,
            //         email,
            //         phoneNumber,
            //         dateOfBirth,
            //         country,
            //     }),
            // });

            console.log("Profile updated:", {
                firstName,
                lastName,
                email,
                phoneNumber,
                dateOfBirth,
                country,
            });

            Alert.alert("Success", "Profile updated successfully!");
            router.back();
        } catch (error) {
            console.error("Error updating profile:", error);
            Alert.alert("Error", "Failed to update profile. Please try again.");
        } finally {
            setIsLoading(false);
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
                    <Text style={commonStyles.headerTitle}>Edit Profile</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Progress Bar */}
                    <View style={editProfileStyles.progressContainer}>
                        <Text style={editProfileStyles.progressText}>
                            You only need {100 - profileCompletion}% more!
                        </Text>
                        <View style={editProfileStyles.progressBar}>
                            <View
                                style={[
                                    editProfileStyles.progressFill,
                                    { width: `${profileCompletion}%` },
                                ]}
                            />
                        </View>
                    </View>

                    {/* Avatar Section */}
                    <View style={editProfileStyles.avatarSection}>
                        <View style={editProfileStyles.avatarContainer}>
                            <View style={editProfileStyles.avatar}>
                                <Ionicons name="person" size={50} color={COLORS.primary} />
                            </View>
                            <TouchableOpacity style={editProfileStyles.editAvatarButton}>
                                <Ionicons name="create" size={16} color={COLORS.white} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Form */}
                    <View style={editProfileStyles.formContainer}>
                        {/* First Name */}
                        <View style={editProfileStyles.inputContainer}>
                            <Text style={editProfileStyles.inputLabel}>Name</Text>
                            <TextInput
                                style={editProfileStyles.inputField}
                                value={firstName}
                                onChangeText={setFirstName}
                                placeholder="First Name"
                                placeholderTextColor={COLORS.textLight}
                            />
                        </View>

                        {/* Last Name (Read-only in design) */}
                        <View style={editProfileStyles.inputContainer}>
                            <Text style={editProfileStyles.inputLabel}>
                                Last Name
                            </Text>
                            <TextInput
                                style={editProfileStyles.inputField}
                                value={lastName}
                                onChangeText={setLastName}
                                placeholder="Last Name"
                                placeholderTextColor={COLORS.textLight}
                            />
                        </View>

                        {/* Email Address */}
                        <View style={editProfileStyles.inputContainer}>
                            <Text style={editProfileStyles.inputLabel}>
                                Email Address
                            </Text>
                            <TextInput
                                style={editProfileStyles.inputField}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="email@example.com"
                                placeholderTextColor={COLORS.textLight}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Phone Number */}
                        <View style={editProfileStyles.inputContainer}>
                            <Text style={editProfileStyles.inputLabel}>
                                Phone Number
                            </Text>
                            <TextInput
                                style={editProfileStyles.inputField}
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                placeholder="Phone Number"
                                placeholderTextColor={COLORS.textLight}
                                keyboardType="phone-pad"
                            />
                        </View>

                        {/* Date of Birth (Read-only) */}
                        <View style={editProfileStyles.inputContainer}>
                            <Text style={editProfileStyles.inputLabel}>
                                Date of Birth
                            </Text>
                            <TextInput
                                style={[
                                    editProfileStyles.inputField,
                                    editProfileStyles.disabledInput,
                                ]}
                                value={dateOfBirth}
                                editable={false}
                                placeholder="DD/MM/YYYY"
                                placeholderTextColor={COLORS.textLight}
                            />
                        </View>

                        {/* Country (Read-only) */}
                        <View style={editProfileStyles.inputContainer}>
                            <Text style={editProfileStyles.inputLabel}>Country</Text>
                            <TextInput
                                style={[
                                    editProfileStyles.inputField,
                                    editProfileStyles.disabledInput,
                                ]}
                                value={country}
                                editable={false}
                                placeholder="Country"
                                placeholderTextColor={COLORS.textLight}
                            />
                        </View>

                        {/* Save Button */}
                        <TouchableOpacity
                            style={editProfileStyles.saveButton}
                            onPress={handleSaveChanges}
                            disabled={isLoading}
                            activeOpacity={0.8}
                        >
                            <Text style={editProfileStyles.saveButtonText}>
                                {isLoading ? "Saving..." : "Record Changes"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default EditProfilePage;
