import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { COLORS } from "../../constants/colors";
import { commonStyles } from "../../assets/styles/common.styles";
import { profileStyles } from "../../assets/styles/profile.styles";
import QuickActions from "../../components/QuickActions";
import AvatarPicker from "../../components/AvatarPicker";

const ProfilePage = () => {
    const router = useRouter();
    const { signOut, getToken } = useAuth();
    const { user, isLoaded: userLoaded } = useUser();
    const [showQuickActions, setShowQuickActions] = useState(false);
    const [showAvatarPicker, setShowAvatarPicker] = useState(false);
    const [avatarPosition, setAvatarPosition] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const avatarRef = useRef(null);

   
    const API_BASE_URL = "https://dollardairy-uags.onrender.com"; 

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

    const fetchProfileData = async () => {
        if (!userLoaded || !user) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const token = await getToken();
            
            const response = await fetch(`${API_BASE_URL}/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setProfileData(data);
            
            // Set avatar if available from backend
            if (data.avatar) {
                setAvatar({ uri: data.avatar });
            }
        } catch (err) {
            console.error('Profile fetch error:', err);
            setError(err.message);
            Alert.alert('Error', 'Failed to load profile data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, [userLoaded, user]);

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

    const handleSelectAvatar = async (selectedAvatar) => {
        setAvatar(selectedAvatar);
        
        // Upload to backend
        try {
            const token = await getToken();
            const formData = new FormData();
            if (selectedAvatar.uri.startsWith('file://') || selectedAvatar.uri.startsWith('content://')) {
                formData.append('avatar', {
                    uri: selectedAvatar.uri,
                    type: 'image/jpeg',
                    name: 'avatar.jpg',
                });
            } else {
                formData.append('avatarUrl', selectedAvatar.uri);
            }

            const response = await fetch(`${API_BASE_URL}/profile/avatar`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }
        } catch (err) {
            console.error('Avatar upload error:', err);
            Alert.alert('Error', 'Failed to update avatar.');
        }
    };

    const handleLogout = async () => {
        try {
            await signOut();
            router.replace("/(auth)/sign-in");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    const displayName = profileData?.name || user?.fullName || 'Leslie Alexander';
    const displayEmail = profileData?.email || user?.primaryEmailAddress?.emailAddress || 'leslie@gmail.com';

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
                        <Text style={profileStyles.userName}>{displayName}</Text>
                        <Text style={profileStyles.userEmail}>{displayEmail}</Text>
                        {error && (
                            <Text style={{ color: '#EF4444', textAlign: 'center', marginTop: 10 }}>
                                {error}
                            </Text>
                        )}
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
