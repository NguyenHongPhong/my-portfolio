import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/i18n-config";

interface paramProps {
  params: Promise<{ locale: Locale }>;
};

export default async function HomePage(props: paramProps) {
  const localeParam = await props.params;
  const { locale } = localeParam;
  const dict = await getDictionary(locale);

  return (
    <div className="container">
    </div>
  );
}
