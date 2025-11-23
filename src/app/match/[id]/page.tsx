export default function MatchPage({ params }: { params: { id: string } }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Матч #{params.id}</h1>
                <p className="text-gray-500">Страница матча в разработке</p>
            </div>
        </div>
    );
}
