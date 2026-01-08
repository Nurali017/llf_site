import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-mono-100 text-mono-0 pt-16 pb-8 border-t-4 border-mono-0">
            <div className="container mx-auto px-4">

                {/* Top Section: Logo & About */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand - Text Only */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="mb-6">
                            <h2 className="font-display text-2xl font-bold tracking-tight mb-2">
                                КФМФ
                            </h2>
                        </div>
                        <p className="font-mono text-micro leading-relaxed mb-6 opacity-70">
                            Официальный сайт Казахстанской федерации мини-футбола. Развитие и популяризация мини-футбола в Казахстане.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="font-mono text-micro uppercase border-2 border-mono-0 px-3 py-1 transition-opacity hover:opacity-70">
                                IG
                            </a>
                            <a href="#" className="font-mono text-micro uppercase border-2 border-mono-0 px-3 py-1 transition-opacity hover:opacity-70">
                                FB
                            </a>
                            <a href="#" className="font-mono text-micro uppercase border-2 border-mono-0 px-3 py-1 transition-opacity hover:opacity-70">
                                YT
                            </a>
                        </div>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h4 className="font-display text-lg font-bold mb-6 uppercase">Федерация</h4>
                        <ul className="space-y-3 font-mono text-micro">
                            <li>
                                <Link href="/about" className="transition-opacity hover:opacity-70 uppercase">
                                    О нас
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition-opacity hover:opacity-70 uppercase">
                                    Документы
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition-opacity hover:opacity-70 uppercase">
                                    Контакты
                                </Link>
                            </li>
                            <li>
                                <Link href="/news" className="transition-opacity hover:opacity-70 uppercase">
                                    Новости
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contacts */}
                    <div>
                        <h4 className="font-display text-lg font-bold mb-6 uppercase">Контакты</h4>
                        <ul className="space-y-4 font-mono text-micro">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                                <span>г. Астана, ул. Примерная 123, офис 45</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="flex-shrink-0" />
                                <span>+7 (777) 123-45-67</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="flex-shrink-0" />
                                <span>info@kmff.kz</span>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile App - Brutalist Style */}
                    <div>
                        <h4 className="font-display text-lg font-bold mb-6 uppercase">Приложение</h4>
                        <p className="font-mono text-micro mb-4 opacity-70">
                            Скачайте наше приложение для удобного доступа к матчам и статистике
                        </p>
                        <div className="flex flex-col gap-3">
                            <a
                                href="#"
                                className="border-2 border-mono-0 px-4 py-3 transition-opacity hover:opacity-70 flex items-center gap-3"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                                </svg>
                                <div className="text-left">
                                    <div className="font-mono text-[10px] opacity-70">Загрузите в</div>
                                    <div className="font-mono text-sm font-bold">APP STORE</div>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="border-2 border-mono-0 px-4 py-3 transition-opacity hover:opacity-70 flex items-center gap-3"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3.18 23.04c-.56-.55-.86-1.49-.86-2.75V3.71c0-1.26.3-2.2.86-2.75L14.26 12 3.18 23.04zm14.94-7.13l-3.88-3.91 3.88-3.91 4.44 2.52c.81.46 1.21 1.02 1.21 1.68v.02c0 .66-.4 1.22-1.21 1.68l-4.44 2.52v-.6zm-4.94-3.91l-9.87 9.87c.38.12.81.05 1.28-.19l12.24-6.94-3.65-2.74zm0-2.4L9.53 6.86 1.59 3.12c-.47-.24-.9-.31-1.28-.19l9.87 9.87 3.65-2.8H13.18z"/>
                                </svg>
                                <div className="text-left">
                                    <div className="font-mono text-[10px] opacity-70">Доступно в</div>
                                    <div className="font-mono text-sm font-bold">GOOGLE PLAY</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider - Thick Border */}
                <div className="border-t-2 border-mono-0 my-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-micro opacity-70">
                    <p>© 2025 КФМФ. Все права защищены.</p>
                    <div className="flex gap-6 uppercase">
                        <Link href="#" className="transition-opacity hover:opacity-70">
                            Конфиденциальность
                        </Link>
                        <Link href="#" className="transition-opacity hover:opacity-70">
                            Условия
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
