import Image from 'next/image';
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
        <section className="relative bg-white rounded-2xl overflow-hidden min-h-[300px] md:min-h-[350px] flex flex-col md:flex-row">
            {/* Image - Top on Mobile, Right on Desktop */}
            <div className="relative md:absolute md:top-0 md:right-0 w-full md:w-[55%] h-[250px] md:h-full order-1 md:order-2 group overflow-hidden">
                <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-105">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover md:object-cover"
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
            <div className="w-full md:w-[45%] px-8 pt-8 pb-8 md:p-12 flex flex-col md:justify-center z-10 order-2 md:order-1">
                {/* Category Badge */}
                <div className="inline-flex mb-4 md:mb-6">
                    <span className="text-kmff-blue font-bold text-sm uppercase tracking-wider">
                        {category}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-kmff-dark text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                    {title}
                </h1>

                {/* Date */}
                <div className="text-gray-400 text-sm mb-6 md:mb-8 font-medium">
                    {date}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                    <Link
                        href="/register"
                        className="bg-kmff-dark text-white px-8 py-3 rounded-full font-bold hover:bg-blue-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        Заявить команду
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
