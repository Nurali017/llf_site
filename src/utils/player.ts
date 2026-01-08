/**
 * Утилиты для работы с игроками
 */

import { POSITION_LABELS, POSITION_LABELS_PLURAL, POSITION_COLORS } from './constants';

/**
 * Получает название позиции игрока на русском
 *
 * @param position - Позиция игрока (GOALKEEPER, DEFENDER, MIDFIELDER, FORWARD)
 * @returns Название позиции на русском
 *
 * @example
 * getPositionLabel('FORWARD') // "Нападающий"
 */
export function getPositionLabel(position: string): string {
  return POSITION_LABELS[position] || position;
}

/**
 * Получает название позиции во множественном числе
 *
 * @param position - Позиция игрока
 * @returns Название позиции во множественном числе
 *
 * @example
 * getPositionLabelPlural('FORWARD') // "Нападающие"
 */
export function getPositionLabelPlural(position: string): string {
  return POSITION_LABELS_PLURAL[position] || position;
}

/**
 * Получает цвет для позиции игрока
 *
 * @param position - Позиция игрока
 * @returns Tailwind класс цвета
 *
 * @example
 * getPositionColor('FORWARD') // "bg-red-500"
 */
export function getPositionColor(position: string): string {
  return POSITION_COLORS[position] || 'bg-gray-500';
}

/**
 * Получает полную информацию о позиции
 *
 * @param position - Позиция игрока
 * @returns Объект с label, plural и color
 *
 * @example
 * getPositionInfo('FORWARD')
 * // { label: 'Нападающий', plural: 'Нападающие', color: 'bg-red-500' }
 */
export function getPositionInfo(position: string) {
  return {
    label: getPositionLabel(position),
    plural: getPositionLabelPlural(position),
    color: getPositionColor(position),
  };
}
