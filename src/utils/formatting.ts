/**
 * Утилиты для форматирования дат, времени и других данных
 */

import { MONTH_NAMES_SHORT, DAY_NAMES_SHORT } from './constants';

/**
 * Форматирует дату в формат "1 МАРТ ПН"
 *
 * @param dateString - Строка даты в формате ISO
 * @returns Отформатированная дата
 *
 * @example
 * formatDate('2024-03-01T18:00:00Z') // "1 МАРТ ПН"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = MONTH_NAMES_SHORT[date.getUTCMonth()];
  const weekDay = DAY_NAMES_SHORT[date.getUTCDay()];

  return `${day} ${month} ${weekDay}`;
}

/**
 * Форматирует время в формат "18:00"
 *
 * @param dateString - Строка даты в формате ISO
 * @returns Отформатированное время
 *
 * @example
 * formatTime('2024-03-01T18:00:00Z') // "18:00"
 */
export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  });
}

/**
 * Форматирует дату для деталей матча (полный формат с названием месяца)
 *
 * @param dateString - Строка даты в формате ISO
 * @returns Отформатированная дата
 *
 * @example
 * formatMatchDate('2024-03-01T18:00:00Z') // "1 марта 2024"
 */
export function formatMatchDate(dateString: string): string {
  const date = new Date(dateString);
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Форматирует дату рождения игрока
 *
 * @param dateString - Строка даты в формате ISO
 * @returns Отформатированная дата
 *
 * @example
 * formatBirthday('2000-05-15') // "15.05.2000"
 */
export function formatBirthday(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

/**
 * Вычисляет возраст по дате рождения
 *
 * @param birthdayString - Строка даты рождения
 * @returns Возраст в годах
 *
 * @example
 * calculateAge('2000-05-15') // 24 (если текущий год 2024)
 */
export function calculateAge(birthdayString: string): number {
  const birthday = new Date(birthdayString);
  const today = new Date();

  let age = today.getFullYear() - birthday.getFullYear();
  const monthDiff = today.getMonth() - birthday.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }

  return age;
}

/**
 * Форматирует число с разделителями тысяч
 *
 * @param num - Число для форматирования
 * @returns Отформатированное число
 *
 * @example
 * formatNumber(1000) // "1 000"
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
