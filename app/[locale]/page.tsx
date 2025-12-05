import { getDictionary } from "../../lib/get-dictionary";
import { Locale } from "../../i18n-config";
import LanguageSwitcher from "../components/LanguageSwitcher";
interface paramProps {
  params: Promise<{ locale: Locale }>;
};

export default async function HomePage(props: paramProps) {
  const localeParam = await props.params;
  const { locale } = localeParam;
  const dict = await getDictionary(locale);

  return (
    <div>
      <h1>{dict.home.title}</h1>
      <p>{dict.home.description}</p>
      <LanguageSwitcher />
    </div>
  );
}
