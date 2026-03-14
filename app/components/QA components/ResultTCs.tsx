import { TestCase } from "@/types";
const ResultTCs = (props: { TCs: TestCase[] }) => {
    const { TCs } = props;
    return (
        <div>
            {TCs && TCs.length > 0 ? (
                <div className="mt-5">
                    <h3 className="text-lg font-bold mb-2">Test Cases:</h3>
                    <ul className="list-disc pl-5">
                        {TCs.map((tc, index) => (
                            <li key={index} className="text-black dark:text-white">
                                {tc.name} - {tc.result}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default ResultTCs;