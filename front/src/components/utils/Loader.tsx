
export const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-dvh mb">
            <div className="text-2xl text-white">로딩 중</div>
            <img src={'/LoadSpinner.svg'} alt="로딩중" />
        </div>
    );
};
