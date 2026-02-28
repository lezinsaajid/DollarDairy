import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { COLORS } from "../../constants/colors";
import { useResponsive } from "../../hooks/useResponsive";

const TabsLayout = () => {
    const { isSignedIn, isLoaded } = useAuth();
    const { isDesktop } = useResponsive();

    if (!isLoaded) return null;

    if (!isSignedIn) return <Redirect href={"/(auth)/sign-in"} />;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textLight,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: COLORS.card,
                    borderTopColor: COLORS.border,
                    borderTopWidth: 1,
                    height: isDesktop ? 0 : (Platform.OS === "ios" ? 85 : 70),
                    display: isDesktop ? 'none' : 'flex',
                    paddingBottom: Platform.OS === "ios" ? 25 : 10,
                    paddingTop: 10,
                    elevation: 8,
                    shadowColor: COLORS.shadow,
                    shadowOffset: {
                        width: 0,
                        height: -2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="overview"
                options={{
                    title: "Overview",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "stats-chart" : "stats-chart-outline"}
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />

            {/* Center Add Button */}
            <Tabs.Screen
                name="add"
                options={{
                    title: "Add",
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.addButtonContainer}>
                            <View style={styles.addButton}>
                                <Ionicons name="add" size={32} color={COLORS.white} />
                            </View>
                        </View>
                    ),
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            {...props}
                            style={[props.style, { top: Platform.OS === "ios" ? -10 : -5 }]}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="mycards"
                options={{
                    title: "MyCards",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "card" : "card-outline"}
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "person" : "person-outline"}
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

const styles = StyleSheet.create({
    addButtonContainer: {
        top: -30,
        justifyContent: "center",
        alignItems: "center",
    },
    addButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        borderWidth: 5,
        borderColor: COLORS.background,
        overflow: 'hidden'
    },
});

export default TabsLayout;
