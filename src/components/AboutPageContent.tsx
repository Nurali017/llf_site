"use client";

import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Trophy, Users, MapPin, Calendar, Mail, Phone, Globe } from 'lucide-react';

// Statistics data
const stats = [
    { icon: MapPin, value: '30+', label: 'Городов' },
    { icon: Users, value: '5000+', label: 'Команд' },
    { icon: Trophy, value: '500+', label: 'Турниров в год' },
    { icon: Calendar, value: '15 000+', label: 'Матчей' },
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
                            Казахстанская Федерация Мини-Футбола
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-200 mb-8 leading-relaxed">
                            Развиваем любительский мини-футбол по всему Казахстану, объединяя тысячи игроков и болельщиков
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 relative">
                                <Image
                                    src="/kmff-logo.jpg"
                                    alt="KMFF Logo"
                                    fill
                                    sizes="64px"
                                    className="object-cover rounded-full"
                                />
                            </div>
                            <div className="w-16 h-16 relative">
                                <Image
                                    src="/llf-logo.png"
                                    alt="LLF Logo"
                                    fill
                                    sizes="64px"
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <div className="font-semibold text-lg">КФМФ & LLF</div>
                                <div className="text-blue-300 text-sm">Казахстанская Федерация Мини-Футбола & Лига Любителей Футбола</div>
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
                            className="bg-white rounded-lg p-4 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow"
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
                    <h2 className="text-3xl font-semibold text-kmff-dark mb-8 flex items-center gap-3">
                        <span className="w-1.5 h-10 bg-kmff-blue rounded-full"></span>
                        О нас
                    </h2>

                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-600 leading-relaxed mb-6">
                            <strong>Казахстанская Федерация Мини-Футбола (КФМФ)</strong> — организация,
                            управляющая развитием мини-футбола в Республике Казахстан, координируя деятельность
                            региональных федераций и обеспечивая проведение соревнований на высоком профессиональном уровне.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            <strong>Казахстанская Лига Любителей Футбола</strong> — развиваем любительский мини-футбол
                            по всему Казахстану, объединяя тысячи игроков и болельщиков.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Наша миссия — популяризация и развитие мини-футбола в стране, поддержка спортивного
                            движения на массовом уровне, воспитание здорового образа жизни и выявление талантливых
                            игроков для профессионального спорта.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Присоединяйтесь к нам — регистрируйте свою команду, участвуйте в турнирах и станьте
                            частью большой футбольной семьи!
                        </p>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-kmff-dark mb-12 text-center">
                        Наши принципы
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="w-8 h-8 text-kmff-blue" />
                                </div>
                                <h3 className="text-xl font-semibold text-kmff-dark mb-3">
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

            {/* Contact Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-kmff-dark mb-8 flex items-center gap-3">
                        <span className="w-1.5 h-10 bg-kmff-blue rounded-full"></span>
                        Контакты
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                        <a
                            href="mailto:kmff.kz@gmail.com"
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-kmff-blue rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Email</div>
                                <div className="font-semibold text-kmff-dark">kmff.kz@gmail.com</div>
                            </div>
                        </a>

                        <a
                            href="tel:+77753130805"
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-kmff-blue rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Телефон</div>
                                <div className="font-semibold text-kmff-dark">+7 775 313 0805</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="bg-gradient-to-r from-kmff-blue to-blue-700 rounded-lg p-5 md:p-12 text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                        Хотите участвовать в турнирах?
                    </h2>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        Зарегистрируйте свою команду и присоединяйтесь к лиге вашего города.
                        Играйте, побеждайте, получайте удовольствие!
                    </p>
                    <a
                        href="https://wa.me/77753130805"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-kmff-blue px-5 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                        Зарегистрировать команду
                    </a>
                </div>
            </div>
        </div>
    );
}
