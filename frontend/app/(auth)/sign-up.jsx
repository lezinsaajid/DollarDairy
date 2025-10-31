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
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import { authStyles } from "../../assets/styles/auth.styles";
import { COLORS } from "../../constants/colors";

import { Ionicons } from "@expo/vector-icons";
import VerifyEmail from "./verify-email";

const SignUpScreen = () => {
    const router = useRouter();
    const { isLoaded, signUp } = useSignUp();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pendingVerification, setPendingVerification] = useState(false);

    const handleSignUp = async () => {
        if (!email || !password || !firstname || !lastname) return Alert.alert("Error", "Please fill in all fields");
        if (password.length < 6) return Alert.alert("Error", "Password must be at least 6 characters");

        if (!isLoaded) return;

        setLoading(true);

        try {
            await signUp.create({ firstName: firstname, lastName: lastname, emailAddress: email, password });

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            setPendingVerification(true);
        } catch (err) {
            Alert.alert("Error", err.errors?.[0]?.message || "Failed to create account");
            console.error("Sign up error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (pendingVerification)
        return <VerifyEmail email={email} onBack={() => setPendingVerification(false)} />;

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                style={authStyles.keyboardView}
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
              Create your account
            </Text>
             <Text style={{ color: COLORS.textLight, textAlign: 'center', marginBottom: 24 }}>
        Welcome! Please fill in the details to get started.
      </Text>
          

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
<View style={{ flexDirection: 'row', marginBottom: 20, gap: 10 }}>
        <TextInput
          value={firstname}
          placeholder="First name"
          placeholderTextColor={COLORS.textLight}
          onChangeText={setFirstName}
          style={authStyles.textInput}
        />
        <TextInput
          value={lastname}
          placeholder="Last name"
          placeholderTextColor={COLORS.textLight}
          onChangeText={setLastName}
          style={authStyles.textInput}
        />
      </View>

                        {/* Email Input */}
                        <View style={authStyles.inputContainer}>
                            <TextInput
                                style={authStyles.textInput}
                                placeholder="Enter email"
                                placeholderTextColor={COLORS.textLight}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Password Input */}
                        <View style={authStyles.inputContainer}>
                            <TextInput
                                style={authStyles.textInput}
                                placeholder="Enter password"
                                placeholderTextColor={COLORS.textLight}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={{
                  position: "absolute",
                  right: 16,
                  top: 10,
                  padding: 4,
                }}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={22}
                                    color={COLORS.textLight}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Sign Up Button */}
                        <TouchableOpacity
                            style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
                            onPress={handleSignUp}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            <Text style={authStyles.buttonText}>
                                {loading ? "Creating Account..." : "Sign Up"}
                            </Text>
                        </TouchableOpacity>

                        {/* Sign In Link */}
                        <TouchableOpacity style={authStyles.linkContainer} onPress={() => router.back()}>
                            <Text style={authStyles.linkText}>
                                Already have an account? <Text style={authStyles.link}>Sign In</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                  </View>  
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};
export default SignUpScreen;