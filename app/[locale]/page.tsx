import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/i18n-config";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";

interface paramProps {
  params: Promise<{ locale: Locale }>;
};

export default async function HomePage(props: paramProps) {
  const localeParam = await props.params;
  const { locale } = localeParam;
  const dict = await getDictionary(locale);

  return (
    <div className="bg-white dark:bg-[#292E49]">
      <h1 className="text-black">{dict.home.title}</h1>
      <p className="text-black">{dict.home.description}</p>
      <LanguageSwitcher />
      <ThemeSwitcher />
    </div>
  );
}
