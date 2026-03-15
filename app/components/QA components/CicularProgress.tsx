"use client";

type Props = {
    success: number;
    failed: number;
};

export default function DonutChart({ success, failed }: Props) {
    const total = success + failed;
    const percent = Math.round((success / total) * 100);

    return (
        <div
            style={{
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: `conic-gradient(
          #6aa786 0% ${percent}%,
          #e67a7a ${percent}% 100%
        )`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative"
            }}
        >
            {/* donut hole */}
            <div
                style={{
                    width: 160,
                    height: 160,
                    background: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 36,
                    fontWeight: 600
                }}
            >
                {percent}%
            </div>
        </div>
    );
}