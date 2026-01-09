import Image from 'next/image';
import { getImageUrl } from '@/utils/image';
import Link from 'next/link';

interface HeroProps {
    title: string;
    description: string;
    date: string;
    category: string;
    image: string;
}

const Hero = ({ title, description, date, category, image }: HeroProps) => {
    return (
        <section className="relative bg-white rounded-lg overflow-hidden min-h-[400px] md:min-h-[450px] flex flex-col md:flex-row">
            {/* Image - Top on Mobile, Right on Desktop */}
            <div className="relative md:absolute md:top-0 md:right-0 w-full md:w-[55%] h-[250px] md:h-[350px] order-1 md:order-2 group overflow-hidden">
                <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-105">
                    <Image
                        src={getImageUrl(image)}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        style={{
                            maskImage: "url('/mask-news-hero.png')",
                            maskSize: "100% 100%",
                            maskRepeat: "no-repeat",
                            WebkitMaskImage: "url('/mask-news-hero.png')",
                            WebkitMaskSize: "100% 100%",
                            WebkitMaskRepeat: "no-repeat",
                        }}
                        priority
                    />
                </div>
            </div>

            {/* Content - Bottom on Mobile, Left on Desktop */}
            <div className="w-full md:w-[45%] px-10 py-10 md:px-14 md:py-12 flex flex-col md:justify-center z-10 order-2 md:order-1">
                {/* Category Badge */}
                <div className="inline-flex mb-4 md:mb-6">
                    <span className="text-kmff-blue font-semibold text-sm uppercase tracking-wider">
                        {category}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-kmff-dark text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 md:mb-6 leading-[1.2]">
                    {title}
                </h1>

                {/* Date */}
                <div className="text-gray-600 text-sm mb-6 md:mb-8 font-medium">
                    {date}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                    <Link
                        href="/register"
                        className="bg-kmff-dark text-white px-5 py-3 rounded-full font-semibold hover:bg-blue-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        Заявить команду
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
