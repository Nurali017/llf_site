import { fetchAPI } from './api';
import { Organization, OrganizationWithSlug } from '@/types/api';

/**
 * Генерирует slug из названия организации
 * Пример: "LLF ASTANA" -> "astana"
 */
export function generateSlug(organizationName: string): string {
  return organizationName
    .replace(/^LLF\s+/i, '') // Убираем префикс "LLF "
    .replace(/\s+/g, '-')    // Заменяем пробелы на дефисы
    .toLowerCase()
    .trim();
}

/**
 * Генерирует красивое отображаемое имя
 * Пример: "LLF ASTANA" -> "Астана"
 */
export function generateDisplayName(org: Organization): string {
  if (org.city?.name) {
    // Используем название города, делаем первую букву заглавной
    const cityName = org.city.name.toLowerCase();
    return cityName.charAt(0).toUpperCase() + cityName.slice(1);
  }

  // Если нет города, используем название организации без "LLF"
  const name = org.name.replace(/^LLF\s+/i, '').trim();
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

/**
 * Добавляет slug и displayName к организации
 */
export function enrichOrganization(org: Organization): OrganizationWithSlug {
  return {
    ...org,
    slug: generateSlug(org.name),
    displayName: generateDisplayName(org),
  };
}

/**
 * Получает все организации из API
 */
export async function getOrganizations(): Promise<OrganizationWithSlug[]> {
  const organizations = await fetchAPI<Organization[]>('/api/organizations');
  return organizations.map(enrichOrganization);
}

/**
 * Находит организацию по slug
 */
export async function getOrganizationBySlug(
  slug: string
): Promise<OrganizationWithSlug | undefined> {
  const organizations = await getOrganizations();
  return organizations.find((org) => org.slug === slug);
}
