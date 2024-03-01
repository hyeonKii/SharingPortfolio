import {LoginPage} from "pages/login";
import {NetworkPage} from "pages/network";
import {PortfolioPage} from "pages/portfolio";
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
                        <Route path="/" element={<PortfolioPage />} />
                        <Route
                            path="/users/:userId"
                            element={<PortfolioPage />}
                        />
                        <Route path="/network" element={<NetworkPage />} />
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
