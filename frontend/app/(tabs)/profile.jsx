import React, { useState, useRef } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { COLORS } from "../../constants/colors";
import { commonStyles } from "../../assets/styles/common.styles";
import { profileStyles } from "../../assets/styles/profile.styles";
import QuickActions from "../../components/QuickActions";
import AvatarPicker from "../../components/AvatarPicker";

const ProfilePage = () => {
    const router = useRouter();
    const { signOut } = useAuth();
    const [showQuickActions, setShowQuickActions] = useState(false);
    const [showAvatarPicker, setShowAvatarPicker] = useState(false);
    const [avatarPosition, setAvatarPosition] = useState(null);
    const [avatar, setAvatar] = useState(null); // null = default icon
    const avatarRef = useRef(null);

    // Quick Actions for Profile Page
    const quickActions = [
        {
            icon: "create",
            label: "Edit Profile",
            color: COLORS.primary,
            onPress: () => router.push("/(modals)/edit-profile"),
        },
        {
            icon: "images",
            label: "Change Avatar",
            color: "#10B981",
            onPress: () => handleOpenAvatarPicker(),
        },
        {
            icon: "color-palette",
            label: "Change Theme",
            color: "#8B5CF6",
            onPress: () => console.log("Change Theme"),
        },
        {
            icon: "shield-checkmark",
            label: "Security",
            color: "#F59E0B",
            onPress: () => console.log("Security"),
        },
        {
            icon: "notifications",
            label: "Notifications",
            color: "#EF4444",
            onPress: () => router.push("/(modals)/notifications"),
        },
        {
            icon: "settings",
            label: "Settings",
            color: COLORS.secondary,
            onPress: () => router.push("/(modals)/settings"),
        },
    ];

    const menuItems = [
        {
            id: 1,
            icon: "person",
            label: "Account Info",
            color: COLORS.primary,
            backgroundColor: COLORS.primary + "15",
            onPress: () => console.log("Account Info"),
        },
        {
            id: 2,
            icon: "shield-checkmark",
            label: "Security Code",
            color: "#10B981",
            backgroundColor: "#10B98115",
            onPress: () => console.log("Security Code"),
        },
        {
            id: 3,
            icon: "lock-closed",
            label: "Privacy Policy",
            color: COLORS.primary,
            backgroundColor: COLORS.primary + "15",
            onPress: () => console.log("Privacy Policy"),
        },
        {
            id: 4,
            icon: "settings",
            label: "Settings",
            color: COLORS.secondary,
            backgroundColor: COLORS.secondary + "15",
            onPress: () => router.push("/(modals)/settings"),
        },
    ];

    const handleOpenAvatarPicker = () => {
        if (avatarRef.current) {
            avatarRef.current.measure((x, y, width, height, pageX, pageY) => {
                setAvatarPosition({ x: pageX, y: pageY });
                setShowAvatarPicker(true);
            });
        } else {
            setShowAvatarPicker(true);
        }
    };

    const handleSelectAvatar = (selectedAvatar) => {
        setAvatar(selectedAvatar);
        // TODO: Upload to backend
        console.log("Avatar selected:", selectedAvatar);
    };

    const handleLogout = async () => {
        try {
            await signOut();
            router.replace("/(auth)/sign-in");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <>
            <View style={{ flex: 1, backgroundColor: COLORS.background }}>
                {/* Header */}
                <View style={commonStyles.header}>
                    <TouchableOpacity
                        style={commonStyles.headerIcon}
                        onPress={() => setShowQuickActions(true)}
                    >
                        <Ionicons name="menu" size={24} color={COLORS.text} />
                    </TouchableOpacity>
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
                        Profile
                    </Text>
                    <TouchableOpacity
                        style={commonStyles.headerIcon}
                        onPress={() => router.push("/(modals)/edit-profile")}
                    >
                        <Ionicons name="create" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Profile Header */}
                    <View style={profileStyles.profileHeader}>
                        <View
                            ref={avatarRef}
                            style={profileStyles.avatarContainer}
                        >
                            <View style={profileStyles.avatar}>
                                {avatar?.uri ? (
                                    <Image
                                        source={{ uri: avatar.uri }}
                                        style={profileStyles.avatarImage}
                                    />
                                ) : (
                                    <Ionicons
                                        name="person"
                                        size={60}
                                        color={COLORS.primary}
                                    />
                                )}
                            </View>
                            <TouchableOpacity
                                style={profileStyles.editAvatarButton}
                                onPress={handleOpenAvatarPicker}
                            >
                                <Ionicons name="camera" size={18} color={COLORS.white} />
                            </TouchableOpacity>
                        </View>
                        <Text style={profileStyles.userName}>Leslie Alexander</Text>
                        <Text style={profileStyles.userEmail}>leslie@gmail.com</Text>
                    </View>

                    {/* Menu Items */}
                    <View style={profileStyles.menuContainer}>
                        {menuItems.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={profileStyles.menuItem}
                                onPress={item.onPress}
                                activeOpacity={0.7}
                            >
                                <View
                                    style={[
                                        profileStyles.menuIconContainer,
                                        { backgroundColor: item.backgroundColor },
                                    ]}
                                >
                                    <Ionicons
                                        name={item.icon}
                                        size={22}
                                        color={item.color}
                                    />
                                </View>
                                <Text style={profileStyles.menuText}>{item.label}</Text>
                                <Ionicons
                                    name="chevron-forward"
                                    size={20}
                                    color={COLORS.textLight}
                                />
                            </TouchableOpacity>
                        ))}

                        {/* Logout */}
                        <TouchableOpacity
                            style={[profileStyles.menuItem, profileStyles.logoutItem]}
                            onPress={handleLogout}
                            activeOpacity={0.7}
                        >
                            <View
                                style={[
                                    profileStyles.menuIconContainer,
                                    profileStyles.logoutIconContainer,
                                ]}
                            >
                                <Ionicons name="log-out" size={22} color="#EF4444" />
                            </View>
                            <Text
                                style={[profileStyles.menuText, profileStyles.logoutText]}
                            >
                                Logout
                            </Text>
                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color="#EF4444"
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

            {/* Quick Actions Side Drawer */}
            <QuickActions
                visible={showQuickActions}
                onClose={() => setShowQuickActions(false)}
                actions={quickActions}
            />

            {/* Avatar Picker - Small Popup Menu */}
            <AvatarPicker
                visible={showAvatarPicker}
                onClose={() => setShowAvatarPicker(false)}
                onSelectAvatar={handleSelectAvatar}
                avatarPosition={avatarPosition}
            />
        </>
    );
};

export default ProfilePage;
