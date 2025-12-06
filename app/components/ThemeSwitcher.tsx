"use client";
import { useState, useEffect } from "react";
import { lightMode, darkMode } from "@/constants";
const ThemeSwitcher = () => {
    const [bgColor, setBgColor] = useState({
        bgLeft: lightMode.bgLeft,
        bgRight: lightMode.bgRight
    });
    const [darkThemeOn, setDarkThemeOn] = useState(false);

    const handlerToggle = () => {
        const dom = document.documentElement;
        const isThemeDark = dom.classList.contains('dark');
        let colors = {};
        let theme = "";
        if (!isThemeDark) {
            theme = 'dark';
            colors = {
                bgLeft: darkMode.bgLeft,
                bgRight: darkMode.bgRight
            };
            setBgColor({
                bgLeft: darkMode.bgLeft,
                bgRight: darkMode.bgRight
            });
            setDarkThemeOn(true);
        } else {
            theme = "light";
            colors = {
                bgLeft: lightMode.bgLeft,
                bgRight: lightMode.bgRight
            };
            setBgColor({
                bgLeft: lightMode.bgLeft,
                bgRight: lightMode.bgRight
            });
            setDarkThemeOn(false);
        }

        const parseJsonColor = JSON.stringify(colors);
        localStorage.setItem('colors', parseJsonColor);
        localStorage.setItem('theme', theme);
        dom.classList.toggle('dark');
        dom.classList.toggle('light');

    };

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        const colors = localStorage.getItem('colors');
        const dom = document.documentElement;
        if (theme && colors) {
            dom.classList.add(theme);
            const convertColors = JSON.parse(colors);
            setBgColor(convertColors);
            if (theme === 'dark') {
                setDarkThemeOn(true);
            } else {
                setDarkThemeOn(false);
            };
        };
    }, [])

    return (
        <>
            <div className="h-6  w-14 rounded-3xl border border-white
             shadow-md relative hover:cursor-pointer
            " style={{
                    background: `linear-gradient(to right,${bgColor.bgLeft},${bgColor.bgRight}`
                }}
                onClick={handlerToggle}>
                <div
                    className={`h-full w-fit rounded-full absolute left-1 transition-all duration-500 ease-in-out ${darkThemeOn ? "-bottom-3 translate-y-3 opacity-0" : "bottom-0 translate-y-0"
                        }`}
                >
                    🌞
                </div>

                <div className={`h-full w-fit rounded-full absolute right-1 transition-all duration-500 ease-in-out ${!darkThemeOn ? "-bottom-3 translate-y-3 opacity-0" : "bottom-0 translate-y-0"}`}>
                    🌙
                </div>
            </div>
        </>
    );
};

export default ThemeSwitcher;