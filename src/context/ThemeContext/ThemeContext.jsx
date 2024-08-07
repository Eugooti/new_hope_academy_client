import {createContext, useContext, useState} from "react";

const ThemeContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children }) => {


    const [light] = useState({text:'#555',uiElements:'#AAA5BA',bg:'#D0D0DB',button:'#0F2C25'});

    const [dark] = useState({text: '#ddd',uiElements: '#544671',bg:'#2E3239',button:'#0F2C25'});

    const [lightTheme, setIsLightTheme] = useState(false);

    const toggleTheme = () => {
        setIsLightTheme(!lightTheme)
    }

    return(
        <ThemeContext.Provider value={{light,dark,lightTheme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme=()=>useContext(ThemeContext)
