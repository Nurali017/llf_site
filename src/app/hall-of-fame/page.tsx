import { Metadata } from 'next';
import HallOfFameContent from '@/components/HallOfFameContent';

export const metadata: Metadata = {
    title: 'Зал славы | LLF',
    description: 'История чемпионов Любительской Лиги Футбола',
};

export default function HallOfFamePage() {
    return <HallOfFameContent />;
}
