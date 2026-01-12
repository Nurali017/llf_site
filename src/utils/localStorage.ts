const STORAGE_KEY = 'llf_selected_org_slug';

const isBrowser = typeof window !== 'undefined';

/**
 * Получить сохранённый slug организации из localStorage
 * Возвращает null если не найден или если запущен на сервере
 */
export function getStoredOrgSlug(): string | null {
  if (!isBrowser) return null;

  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    // Обработка случаев когда localStorage заблокирован (инкогнито и т.д.)
    if (process.env.NODE_ENV === 'development') {
      console.warn('Failed to read from localStorage:', error);
    }
    return null;
  }
}

/**
 * Сохранить slug организации в localStorage
 */
export function setStoredOrgSlug(slug: string): void {
  if (!isBrowser) return;

  try {
    localStorage.setItem(STORAGE_KEY, slug);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Failed to write to localStorage:', error);
    }
  }
}

/**
 * Удалить сохранённый slug организации из localStorage
 */
export function removeStoredOrgSlug(): void {
  if (!isBrowser) return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Failed to remove from localStorage:', error);
    }
  }
}
