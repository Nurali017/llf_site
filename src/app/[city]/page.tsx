import Header from "@/components/Header";
import HomeContent from "@/components/HomeContent";
import AboutSection from "@/components/AboutSection";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import { OrganizationProvider } from '@/contexts/OrganizationContext';

interface CityPageProps {
    params: {
        city: string;
    };
}

export default function CityPage({ params }: CityPageProps) {
    const { city } = params;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <OrganizationProvider initialSlug={city}>
                <Header />

                <main className="flex-grow bg-gray-50">
                    <HomeContent />

                    {/* About Section - Full Width (Outside Container) */}
                    <AboutSection />
                </main>

                <Partners />
                <Footer />
            </OrganizationProvider>
        </div>
    );
}
