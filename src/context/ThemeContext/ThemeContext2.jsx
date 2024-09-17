import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children }) => {
    const [light] = useState({
        primary: '#3b82f6',     // Bright blue
        secondary: '#10b981',   // Emerald green
        text: '#1f2937',        // Very dark grayish blue
        subtext: '#4b5563',     // Dark grayish blue
        background: '#f3f4f6',  // Very light grayish blue
        surface: '#ffffff',     // White
        border: '#d1d5db',      // Light grayish blue
        hover: '#60a5fa',       // Lighter bright blue
        disabled: '#9ca3af',    // Grayish blue
        error: '#f5222d',
        success: '#52c41a'
    });

    const [dark] = useState({
        primary: '#60a5fa',     // Lighter bright blue
        secondary: '#34d399',   // Light emerald green
        text: '#f9fafb',        // Very light grayish blue
        subtext: '#d1d5db',     // Light grayish blue
        background: '#111827',  // Very dark blue
        surface: '#1f2937',     // Very dark grayish blue
        border: '#374151',      // Dark grayish blue
        hover: '#3b82f6',       // Bright blue
        disabled: '#6b7280',    // Grayish blue
        error: '#ff4d4f',
        success: '#73d13d'
    });

    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    const currentTheme = isDarkTheme ? dark : light;

    return (
        <ThemeContext.Provider value={{ currentTheme, isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};