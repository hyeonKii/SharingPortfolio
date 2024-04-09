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

    return (
        <div className="card__block">
            <div className="flex flex-row items-center px-4">
                <div className="w-24 h-8 mx-auto pt-0.5 bg-blue-400 rounded-full text-lg text-white font-bold text-center">
                    수상 이력
                </div>
                {isEditable && (
                    <div>
                        <button
                            className="w-8 h-8 pb-0.5 border border-2 border-blue-500 rounded-lg text-blue-500 font-bold"
                            onClick={() => setIsAdd(true)}
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
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
        </div>
    );
}
