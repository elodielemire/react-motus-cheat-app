import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import TusmoForm from './Components/TusmoForm'
import logo from './logo.png';
import ThemeContextProvider from "./Context/ThemeContext";

function App() {

    return (
        <div className="App">
            <ThemeContextProvider>
                <>
                    <h1 className="text-center text-warning">
                        <img src={logo} style={{width: "100%"}} alt="logo"/>
                        Cheat app
                    </h1>
                    <TusmoForm />
                </>
            </ThemeContextProvider>
        </div>
    );
}

export default App;
