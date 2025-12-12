import { HeaderProps } from "@/types";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Link from "next/link";
const Header = ({ about, home, work, lang }: HeaderProps) => {
    return (
        <header className="@container">

            <div className="flex justify-between my-4 items-center ">
                <Link href={'/'}>
                    <h3 className="text-black dark:text-white font-black">HONG PHONG</h3>
                </Link>
                <div className="hidden lg:block text-black dark:text-white">
                    <ul className="md:flex gap-5">
                        <li><Link href={'/'}>{home}</Link></li>
                        <li><Link href={'/about'}>{about}</Link></li>
                        <li><Link href={'/webs-portfolio'}>{work}</Link></li>
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