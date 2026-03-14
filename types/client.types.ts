interface HeaderProps {
    work: string,
    about: string,
    home: string,
    lang: string,
    QA: string
}

interface paramProps {
    params: Promise<{ locale: string }>;
};

type TestCase = {
    name: string;
    result: string;
}

export type { HeaderProps, paramProps, TestCase };