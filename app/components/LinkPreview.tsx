'use client';

interface LinkPreviewProps {
    url: string;
}

export default function LinkPreview({ url }: LinkPreviewProps) {
    if (!url) return <p>No URL provided</p>;

    return (
        <div className="border p-2 rounded-2xl">
            <iframe
                src={url}
                className="w-full h-80 border overflow-hidden"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                title="Link Preview"
                style={{ overflow: 'hidden' }}
            />
        </div>
    );
}
