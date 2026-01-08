"use client";

import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Trophy, Users, MapPin, Calendar, Mail, Phone, Globe } from 'lucide-react';

// Statistics data
const stats = [
    { icon: MapPin, value: '10+', label: 'Городов' },
    { icon: Users, value: '500+', label: 'Команд' },
    { icon: Trophy, value: '50+', label: 'Турниров в год' },
    { icon: Calendar, value: '10 000+', label: 'Матчей' },
];

// Values/Features
const features = [
    {
        title: 'Массовость',
        description: 'Развитие любительского мини-футбола во всех регионах Казахстана',
        icon: Users,
    },
    {
        title: 'Профессионализм',
        description: 'Высокие стандарты организации турниров и судейства',
        icon: Trophy,
    },
    {
        title: 'Доступность',
        description: 'Возможность участия для команд любого уровня подготовки',
        icon: Globe,
    },
];

export default function AboutPageContent() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#1e3a8a] via-[#172554] to-[#1e3a8a] text-white">
                <div className="container mx-auto px-4 py-12 md:py-20">
                    <Breadcrumbs />

                    <div className="max-w-4xl mt-8">
                        <h1 className="text-4xl md:text-5xl font-black mb-6">
                            Казахстанская Лига Любителей Футбола
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-200 mb-8 leading-relaxed">
                            Развиваем любительский мини-футбол по всему Казахстану,
                            объединяя тысячи игроков и болельщиков
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 relative">
                                <Image
                                    src="/llf-logo.png"
                                    alt="KLLF Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <div className="font-bold text-lg">KLLF</div>
                                <div className="text-blue-300 text-sm">Kazakhstan League of Fans of Football</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="container mx-auto px-4 -mt-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow"
                        >
                            <stat.icon className="w-8 h-8 text-kmff-blue mx-auto mb-3" />
                            <div className="text-3xl md:text-4xl font-black text-kmff-dark mb-1">
                                {stat.value}
                            </div>
                            <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mission Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-kmff-dark mb-8 flex items-center gap-3">
                        <span className="w-1.5 h-10 bg-kmff-blue rounded-full"></span>
                        О нас
                    </h2>

                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Казахстанская Лига Любителей Футбола (KLLF) — это крупнейшая организация,
                            объединяющая любительские команды по мини-футболу по всему Казахстану.
                            Мы проводим регулярные чемпионаты, кубковые турниры и специальные соревнования
                            в более чем 10 городах страны.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Наша миссия — сделать мини-футбол доступным для каждого, кто любит эту игру.
                            Мы верим, что спорт объединяет людей, укрепляет здоровье и создает
                            незабываемые эмоции для участников и болельщиков.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Присоединяйтесь к нам — регистрируйте свою команду и участвуйте
                            в турнирах вашего города!
                        </p>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-kmff-dark mb-12 text-center">
                        Наши принципы
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="w-8 h-8 text-kmff-blue" />
                                </div>
                                <h3 className="text-xl font-bold text-kmff-dark mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cities Section */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-kmff-dark mb-8 flex items-center gap-3">
                    <span className="w-1.5 h-10 bg-kmff-blue rounded-full"></span>
                    География
                </h2>

                <div className="bg-gradient-to-br from-[#1e3a8a] via-[#172554] to-[#1e3a8a] rounded-2xl p-8 text-white">
                    <p className="text-blue-200 mb-6">
                        Лига проводит турниры в следующих городах Казахстана:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {['Астана', 'Алматы', 'Шымкент', 'Караганда', 'Актобе',
                          'Павлодар', 'Семей', 'Атырау', 'Костанай', 'Кокшетау'].map((city) => (
                            <div
                                key={city}
                                className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-3"
                            >
                                <MapPin className="w-4 h-4 text-blue-300" />
                                <span className="font-medium">{city}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-kmff-dark mb-8 flex items-center gap-3">
                        <span className="w-1.5 h-10 bg-kmff-blue rounded-full"></span>
                        Контакты
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                        <a
                            href="mailto:info@kllf.kz"
                            className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-kmff-blue rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Email</div>
                                <div className="font-bold text-kmff-dark">info@kllf.kz</div>
                            </div>
                        </a>

                        <a
                            href="tel:+77001234567"
                            className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-kmff-blue rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Телефон</div>
                                <div className="font-bold text-kmff-dark">+7 700 123 45 67</div>
                            </div>
                        </a>

                        <a
                            href="https://1sportkz.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-kmff-blue rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Сайт</div>
                                <div className="font-bold text-kmff-dark">1sportkz.com</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="bg-gradient-to-r from-kmff-blue to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Хотите участвовать в турнирах?
                    </h2>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        Зарегистрируйте свою команду и присоединяйтесь к лиге вашего города.
                        Играйте, побеждайте, получайте удовольствие!
                    </p>
                    <a
                        href="https://1sportkz.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-kmff-blue px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
                    >
                        Зарегистрировать команду
                    </a>
                </div>
            </div>
        </div>
    );
}
