import { useSignIn, useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
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
import { Ionicons } from "@expo/vector-icons";
import { authStyles } from "../../assets/styles/auth.styles";
import { COLORS } from "../../constants/colors";

const SignInScreen = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const { signInWithOAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (!isLoaded) return;
    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/"); // Navigate on success, update path as needed
      } else {
        Alert.alert("Error", "Sign in failed. Please try again.");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      Alert.alert("Error", err.errors?.[0]?.message || "Sign in failed");
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
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
              DOLLAR DAIRY
            </Text>
          </View>

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
            {/* Email Input */}
            <Text
              style={{
                color: COLORS.textLight,
                marginLeft: 6,
                marginBottom: 4,
                fontWeight: "600",
              }}
            >
              Email Address
            </Text>
            <View style={{ marginBottom: 20 }}>
              <TextInput
                style={{
                  fontSize: 16,
                  color: COLORS.text,
                  paddingVertical: 13,
                  paddingHorizontal: 15,
                  backgroundColor: COLORS.background,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                }}
                placeholder="Enter email"
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <Text
              style={{
                color: COLORS.textLight,
                marginLeft: 6,
                marginBottom: 4,
                fontWeight: "600",
              }}
            >
              Password
            </Text>
            <View style={{ position: "relative", marginBottom: 20 }}>
              <TextInput
                style={{
                  fontSize: 16,
                  color: COLORS.text,
                  paddingVertical: 13,
                  paddingHorizontal: 15,
                  backgroundColor: COLORS.background,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                }}
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
                  top: 8,
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

            {/* Sign In Button */}
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                paddingVertical: 16,
                borderRadius: 10,
                marginTop: 10,
                marginBottom: 10,
              }}
              onPress={handleSignIn}
              disabled={loading}
              activeOpacity={0.85}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: COLORS.white,
                  textAlign: "center",
                }}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Text>
            </TouchableOpacity>


            {/* Link to Sign Up */}
            <TouchableOpacity
              style={{ alignItems: "center", paddingTop: 10 }}
              onPress={() => router.push("/(auth)/sign-up")}
            >
              <Text style={{ fontSize: 15, color: COLORS.textLight }}>
                Don&apos;t have an account?
                <Text style={{ color: COLORS.primary, fontWeight: "600" }}>
                  {" "}
                  Sign up
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignInScreen;
