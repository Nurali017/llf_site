import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getStoredOrgSlug, setStoredOrgSlug, removeStoredOrgSlug } from '../localStorage';

describe('localStorage utils', () => {
  beforeEach(() => {
    // Очищаем localStorage перед каждым тестом
    localStorage.clear();
  });

  afterEach(() => {
    // Восстанавливаем все моки после каждого теста
    vi.restoreAllMocks();
  });

  describe('getStoredOrgSlug', () => {
    it('возвращает null если ничего не сохранено', () => {
      expect(getStoredOrgSlug()).toBeNull();
    });

    it('возвращает сохранённый slug', () => {
      localStorage.setItem('llf_selected_org_slug', 'almaty');
      expect(getStoredOrgSlug()).toBe('almaty');
    });

    it('обрабатывает ошибку localStorage gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('localStorage blocked');
      });

      expect(getStoredOrgSlug()).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to read from localStorage:',
        expect.any(Error)
      );

      getItemSpy.mockRestore();
      consoleSpy.mockRestore();
    });
  });

  describe('setStoredOrgSlug', () => {
    it('сохраняет slug в localStorage', () => {
      setStoredOrgSlug('astana');
      expect(localStorage.getItem('llf_selected_org_slug')).toBe('astana');
    });

    it('перезаписывает предыдущее значение', () => {
      setStoredOrgSlug('astana');
      setStoredOrgSlug('almaty');
      expect(localStorage.getItem('llf_selected_org_slug')).toBe('almaty');
    });

    it('обрабатывает ошибку localStorage gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('localStorage blocked');
      });

      // Не должно выбросить ошибку
      expect(() => setStoredOrgSlug('astana')).not.toThrow();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to write to localStorage:',
        expect.any(Error)
      );

      setItemSpy.mockRestore();
      consoleSpy.mockRestore();
    });
  });

  describe('removeStoredOrgSlug', () => {
    it('удаляет slug из localStorage', () => {
      localStorage.setItem('llf_selected_org_slug', 'astana');
      removeStoredOrgSlug();
      expect(localStorage.getItem('llf_selected_org_slug')).toBeNull();
    });

    it('не выбрасывает ошибку если ключа нет', () => {
      expect(() => removeStoredOrgSlug()).not.toThrow();
    });

    it('обрабатывает ошибку localStorage gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('localStorage blocked');
      });

      expect(() => removeStoredOrgSlug()).not.toThrow();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to remove from localStorage:',
        expect.any(Error)
      );

      removeItemSpy.mockRestore();
      consoleSpy.mockRestore();
    });
  });

  describe('интеграционные тесты', () => {
    it('полный цикл: сохранить -> получить -> удалить', () => {
      // Изначально пусто
      expect(getStoredOrgSlug()).toBeNull();

      // Сохраняем
      setStoredOrgSlug('shymkent');
      expect(getStoredOrgSlug()).toBe('shymkent');

      // Обновляем
      setStoredOrgSlug('karaganda');
      expect(getStoredOrgSlug()).toBe('karaganda');

      // Удаляем
      removeStoredOrgSlug();
      expect(getStoredOrgSlug()).toBeNull();
    });
  });
});
