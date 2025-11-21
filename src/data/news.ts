export interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
  featured?: boolean;
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Старт заявочной кампании на сезон LLF 2025!",
    category: "Заявка",
    date: "21 ноября 2024",
    image: "/llf-application-banner.png",
    description: "Открыт прием заявок команд на участие в новом сезоне любительской лиги. Успейте зарегистрироваться!",
    featured: false
  },
  {
    id: 7,
    title: "Старт заявочной кампании на сезон LLF ASTANA 2025!",
    category: "ГЛАВНОЕ",
    date: "21 ноября 2024",
    image: "/llf-application-banner.png",
    description: "Открыт прием заявок команд на участие в новом сезоне любительской лиги. Успейте зарегистрироваться!",
    featured: true
  },
  {
    id: 2,
    title: "QJL Awards: Team of the Year",
    category: "Награды",
    date: "1 ноября 2025",
    image: "/news-1-optimized.png",
    description: "Объявлена символическая сборная сезона Freedom QJ League 2025"
  },
  {
    id: 3,
    title: "Восходящие звезды на подиуме: состоялась церемония закрытия сезона Freedom QJ League",
    category: "События",
    date: "1 ноября 2025",
    image: "/news-2-optimized.png",
    description: "Завершился яркий сезон любительской лиги мини-футбола Казахстана"
  },
  {
    id: 4,
    title: "Старт заявочной кампании на сезон 2025",
    category: "Лига",
    date: "21 ноября 2024",
    image: "/news-3.png",
    description: "Открыт прием заявок команд на участие в новом сезоне Freedom QJ League"
  },
  {
    id: 5,
    title: "Итоги финального этапа Кубка РК",
    category: "Турниры",
    date: "20 ноября 2024",
    image: "/news-4.png",
    description: "Определился победитель главного кубкового турнира страны"
  },
  {
    id: 6,
    title: "Интервью с лучшим бомбардиром сезона",
    category: "Интервью",
    date: "19 ноября 2024",
    image: "/news-1-optimized.png",
    description: "Эксклюзивное интервью с игроком, забившим больше всех голов в сезоне"
  }
];

export const getFeaturedNews = (): NewsItem | undefined => {
  return newsData.find(news => news.featured);
};

export const getRegularNews = (): NewsItem[] => {
  return newsData.filter(news => !news.featured);
};
