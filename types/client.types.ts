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
};

type CountdownLeftProps = {
    setDisableTriggerBtn: React.Dispatch<React.SetStateAction<number | null>>;
};

type TestProgressProps = {
    testcases: TestCase[];
};

type CircularProps = {
    percentage: number;
    size?: number;
    strokeWidth?: number;
};

export type { HeaderProps, paramProps, TestCase, CountdownLeftProps, TestProgressProps, CircularProps };