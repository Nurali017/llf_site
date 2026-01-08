/**
 * Конфигурация стратегий кеширования для SWR
 */

import type { SWRConfiguration } from 'swr';

/**
 * Стратегии кеширования для разных типов данных
 *
 * LIVE - Для live данных (матчи идущие сейчас)
 * RECENT - Для недавних данных (результаты матчей, новости)
 * STATIC - Для относительно статичных данных (турнирные таблицы)
 * HISTORIC - Для исторических данных (архивные матчи, статистика)
 */
export const CACHE_STRATEGIES = {
  /**
   * Для live данных - частое обновление
   * Используется для: live матчи, счет в реальном времени
   */
  LIVE: {
    dedupingInterval: 5000, // 5 секунд
    refreshInterval: 10000, // Автообновление каждые 10 секунд
    revalidateOnFocus: true, // Обновлять при фокусе на окне
    revalidateOnReconnect: true, // Обновлять при восстановлении соединения
    shouldRetryOnError: true,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  } as SWRConfiguration,

  /**
   * Для недавних данных - умеренное обновление
   * Используется для: список матчей, новости, протоколы матчей
   */
  RECENT: {
    dedupingInterval: 30000, // 30 секунд
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    errorRetryCount: 2,
    errorRetryInterval: 10000,
  } as SWRConfiguration,

  /**
   * Для относительно статичных данных
   * Используется для: турнирные таблицы, бомбардиры, карточки
   */
  STATIC: {
    dedupingInterval: 300000, // 5 минут
    revalidateOnFocus: false, // Не обновлять при фокусе
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    errorRetryCount: 2,
    errorRetryInterval: 15000,
  } as SWRConfiguration,

  /**
   * Для исторических данных - редкое обновление
   * Используется для: завершенные матчи, архивная статистика
   */
  HISTORIC: {
    dedupingInterval: 600000, // 10 минут
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false, // Не пытаться повторно для исторических данных
  } as SWRConfiguration,

  /**
   * Для данных профилей (игроки, команды)
   * Используется для: профили игроков, команд
   */
  PROFILE: {
    dedupingInterval: 120000, // 2 минуты
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    errorRetryCount: 2,
  } as SWRConfiguration,

  /**
   * Для справочной информации (организации, города)
   * Используется для: список организаций, турниры
   */
  REFERENCE: {
    dedupingInterval: 3600000, // 1 час
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: true,
    errorRetryCount: 1,
  } as SWRConfiguration,
} as const;

/**
 * Базовая конфигурация SWR (дефолтная для всего приложения)
 */
export const SWR_DEFAULT_CONFIG: SWRConfiguration = {
  revalidateOnFocus: false, // Не обновлять по умолчанию при фокусе
  dedupingInterval: 60000, // 1 минута по умолчанию
  revalidateOnReconnect: true,
  shouldRetryOnError: true,
  errorRetryCount: 2,
  errorRetryInterval: 10000,
};
