/**
 * Утилиты для работы с матчами
 */

import type { Match, LiveMatch } from '@/types/api';

/**
 * Извлекает название стадиона из объекта матча
 *
 * @param match - Объект матча
 * @returns Название стадиона или "Стадион не указан"
 *
 * @example
 * getStadiumName(match) // "Астана Арена"
 */
export function getStadiumName(match: Match | LiveMatch): string {
  // Проверяем различные варианты структуры address
  if (typeof match.address === 'string') {
    return match.address;
  }

  if (match.address?.name) {
    return match.address.name;
  }

  // Fallback на массив адресов
  if ('addresses' in match && match.addresses && match.addresses.length > 0) {
    return match.addresses[0];
  }

  return 'Стадион не указан';
}

/**
 * Получает бейдж статуса матча с цветом
 *
 * @param status - Статус матча
 * @returns Объект с текстом и цветом бейджа
 *
 * @example
 * getStatusBadge('NOT_STARTED') // { text: 'Не начался', color: 'bg-gray-500' }
 */
export function getStatusBadge(status: string): { text: string; color: string } {
  const statusMap: Record<string, { text: string; color: string }> = {
    'NOT_STARTED': { text: 'Не начался', color: 'bg-gray-500' },
    'FIRST_TIME': { text: 'Первый тайм', color: 'bg-green-500' },
    'HALF_TIME': { text: 'Перерыв', color: 'bg-blue-500' },
    'SECOND_TIME': { text: 'Второй тайм', color: 'bg-green-500' },
    'FINISHED': { text: 'Завершён', color: 'bg-gray-700' },
    'OVERTIME': { text: 'Овертайм', color: 'bg-purple-500' },
    'PENALTIES': { text: 'Пенальти', color: 'bg-red-500' },
  };

  return statusMap[status] || { text: status, color: 'bg-gray-500' };
}

/**
 * Проверяет, является ли матч завершённым
 *
 * @param status - Статус матча
 * @returns true если матч завершён
 *
 * @example
 * isMatchFinished('FINISHED') // true
 */
export function isMatchFinished(status: string): boolean {
  return status === 'FINISHED';
}

/**
 * Проверяет, является ли матч live (идёт сейчас)
 *
 * @param status - Статус матча
 * @returns true если матч идёт
 *
 * @example
 * isMatchLive('FIRST_TIME') // true
 */
export function isMatchLive(status: string): boolean {
  return ['FIRST_TIME', 'HALF_TIME', 'SECOND_TIME', 'OVERTIME', 'PENALTIES'].includes(status);
}
