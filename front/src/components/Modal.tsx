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


//portfolio 컴포넌트에서 모달 오픈 및 비오픈 상태를 정의하고
// 해당 상태에 따라 모달 백그라운드를 여는 것을 만들 필요가 있음
// 그런데 문제는 isAdd setIsAdd는 자식 컴포넌트에 선언된 상태다
// add라는 상태를 전역 상태로 수정하는 것이 필요