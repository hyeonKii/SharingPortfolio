import {ReactNode} from "react";

interface IModal {
    children: ReactNode;
}

export function Modal({children}: IModal) {
    return (
        <>
            <div className="w-full h-screen bg-slate-500">{children}</div>
        </>
    );
}
