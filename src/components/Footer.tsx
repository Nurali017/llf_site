import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-kmff-dark text-white pt-16 pb-8 border-t-2 border-white/10">
            <div className="container mx-auto px-4">

                {/* Top Section: Logo & About */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand - Logos */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="mb-6 flex items-center gap-4">
                            <Image
                                src="/kmff-logo.jpg"
                                alt="KMFF Logo"
                                width={70}
                                height={70}
                                className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover"
                            />
                            <Image
                                src="/llf-logo.png"
                                alt="LLF Logo"
                                width={120}
                                height={60}
                                className="h-10 md:h-12 w-auto object-contain"
                            />
                        </div>
                        <p className="font-display text-sm leading-relaxed mb-6 text-neutral-300">
                            Официальный сайт Казахстанской федерации мини-футбола. Развитие и популяризация мини-футбола в Казахстане.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="font-display text-sm font-medium rounded-lg border border-neutral-700 px-4 py-2 transition-colors hover:bg-neutral-800 hover:border-primary-500">
                                IG
                            </a>
                            <a href="#" className="font-display text-sm font-medium rounded-lg border border-neutral-700 px-4 py-2 transition-colors hover:bg-neutral-800 hover:border-primary-500">
                                FB
                            </a>
                            <a href="#" className="font-display text-sm font-medium rounded-lg border border-neutral-700 px-4 py-2 transition-colors hover:bg-neutral-800 hover:border-primary-500">
                                YT
                            </a>
                        </div>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h4 className="font-display text-base font-medium mb-6 text-white">Федерация</h4>
                        <ul className="space-y-3 font-display text-sm text-neutral-300">
                            <li>
                                <Link href="/about" className="transition-colors hover:text-primary-400">
                                    О нас
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition-colors hover:text-primary-400">
                                    Документы
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition-colors hover:text-primary-400">
                                    Контакты
                                </Link>
                            </li>
                            <li>
                                <Link href="/news" className="transition-colors hover:text-primary-400">
                                    Новости
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contacts */}
                    <div>
                        <h4 className="font-display text-base font-medium mb-6 text-white">Контакты</h4>
                        <ul className="space-y-4 font-display text-sm text-neutral-300">
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

                    {/* Mobile App */}
                    <div>
                        <h4 className="font-display text-base font-medium mb-6 text-white">Приложение</h4>
                        <p className="font-display text-sm mb-4 text-neutral-300">
                            Скачайте наше приложение для удобного доступа к матчам и статистике
                        </p>
                        <div className="flex flex-col gap-3">
                            <a
                                href="#"
                                className="rounded-lg border border-neutral-700 px-4 py-3 transition-colors hover:bg-neutral-800 hover:border-primary-500 flex items-center gap-3"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                                </svg>
                                <div className="text-left">
                                    <div className="font-display text-[10px] text-neutral-400">Загрузите в</div>
                                    <div className="font-display text-sm font-medium">App Store</div>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="rounded-lg border border-neutral-700 px-4 py-3 transition-colors hover:bg-neutral-800 hover:border-primary-500 flex items-center gap-3"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3.18 23.04c-.56-.55-.86-1.49-.86-2.75V3.71c0-1.26.3-2.2.86-2.75L14.26 12 3.18 23.04zm14.94-7.13l-3.88-3.91 3.88-3.91 4.44 2.52c.81.46 1.21 1.02 1.21 1.68v.02c0 .66-.4 1.22-1.21 1.68l-4.44 2.52v-.6zm-4.94-3.91l-9.87 9.87c.38.12.81.05 1.28-.19l12.24-6.94-3.65-2.74zm0-2.4L9.53 6.86 1.59 3.12c-.47-.24-.9-.31-1.28-.19l9.87 9.87 3.65-2.8H13.18z"/>
                                </svg>
                                <div className="text-left">
                                    <div className="font-display text-[10px] text-neutral-400">Доступно в</div>
                                    <div className="font-display text-sm font-medium">Google Play</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-neutral-800 my-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-display text-sm text-neutral-400">
                    <p>© 2025 КФМФ. Все права защищены.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="transition-colors hover:text-primary-400">
                            Конфиденциальность
                        </Link>
                        <Link href="#" className="transition-colors hover:text-primary-400">
                            Условия
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
