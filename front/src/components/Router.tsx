import {LoginPage} from "pages/login";
import {Network} from "pages/network";
import {Portfolio} from "pages/portfolio";
import {RegisterPage} from "pages/register";
import {Route, Routes} from "react-router-dom";

interface RouterProps {
    isAuth: boolean;
}

export default function Routers({isAuth}: RouterProps) {
    return (
        <>
            <Routes>
                {isAuth ? (
                    <>
                        <Route path="/" element={<Portfolio />} />
                        <Route path="/users/:userId" element={<Portfolio />} />
                        <Route path="/network" element={<Network />} />
                    </>
                ) : (
                    <>
                        <Route path="*" element={<LoginPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </>
                )}
            </Routes>
        </>
    );
}
