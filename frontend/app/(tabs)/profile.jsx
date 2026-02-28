import React, { useState, useEffect } from "react";
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
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../constants/colors";
import { commonStyles } from "../../assets/styles/common.styles";
import { profileStyles } from "../../assets/styles/profile.styles";
import QuickActions from "../../components/QuickActions";
import InfoModal from "../../components/InfoModal";
import { useResponsive } from "../../hooks/useResponsive";
import { useCards } from "../../api/queries"; // In case we want to show card count

const ProfilePage = () => {
    const router = useRouter();
    const { signOut, getToken } = useAuth();
    const { user, isLoaded: userLoaded } = useUser();
    const [showQuickActions, setShowQuickActions] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [infoModal, setInfoModal] = useState({ visible: false, title: "", type: "", data: null });

    // Menu Item Actions
    const handleMenuPress = (item) => {
        if (item.onPress) {
            item.onPress();
            return;
        }

        switch (item.id) {
            case 1: // Account Info
                setInfoModal({
                    visible: true,
                    title: "Account Information",
                    type: "account",
                    data: {
                        fullName: user?.fullName,
                        email: user?.primaryEmailAddress?.emailAddress,
                        createdAt: user?.createdAt,
                        id: user?.id
                    }
                });
                break;
            case 2: // Security Code
                setInfoModal({
                    visible: true,
                    title: "Security Verification",
                    type: "security",
                    data: {}
                });
                break;
            case 3: // Privacy
                setInfoModal({
                    visible: true,
                    title: "Privacy Policy",
                    type: "privacy",
                    data: {}
                });
                break;
        }
    };



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
        },
        {
            id: 2,
            icon: "shield-checkmark",
            label: "Security Code",
            color: "#10B981",
            backgroundColor: "#10B98115",
        },
        {
            id: 3,
            icon: "lock-closed",
            label: "Privacy Policy",
            color: COLORS.primary,
            backgroundColor: COLORS.primary + "15",
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

    useEffect(() => {
        if (userLoaded) {
            setLoading(false);
        }
    }, [userLoaded]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            base64: true,
        });

        if (!result.canceled && result.assets[0].base64) {
            setLoading(true);
            try {
                // Clerk's setProfileImage expects a base64 string or a file
                // On web/mobile, base64 is often easier for Clerk's SDK
                await user.setProfileImage({
                    file: `data:image/jpeg;base64,${result.assets[0].base64}`,
                });

                Alert.alert('Success', 'Profile picture updated!');
            } catch (err) {
                console.error('Avatar update error:', err);
                Alert.alert('Error', 'Failed to update profile picture.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleOpenAvatarPicker = () => {
        // Instead of opening a custom AvatarPicker, we directly call pickImage
        // This assumes AvatarPicker component is no longer needed or its functionality is replaced by ImagePicker
        pickImage();
        // If AvatarPicker was meant to offer more options (e.g., predefined avatars),
        // its logic would need to be integrated here or pickImage would be one of its options.
        // For now, we're simplifying to just picking from library.
    };

    // handleSelectAvatar is no longer needed as pickImage directly handles the selection and upload via Clerk.
    // const handleSelectAvatar = async (selectedAvatar) => {
    //     setAvatar(selectedAvatar);

    //     // Upload to backend
    //     try {
    //         const token = await getToken();
    //         const formData = new FormData();
    //         if (selectedAvatar.uri.startsWith('file://') || selectedAvatar.uri.startsWith('content://')) {
    //             formData.append('avatar', {
    //                 uri: selectedAvatar.uri,
    //                 type: 'image/jpeg',
    //                 name: 'avatar.jpg',
    //             });
    //         } else {
    //             formData.append('avatarUrl', selectedAvatar.uri);
    //         }

    //         const response = await fetch(`${API_BASE_URL}/profile/avatar`, {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //             },
    //             body: formData,
    //         });

    //         if (!response.ok) {
    //             throw new Error('Upload failed');
    //         }
    //     } catch (err) {
    //         console.error('Avatar upload error:', err);
    //         Alert.alert('Error', 'Failed to update avatar.');
    //     }
    // };

    const handleLogout = async () => {
        try {
            await signOut();
            router.replace("/(auth)/sign-in");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const displayName = user?.fullName || 'User';
    const displayEmail = user?.primaryEmailAddress?.emailAddress || '';
    const { isDesktop } = useResponsive();

    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
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
                    onPress={() => setShowQuickActions(true)}
                >
                    <Ionicons name="apps-outline" size={24} color={COLORS.text} />
                </TouchableOpacity>

                <Text style={{
                    fontFamily: "nimbu-demo",
                    fontSize: 18,
                    fontWeight: "600",
                    color: COLORS.text,
                }}>Profile</Text>

                <TouchableOpacity style={commonStyles.headerIcon}>
                    <Ionicons name="settings-outline" size={24} color={COLORS.text} />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={isDesktop && commonStyles.webContainer}
            >
                <View style={isDesktop && profileStyles.desktopCenterContainer}>
                    {/* Profile Header */}
                    <View style={profileStyles.profileHeader}>
                        <View
                            style={profileStyles.avatarContainer}
                        >
                            <View style={profileStyles.avatar}>
                                {user?.imageUrl ? (
                                    <Image
                                        source={{ uri: user.imageUrl }}
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
                    </View>

                    {/* Menu Items */}
                    <View style={[profileStyles.menuContainer, isDesktop && { backgroundColor: COLORS.card, borderRadius: 20, padding: 8, marginHorizontal: 20 }]}>
                        {menuItems.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={profileStyles.menuItem}
                                onPress={() => handleMenuPress(item)}
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
                </View>
            </ScrollView>

            {/* Quick Actions Side Drawer */}
            <QuickActions
                visible={showQuickActions}
                onClose={() => setShowQuickActions(false)}
                actions={quickActions}
            />

            <InfoModal
                visible={infoModal.visible}
                onClose={() => setInfoModal({ ...infoModal, visible: false })}
                title={infoModal.title}
                type={infoModal.type}
                data={infoModal.data}
            />
        </View>
    );
};

export default ProfilePage;
