// Типы для филиалов
export type BranchSlug =
    | 'astana'
    | 'balkhash'
    | 'karagandy'
    | 'kokshetau'
    | 'ulytau'
    | 'qyzylorda'
    | 'uralsk'
    | 'shymkent'
    | 'turkestan'
    | 'aktobe'
    | 'taldykorgan'
    | 'turkestan-region'
    | 'kulsary'
    | 'schuchinsk'
    | 'oskemen'
    | 'kostanay'
    | 'freedom-bfl'
    | 'qazaly-region';

export interface Branch {
    slug: BranchSlug;
    name: string;
    displayName: string;
    organizationId: number;
}

// Список всех филиалов (синхронизировано с API 1sportkz.com)
export const BRANCHES: Branch[] = [
    { slug: 'astana', name: 'LLF ASTANA', displayName: 'Астана', organizationId: 2 },
    { slug: 'balkhash', name: 'LLF BALKHASH', displayName: 'Балхаш', organizationId: 3 },
    { slug: 'karagandy', name: 'LLF KARAGANDY', displayName: 'Караганда', organizationId: 4 },
    { slug: 'kokshetau', name: 'LLF KOKSHETAU', displayName: 'Кокшетау', organizationId: 5 },
    { slug: 'ulytau', name: 'LLF ULYTAU', displayName: 'Улытау', organizationId: 6 },
    { slug: 'qyzylorda', name: 'LLF QYZYLORDA', displayName: 'Кызылорда', organizationId: 7 },
    { slug: 'uralsk', name: 'LLF URALSK', displayName: 'Уральск', organizationId: 9 },
    { slug: 'shymkent', name: 'LLF SHYMKENT', displayName: 'Шымкент', organizationId: 10 },
    { slug: 'turkestan', name: 'LLF TURKESTAN', displayName: 'Туркестан', organizationId: 11 },
    { slug: 'aktobe', name: 'LLF AKTOBE', displayName: 'Актобе', organizationId: 12 },
    { slug: 'taldykorgan', name: 'LLF TALDYKORGAN', displayName: 'Талдыкорган', organizationId: 16 },
    { slug: 'turkestan-region', name: 'LLF TURKESTAN REGION', displayName: 'Туркестанская область', organizationId: 21 },
    { slug: 'kulsary', name: 'LLF KULSARY', displayName: 'Кульсары', organizationId: 23 },
    { slug: 'schuchinsk', name: 'LLF SCHUCHINSK', displayName: 'Щучинск', organizationId: 28 },
    { slug: 'oskemen', name: 'LLF OSKEMEN', displayName: 'Усть-Каменогорск', organizationId: 32 },
    { slug: 'kostanay', name: 'LLF KOSTANAY', displayName: 'Костанай', organizationId: 37 },
    { slug: 'freedom-bfl', name: 'FREEDOM BFL', displayName: 'Freedom BFL', organizationId: 38 },
    { slug: 'qazaly-region', name: 'QAZALY REGION', displayName: 'Казалинский район', organizationId: 39 },
];
