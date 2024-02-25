import {useState} from "react";

export const DateInventory = () => {
    const [show, setShow] = useState(false);

    const onClose = () => {
        setShow((prev) => !prev);
    };

    const options = {
        title: "날짜/기간 설정",
        autoHide: true,
        todayBtn: true,
        todayBtnText: "Today",
        clearBtn: true,
        clearBtnText: "Clear",
        maxDate: new Date("2030-01-01"),
        minDate: new Date("1950-01-01"),
        theme: {
            background: "bg-gray-700 dark:bg-gray-800",
            todayBtn: "",
            clearBtn: "",
            icons: "",
            text: "",
            disabledText: "bg-gray-500",
            input: "",
            inputIcon: "",
            selected: "",
        },
        icons: {
            // () => ReactElement | JSX.Element
            prev: () => <span>&lsaquo;</span>,
            next: () => <span>&rsaquo;</span>,
        },
        datepickerClassNames: "top-12",
        defaultDate: new Date(),
        language: "ko",
        disabledDates: [],
        weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        inputNameProp: "date",
        inputIdProp: "date",
        inputPlaceholderProp: "Select Date",
        inputDateFormatProp: {
            day: "numeric",
            month: "long",
            year: "numeric",
        },
    };

    return {show, onClose, options};
};
