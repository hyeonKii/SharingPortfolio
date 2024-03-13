import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import {AuthContextProvider} from "context/AuthContext.tsx";
import {ToastContainer} from "react-toastify";
// import {ModalProvider} from "context/ModalContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AuthContextProvider>
        <ToastContainer />
        {/* <ModalProvider> */}
            <App />
        {/* </ModalProvider> */}
    </AuthContextProvider>
);
