import {useContext} from "react";
import {ThemeContext} from "../Context/ThemeContext";
import "./ToggleButton.css";

export default function ToggleButton() {
    const {toggleTheme, theme} = useContext(ThemeContext);

    return (
        <button
        onClick={toggleTheme}
        className="toggle-button">
            {theme ? "Light mode" : "Dark mode"}
        </button>
    );
}