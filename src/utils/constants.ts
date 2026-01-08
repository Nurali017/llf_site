/**
 * Константы для всего приложения
 */

// Месяцы на русском (сокращенно)
export const MONTH_NAMES_SHORT = [
  'ЯНВ.', 'ФЕВ.', 'МАРТ', 'АПР.', 'МАЯ', 'ИЮНЯ',
  'ИЮЛЯ', 'АВГ.', 'СЕНТ.', 'ОКТ.', 'НОЯБ.', 'ДЕК.'
] as const;

// Дни недели на русском (сокращенно)
export const DAY_NAMES_SHORT = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'] as const;

// Позиции игроков
export const POSITION_LABELS: Record<string, string> = {
  FORWARD: 'Нападающий',
  MIDFIELDER: 'Полузащитник',
  DEFENDER: 'Защитник',
  GOALKEEPER: 'Вратарь',
} as const;

// Позиции игроков (множественное число)
export const POSITION_LABELS_PLURAL: Record<string, string> = {
  FORWARD: 'Нападающие',
  MIDFIELDER: 'Полузащитники',
  DEFENDER: 'Защитники',
  GOALKEEPER: 'Вратари',
} as const;

// Цвета для позиций
export const POSITION_COLORS: Record<string, string> = {
  GOALKEEPER: 'bg-amber-500',
  DEFENDER: 'bg-blue-500',
  MIDFIELDER: 'bg-green-500',
  FORWARD: 'bg-red-500',
} as const;

// Пагинация
export const ITEMS_PER_PAGE = {
  MATCHES: 12,
  NEWS: 8,
  PLAYERS: 20,
  TEAMS: 12,
} as const;
