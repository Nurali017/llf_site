import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MatchWidget from "@/components/MatchWidget";
import NewsGrid from "@/components/NewsGrid";
import AboutSection from "@/components/AboutSection";
import Aside from "@/components/Aside";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import { getFeaturedNews, getRegularNews } from "@/data/news";

export default function Home() {
  const featuredNews = getFeaturedNews();
  const regularNews = getRegularNews();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Desktop Sidebar - Sticky on the left */}
            <div className="hidden lg:block w-full lg:w-1/4">
              <Aside />
            </div>

            {/* Main Content Area */}
            <div className="w-full lg:w-3/4 flex flex-col gap-6">
              {/* Hero Section */}
              {featuredNews && (
                <Hero
                  title={featuredNews.title}
                  description={featuredNews.description}
                  date={featuredNews.date}
                  category={featuredNews.category}
                  image={featuredNews.image}
                />
              )}

              {/* Match Widget */}
              <MatchWidget />

              {/* Mobile Sidebar - Appears between Match and News on mobile */}
              <div className="block lg:hidden">
                <Aside />
              </div>

              {/* News Grid */}
              <NewsGrid news={regularNews} />
            </div>
          </div>
        </div>

        {/* About Section - Full Width (Outside Container) */}
        <AboutSection />
      </main>

      <Partners />
      <Footer />
    </div>
  );
}
