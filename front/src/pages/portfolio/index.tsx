import {Header} from "components/Header";
import {Portfolio} from "components/Portfolio";
import { memo } from "react";

export const PortfolioPage = memo(() => {
    return (
        <>
            <Header />
            <Portfolio />
        </>
    );
})
