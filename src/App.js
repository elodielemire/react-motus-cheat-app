import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Form from './Components/Form'
import TusmoForm from './Components/TusmoForm'
import logo from './logo.png';

function App() {

    return (
        <div className="App">
            <h1 className="text-center text-warning">
                <img src={logo} style={{width: "100%"}}/>
                Cheat app
            </h1>
            <TusmoForm />
        </div>
    );
}

export default App;
