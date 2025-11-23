"use client";

import Image from 'next/image';
import { usePartners } from '@/hooks/usePartners';
import { getImageUrl, handleImageError } from '@/utils/image';
import { useOrganization } from '@/contexts/OrganizationContext';

const Partners = () => {
    const { selectedOrganization } = useOrganization();
    const { partners, isLoading } = usePartners(selectedOrganization?.id);

    if (isLoading) {
        return null; // Or a loading skeleton if preferred
    }

    if (!partners || partners.length === 0) {
        return null;
    }

    return (
        <section className="py-12 bg-kmff-dark border-t border-gray-800">
            <div className="container mx-auto px-4 overflow-hidden">
                <h3 className="text-center text-gray-400 text-sm font-bold uppercase tracking-widest mb-8">
                    Официальные партнеры
                </h3>
                <div className="flex items-center gap-16 animate-marquee whitespace-nowrap w-max">
                    {/* Duplicate list for infinite scroll effect */}
                    {[...partners, ...partners, ...partners].map((partner, index) => (
                        <a
                            key={`${partner.id}-${index}`}
                            href={partner.link || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative h-36 w-72 md:h-48 md:w-96 hover:scale-110 transition-transform duration-300 block flex-shrink-0 cursor-pointer"
                        >
                            <Image
                                src={getImageUrl(partner.image)}
                                alt={partner.name}
                                fill
                                sizes="(max-width: 768px) 50vw, 20vw"
                                className="object-contain"
                                onError={handleImageError}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
