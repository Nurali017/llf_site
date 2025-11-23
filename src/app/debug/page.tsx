"use client";
import { useEffect, useState } from 'react';
import { getMatches } from '@/services/matches';

export default function DebugPage() {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                // Replicating the "upcoming" logic from useMatches
                const today = new Date();
                const futureStart = new Date(today);
                futureStart.setDate(today.getDate() + 1);
                const futureEnd = new Date(today);
                futureEnd.setDate(today.getDate() + 90);

                const formatDate = (date: Date) => date.toISOString().split('T')[0];

                const start = formatDate(futureStart);
                const end = formatDate(futureEnd);

                setUrl(`Organization: 2, Start: ${start}, End: ${end}`);

                const result = await getMatches(2, start, end);
                setData(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="p-8 text-black">
            <h1 className="text-2xl font-bold mb-4">Debug Upcoming Matches</h1>
            <div className="mb-4">
                <strong>Params:</strong> {url}
            </div>
            <div className="mb-4">
                <strong>API URL:</strong> {process.env.NEXT_PUBLIC_API_URL}
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {data && (
                <div>
                    <h2 className="font-bold">Count: {Array.isArray(data) ? data.length : 'Not an array'}</h2>
                    <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-[500px] text-xs">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
