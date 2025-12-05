import { getDictionary } from "../../lib/get-dictionary";

interface paramProps {
  locale: any;
};

export default async function HomePage({ locale }: paramProps) {

  const dict = await getDictionary(locale);

  return (
    <div>
      <h1>{dict.home.title}</h1>
      <p>{dict.home.description}</p>
    </div>
  );
}
