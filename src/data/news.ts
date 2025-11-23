export interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
  featured?: boolean;
  branch: string;
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Старт заявочной кампании на сезон LLF 2025!",
    category: "Заявка",
    date: "21 ноября 2024",
    image: "/llf-application-banner.png",
    description: "Открыт прием заявок команд на участие в новом сезоне любительской лиги. Успейте зарегистрироваться!",
    featured: false,
    branch: 'astana'
  },
  {
    id: 7,
    title: "Старт заявочной кампании на сезон LLF ASTANA 2025!",
    category: "ГЛАВНОЕ",
    date: "21 ноября 2024",
    image: "/llf-application-banner.png",
    description: "Открыт прием заявок команд на участие в новом сезоне любительской лиги. Успейте зарегистрироваться!",
    featured: true,
    branch: 'astana'
  },
  {
    id: 2,
    title: "QJL Awards: Team of the Year",
    category: "Награды",
    date: "1 ноября 2025",
    image: "/news-1-optimized.png",
    description: "Объявлена символическая сборная сезона Freedom QJ League 2025",
    branch: 'astana'
  },
  {
    id: 3,
    title: "Восходящие звезды на подиуме: состоялась церемония закрытия сезона Freedom QJ League",
    category: "События",
    date: "1 ноября 2025",
    image: "/news-2-optimized.png",
    description: "Завершился яркий сезон любительской лиги мини-футбола Казахстана",
    featured: true,
    branch: 'almaty'
  },
  {
    id: 4,
    title: "Старт заявочной кампании на сезон 2025 в Шымкенте",
    category: "ГЛАВНОЕ",
    date: "21 ноября 2024",
    image: "/news-3.png",
    description: "Открыт прием заявок команд на участие в новом сезоне Freedom QJ League в Шымкенте",
    featured: true,
    branch: 'shymkent'
  },
  {
    id: 5,
    title: "Актобе принимает финал Кубка Республики",
    category: "ГЛАВНОЕ",
    date: "20 ноября 2024",
    image: "/news-4.png",
    description: "Определился победитель главного кубкового турнира страны в Актобе",
    featured: true,
    branch: 'aktobe'
  },
  {
    id: 6,
    title: "Шахтер Караганда - Чемпион сезона 2024!",
    category: "ГЛАВНОЕ",
    date: "19 ноября 2024",
    image: "/news-1-optimized.png",
    description: "Караганда празднует победу в чемпионате Казахстана по мини-футболу",
    featured: true,
    branch: 'karaganda'
  },
  {
    id: 8,
    title: "Иртыш одержал победу в домашнем матче",
    category: "События",
    date: "20 ноября 2024",
    image: "/news-2-optimized.png",
    description: "Павлодарский Иртыш продолжает радовать болельщиков яркой игрой",
    featured: true,
    branch: 'pavlodar'
  }
];

// Получить все новости по филиалу
export const getNewsByBranch = (branch: string): NewsItem[] => {
  return newsData.filter(news => news.branch === branch);
};

// Получить главную новость филиала
export const getFeaturedNewsByBranch = (branch: string): NewsItem | undefined => {
  return newsData.find(news => news.featured && news.branch === branch);
};

// Получить обычные новости (не featured) филиала
export const getRegularNewsByBranch = (branch: string): NewsItem[] => {
  return newsData.filter(news => !news.featured && news.branch === branch);
};

// Оригинальные функции (deprecated, оставлены для совместимости)
export const getFeaturedNews = (): NewsItem | undefined => {
  return newsData.find(news => news.featured);
};

export const getRegularNews = (): NewsItem[] => {
  return newsData.filter(news => !news.featured);
};
