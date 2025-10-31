import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import {
    View,
    Text,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { authStyles } from "../../assets/styles/auth.styles";
import { Image } from "expo-image";
import { COLORS } from "../../constants/colors";
const VerifyEmail = ({ email, onBack }) => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerification = async () => {
        if (!isLoaded) return;

        setLoading(true);
        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

            if (signUpAttempt.status === "complete") {
                await setActive({ session: signUpAttempt.createdSessionId });
            } else {
                Alert.alert("Error", "Verification failed. Please try again.");
                if (__DEV__) {
                    console.log("Sign up attempt:", signUpAttempt);
                }
            }

        } catch (err) {
            Alert.alert("Error", err.errors?.[0]?.message || "Verification failed");
            console.error("Verification error:", err);  // ✅ Fixed line 36
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={authStyles.keyboardView}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <ScrollView
                   contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 24,
            paddingVertical: 38,
          }}
          showsVerticalScrollIndicator={false}
                >
         <View style={{ alignItems: "center", marginBottom: 32 }}>
            
                    {/* Title */}
                    <Text
              style={{
                fontFamily: "NimbusReg",
                fontSize: 28,
                fontWeight: "bold",
                color: COLORS.text,
                marginBottom: 9,
                textAlign: "center",
              }}
            >
              Verify your email
            </Text>
                    <Text style={authStyles.subtitle}>We&apos;ve sent a verification code to {email}</Text>
           <View
            style={{
               backgroundColor: COLORS.card,
              borderRadius: 16,
              padding: 24,
              shadowColor: COLORS.shadow,
              shadowOpacity: 0.07,
              shadowRadius: 4,
              marginBottom: 16,
            }}
          >
                    <View style={authStyles.formContainer}>
                        {/* Verification Code Input */}
                        <View style={authStyles.inputContainer}>
                            <TextInput
                                style={authStyles.textInput}
                                placeholder="Enter verification code"
                                placeholderTextColor={COLORS.textLight}
                                value={code}
                                onChangeText={setCode}
                                keyboardType="number-pad"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Verify Button */}
                        <TouchableOpacity
                            style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
                            onPress={handleVerification}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            <Text style={authStyles.buttonText}>{loading ? "Verifying..." : "Verify Email"}</Text>
                        </TouchableOpacity>

                        {/* Back to Sign Up */}
                        <TouchableOpacity style={authStyles.linkContainer} onPress={onBack}>
                            <Text style={authStyles.linkText}>
                                <Text style={authStyles.link}>Back to Sign Up</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};
export default VerifyEmail;