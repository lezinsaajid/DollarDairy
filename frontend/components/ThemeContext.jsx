import React, { createContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { THEMES } from "../constants/colors"; // Adjust path as needed

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme(); // "dark" or "light"
  const [themeMode, setThemeMode] = useState(systemScheme || "light");
  const [theme, setTheme] = useState(THEMES.forest);

  useEffect(() => {
    setThemeMode(systemScheme || "light");
  }, [systemScheme]);

  useEffect(() => {
    if (themeMode === "dark") setTheme(THEMES.midnight);
    else setTheme(THEMES.forest);
  }, [themeMode]);

  const switchTheme = (mode, paletteName = null) => {
    setThemeMode(mode); // "dark" or "light"
    if (paletteName && THEMES[paletteName]) setTheme(THEMES[paletteName]);
    else if (mode === "dark") setTheme(THEMES.midnight);
    else setTheme(THEMES.forest);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
