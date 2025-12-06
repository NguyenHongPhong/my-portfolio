import { HeaderProps } from "@/types";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
const Header = ({ about, contact, work, lang }: HeaderProps) => {
    return (
        <header className="@container">
            <div className="flex justify-between my-4 items-center ">
                <h3 className="text-black dark:text-white font-black">HONG PHONG</h3>
                <div className="hidden md:block">
                    <ul>
                        <li>{work}</li>
                        <li>{about}</li>
                        <li>{contact}</li>
                    </ul>
                </div>
                <div className="flex gap-5 items-center">
                    <ThemeSwitcher />
                    <LanguageSwitcher lang={lang} />
                </div>
            </div>
        </header>)
};

export default Header;