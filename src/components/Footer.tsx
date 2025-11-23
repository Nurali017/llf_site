import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-kmff-dark text-white pt-16 pb-8">
            <div className="container mx-auto px-4">

                {/* Top Section: Logo & About */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex flex-col gap-4 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white">
                                    <Image
                                        src="/kmff-logo.jpg"
                                        alt="KMFF Logo"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-contain"
                                    />
                                </div>
                                <span className="font-bold text-xl">KMFF</span>
                            </div>
                            <div className="kllf-logo-container-footer">
                                <div className="relative h-8 w-auto">
                                    <Image
                                        src="/kllf-logo-cropped.png"
                                        alt="ҚЛЛF Logo"
                                        width={118}
                                        height={32}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Официальный сайт Казахстанской федерации мини-футбола. Развитие и популяризация мини-футбола в Казахстане.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1"><Youtube size={20} /></a>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Турниры</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-kmff-pink transition-colors">Премьер-лига</Link></li>
                            <li><Link href="#" className="hover:text-kmff-pink transition-colors">Первая лига</Link></li>
                            <li><Link href="#" className="hover:text-kmff-pink transition-colors">Кубок РК</Link></li>
                            <li><Link href="#" className="hover:text-kmff-pink transition-colors">Любительская лига</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Федерация</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-kmff-pink transition-colors">О нас</Link></li>
                            <li><Link href="#" className="hover:text-kmff-pink transition-colors">Документы</Link></li>
                            <li><Link href="#" className="hover:text-kmff-pink transition-colors">Контакты</Link></li>
                            <li><Link href="#" className="hover:text-kmff-pink transition-colors">Новости</Link></li>
                        </ul>
                    </div>

                    {/* Contacts */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Контакты</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="mt-0.5 text-kmff-pink" />
                                <span>г. Астана, ул. Примерная 123, офис 45</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-kmff-pink" />
                                <span>+7 (777) 123-45-67</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-kmff-pink" />
                                <span>info@kmff.kz</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© 2025 KMFF. Все права защищены.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
                        <Link href="#" className="hover:text-white transition-colors">Условия использования</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
