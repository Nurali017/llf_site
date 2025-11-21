import Image from 'next/image';

const Partners = () => {
    // Placeholder partners
    const partners = [
        { name: 'Partner 1', logo: '/kmff-logo.jpg' }, // Using existing assets as placeholders
        { name: 'Partner 2', logo: '/llf-logo.png' },
        { name: 'Partner 3', logo: '/kmff-logo.jpg' },
        { name: 'Partner 4', logo: '/llf-logo.png' },
        { name: 'Partner 5', logo: '/kmff-logo.jpg' },
    ];

    return (
        <section className="py-12 bg-kmff-dark border-t border-gray-800">
            <div className="container mx-auto px-4">
                <h3 className="text-center text-gray-400 text-sm font-bold uppercase tracking-widest mb-8">
                    Официальные партнеры
                </h3>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                    {partners.map((partner, index) => (
                        <div key={index} className="relative h-12 w-32 md:h-16 md:w-40 hover:scale-110 transition-transform duration-300 cursor-pointer">
                            <Image
                                src={partner.logo}
                                alt={partner.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
