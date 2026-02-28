import { useState, useEffect } from "react";
import { Slot } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { StatusBar } from "expo-status-bar";
import SafeScreen from "@/components/SafeScreen";
import * as Font from "expo-font";
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setGetToken } from "../api/client";
import { useResponsive } from "../hooks/useResponsive";
import Sidebar from "../components/Sidebar";
import { View } from "react-native";
import { COLORS } from "../constants/colors";

const queryClient = new QueryClient();

function AuthConfig() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setGetToken(getToken);
    }
  }, [isLoaded, isSignedIn]);

  return null;
}

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { isDesktop } = useResponsive();

  useEffect(() => {
    Font.loadAsync({
      "nimbu-demo": require("../assets/fonts/nimbu-demo.bold-bold.ttf"),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <AuthConfig />
        <StatusBar style="auto" />
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: COLORS.background }}>
          {isDesktop && <Sidebar />}
          <View style={{ flex: 1 }}>
            <SafeScreen>
              <Slot />
            </SafeScreen>
          </View>
        </View>
        <Toast />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
