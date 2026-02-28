import { useState, useEffect } from "react";
import { Slot } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { StatusBar } from "expo-status-bar";
import SafeScreen from "@/components/SafeScreen";
import * as Font from "expo-font";
import { setGetToken } from "../api/client";

function AuthConfig() {
  const { getToken } = useAuth();

  useEffect(() => {
    setGetToken(getToken);
  }, [getToken]);

  return null;
}

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      NimbusReg: require("../assets/fonts/nimbu-demo.bold-bold.ttf"), // Fixed relative path
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <AuthConfig />
      <StatusBar style="auto" />
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </ClerkProvider>
  );
}
