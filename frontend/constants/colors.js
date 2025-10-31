const coffeeTheme = {
    primary: "#8B593E",
    secondary: "#D4A574", // Lighter coffee/caramel for expenses
    background: "#FFF8F3",
    text: "#4A3428",
    border: "#E5D3B7",
    white: "#FFFFFF",
    textLight: "#9A8478",
    card: "#FFFFFF",
    shadow: "#000000",
};

const forestTheme = {
    primary: "#2E7D32",
    secondary: "#FFA726", // Warm orange complements green
    background: "#E8F5E9",
    text: "#1B5E20",
    border: "#C8E6C9",
    white: "#FFFFFF",
    textLight: "#66BB6A",
    card: "#FFFFFF",
    shadow: "#000000",
};

const purpleTheme = {
    primary: "#6A1B9A",
    secondary: "#FF6F00", // Deep orange for contrast
    background: "#F3E5F5",
    text: "#4A148C",
    border: "#D1C4E9",
    white: "#FFFFFF",
    textLight: "#BA68C8",
    card: "#FFFFFF",
    shadow: "#000000",
};

const oceanTheme = {
    primary: "#0277BD",
    secondary: "#FF7043", // Coral orange for contrast
    background: "#E1F5FE",
    text: "#01579B",
    border: "#B3E5FC",
    white: "#FFFFFF",
    textLight: "#4FC3F7",
    card: "#FFFFFF",
    shadow: "#000000",
};

const sunsetTheme = {
    primary: "#FF7E67",
    secondary: "#FFB74D", // Golden yellow complements coral
    background: "#FFF3F0",
    text: "#2C1810",
    border: "#FFD5CC",
    white: "#FFFFFF",
    textLight: "#FFA494",
    card: "#FFFFFF",
    shadow: "#000000",
};

const mintTheme = {
    primary: "#00B5B5",
    secondary: "#FF8A65", // Peach/coral for warmth
    background: "#E8F6F6",
    text: "#006666",
    border: "#B2E8E8",
    white: "#FFFFFF",
    textLight: "#66D9D9",
    card: "#FFFFFF",
    shadow: "#000000",
};

const midnightTheme = {
    primary: "#2C3E50",
    secondary: "#6970adff", // Warm orange for contrast
    background: "#F4F6F7",
    text: "#1A2530",
    border: "#D5D8DC",
    white: "#FFFFFF",
    textLight: "#7F8C8D",
    card: "#FFFFFF",
    shadow: "#000000",
};

const roseGoldTheme = {
    primary: "#E0BFB8",
    secondary: "#8D6E63", // Brown for elegant contrast
    background: "#FDF6F5",
    text: "#4A3B38",
    border: "#F2D9D5",
    white: "#FFFFFF",
    textLight: "#C9A9A6",
    card: "#FFFFFF",
    shadow: "#000000",
};

export const THEMES = {
    coffee: coffeeTheme,
    forest: forestTheme,
    purple: purpleTheme,
    ocean: oceanTheme,
    sunset: sunsetTheme,
    mint: mintTheme,
    midnight: midnightTheme,
    roseGold: roseGoldTheme,
};

// Helper function to add opacity to hex color
export const addOpacity = (color, opacity) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// 👇 change this to switch theme
export const COLORS = THEMES.midnight;
