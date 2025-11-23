// Типы для филиалов
export type BranchSlug = 'astana' | 'almaty' | 'shymkent' | 'aktobe' | 'karaganda' | 'pavlodar';

export interface Branch {
    slug: BranchSlug;
    name: string;
    displayName: string;
}

// Список всех филиалов
export const BRANCHES: Branch[] = [
    { slug: 'astana', name: 'Астана', displayName: 'Астана' },
    { slug: 'almaty', name: 'Алматы', displayName: 'Алматы' },
    { slug: 'shymkent', name: 'Шымкент', displayName: 'Шымкент' },
    { slug: 'aktobe', name: 'Актобе', displayName: 'Актобе' },
    { slug: 'karaganda', name: 'Караганда', displayName: 'Караганда' },
    { slug: 'pavlodar', name: 'Павлодар', displayName: 'Павлодар' },
];
