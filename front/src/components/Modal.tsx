// import {ReactNode} from "react";

// interface IModal {
//     children: ReactNode;
// }

export function Modal() {
    return (
        <>
            <div className="w-full h-screen bg-slate-500"></div>
        </>
    );
}


//portfolio 컴포넌트에서 모달 오픈 및 비오픈 상태를 정의하고
// 해당 상태에 따라 모달 백그라운드를 여는 것을 만들 필요가 있음
// 그런데 문제는 isAdd setIsAdd는 자식 컴포넌트에 선언된 상태다
// add라는 상태를 portfolio에 정의해서 setIsAdd를 각 컴포넌트에 props로 전달
// 전달받은 setIsAdd는 + 버튼을 누르면 호출하도록 설정
