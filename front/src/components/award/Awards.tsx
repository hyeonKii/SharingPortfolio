import {get} from "api/index";
import {useEffect, useState} from "react";
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";

export default function Awards({userId, isEditable}: OwnerProps) {
    const [awards, setAwards] = useState<AwardContentsProps[]>([]);
    const [isAdd, setIsAdd] = useState(false);

    useEffect(() => {
        get("award", userId).then((awardList) => {
            setAwards(awardList);
        });
    }, [userId]);

    // awards.map 사용 시 컴포넌트를 return할 때는 {}가 아닌 () 사용해야 한다.
    // awards를 props로 넘겨줄 때 타입 지정을 어떻게 할지 제대로 구상해야 한다.

    return (
        <div className="card__block">
            <div className="card_title">수상이력</div>
            {awards.map((award) => (
                <Award
                    key={award.awardId}
                    award={award}
                    setAwards={setAwards}
                    isEditable={isEditable}
                />
            ))}
            {isAdd && (
                <AwardAddForm
                    userId={userId}
                    setAwards={setAwards}
                    setIsAdd={setIsAdd}
                />
            )}
            {isEditable && (
                <div className="awards__editBtn__block">
                    <button
                        className="awards__edit__btn"
                        onClick={() => setIsAdd(true)}
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    );
}
