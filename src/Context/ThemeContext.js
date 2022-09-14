import {createContext, useState} from "react";

export const ThemeContext = createContext({});

const ThemeContextProvider = props => {
    const [theme, setTheme] = useState(false);

    const toggleTheme = () => {
        setTheme(!theme);
    }

    theme ? document.body.classList.add('dark-body') : document.body.classList.remove('dark-body');

    return (
        <ThemeContextProvider value={{toggleTheme, theme}}>
            {props.children}
        </ThemeContextProvider>
    )
}
export default ThemeContextProvider;