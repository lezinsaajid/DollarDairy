import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Image,
    ScrollView,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "@/constants/colors";

// Default Avatar Images (You can replace these URLs with your own)
const AVATAR_IMAGES = [
    "https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=b6e3f4",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Aneka&backgroundColor=c0aede",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Lucky&backgroundColor=d1d4f9",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Bailey&backgroundColor=ffd5dc",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Milo&backgroundColor=ffdfbf",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Chloe&backgroundColor=c0aede",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Leo&backgroundColor=b6e3f4",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Luna&backgroundColor=ffd5dc",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Max&backgroundColor=b6e3f4",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Bella&backgroundColor=c0aede",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Charlie&backgroundColor=d1d4f9",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Daisy&backgroundColor=ffd5dc",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Oliver&backgroundColor=ffdfbf",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Sophie&backgroundColor=c0aede",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Jack&backgroundColor=b6e3f4",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Emma&backgroundColor=ffd5dc",
];

const AvatarPicker = ({ visible, onClose, onSelectAvatar, avatarPosition }) => {
    const [showAvatarGallery, setShowAvatarGallery] = useState(false);

    const pickImageFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            onSelectAvatar({ type: "image", uri: result.assets[0].uri });
            onClose();
        }
    };

    const handleSelectAvatar = (imageUrl) => {
        onSelectAvatar({ type: "image", uri: imageUrl });
        setShowAvatarGallery(false);
        onClose();
    };

    if (showAvatarGallery) {
        return (
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => {
                    setShowAvatarGallery(false);
                    onClose();
                }}
            >
                <Pressable
                    style={styles.fullOverlay}
                    onPress={() => {
                        setShowAvatarGallery(false);
                        onClose();
                    }}
                >
                    <View style={styles.avatarGalleryModal}>
                        <View style={styles.avatarGalleryHeader}>
                            <Text style={styles.avatarGalleryTitle}>Choose Avatar</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowAvatarGallery(false);
                                    onClose();
                                }}
                            >
                                <Ionicons name="close" size={24} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.avatarGrid}
                        >
                            {AVATAR_IMAGES.map((imageUrl, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.avatarImageButton}
                                    onPress={() => handleSelectAvatar(imageUrl)}
                                    activeOpacity={0.7}
                                >
                                    <Image
                                        source={{ uri: imageUrl }}
                                        style={styles.avatarImage}
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </Pressable>
            </Modal>
        );
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <Pressable style={styles.transparentOverlay} onPress={onClose}>
                <View
                    style={[
                        styles.popupMenu,
                        {
                            top: avatarPosition?.y + 100 || 200,
                            left: avatarPosition?.x || 20,
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={styles.menuOption}
                        onPress={pickImageFromGallery}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="images" size={20} color={COLORS.primary} />
                        <Text style={styles.menuOptionText}>Import from Gallery</Text>
                    </TouchableOpacity>

                    <View style={styles.menuDivider} />

                    <TouchableOpacity
                        style={styles.menuOption}
                        onPress={() => setShowAvatarGallery(true)}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="person-circle" size={20} color={COLORS.secondary} />
                        <Text style={styles.menuOptionText}>Select Avatar</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    transparentOverlay: {
        flex: 1,
    },
    popupMenu: {
        position: "absolute",
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 8,
        minWidth: 220,
        elevation: 8,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    menuOption: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        gap: 12,
    },
    menuOptionText: {
        fontSize: 16,
        color: COLORS.text,
        fontWeight: "500",
    },
    menuDivider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 4,
    },

    // Avatar Gallery Modal
    fullOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarGalleryModal: {
        backgroundColor: COLORS.background,
        borderRadius: 24,
        padding: 20,
        width: "90%",
        maxHeight: "80%",
    },
    avatarGalleryHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    avatarGalleryTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: COLORS.text,
    },
    avatarGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        justifyContent: "center",
    },
    avatarImageButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: COLORS.border,
    },
    avatarImage: {
        width: "100%",
        height: "100%",
    },
});

export default AvatarPicker;
