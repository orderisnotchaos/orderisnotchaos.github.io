
import { useContext } from "react";
import ThemeContext from "../../contexts/themeContext";
import "./WelcomeView.css";
export default function WelcomeComponent(){
    
    const themeContext = useContext(ThemeContext);

    return(
        <>
            <h1 className="welcome-title">¡Bienvenido/a {themeContext.userName}!</h1>
            <h3 className="welcome-instruction">&#60;-- clickea ahí para agregar un nuevo negocio</h3>
        </>
     );
}