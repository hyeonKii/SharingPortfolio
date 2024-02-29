import {useState} from "react";

export const useValid = () => {
    const [emailError, setEmailError] = useState("");
    const [pwError, setPwError] = useState("");

    return {emailError, setEmailError, pwError, setPwError};
};
