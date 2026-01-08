/**
 * Утилиты для работы с изображениями
 */

import { SyntheticEvent } from 'react';

/**
 * Получает полный URL изображения с обработкой различных форматов
 *
 * @param path - Путь к изображению (может быть null или undefined)
 * @returns Полный URL изображения или fallback
 *
 * @example
 * getImageUrl('/images/team.jpg') // 'https://1sportkz.com/images/team.jpg'
 * getImageUrl('https://example.com/img.jpg') // 'https://example.com/img.jpg'
 * getImageUrl(null) // '/kmff-logo.jpg'
 */
export function getImageUrl(path: string | null | undefined): string {
    if (!path) return '/kmff-logo.jpg';

    // If it's already a full URL, return it
    if (path.startsWith('http')) return path;

    // If it's a data URL, return it
    if (path.startsWith('data:')) return path;

    // If it's a local asset (starts with / but NOT /images/)
    // This assumes /images/ is reserved for backend uploads
    if (path.startsWith('/') && !path.startsWith('/images/')) {
        return path;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://1sportkz.com';

    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    // If path already contains /images/, just prepend API URL
    if (cleanPath.startsWith('/images/')) {
        return `${apiUrl}${cleanPath}`;
    }

    // Otherwise assume it needs /images/ prefix (legacy support)
    return `${apiUrl}/images${cleanPath}`;
}

/**
 * Обработчик ошибки загрузки изображения (устанавливает fallback на logo)
 *
 * @param e - Событие ошибки
 *
 * @example
 * <img src={teamLogo} onError={handleImageError} />
 */
export const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/kmff-logo.jpg';
};

/**
 * Обработчик ошибки загрузки изображения игрока
 *
 * @param e - Событие ошибки
 *
 * @example
 * <img src={playerPhoto} onError={handlePlayerImageError} />
 */
export const handlePlayerImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/player-default.png';
};

/**
 * Обработчик ошибки загрузки изображения команды
 *
 * @param e - Событие ошибки
 *
 * @example
 * <img src={teamLogo} onError={handleTeamImageError} />
 */
export const handleTeamImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/llf-logo.png';
};
