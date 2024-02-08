import {BrowserRouter as Router} from "react-router-dom";
import Routers from "components/Router";
import {useContext} from "react";
import {UserStateContext} from "context/AuthContext";
import {ToastContainer} from "react-toastify";

function App() {
    const userState = useContext(UserStateContext);
    const isAuth = !!userState.user;

    return (
        <>
            <ToastContainer />
            <Router>
                <Routers isAuth={isAuth} />
            </Router>
        </>
    );
}

export default App;
