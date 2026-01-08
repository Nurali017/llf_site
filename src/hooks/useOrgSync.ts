'use client';

import { useEffect } from 'react';
import { useOrganization } from '@/contexts/OrganizationContext';

/**
 * Хук для синхронизации URL slug с глобальным контекстом организации.
 * Используется на city pages для обновления выбранной организации на основе URL.
 */
export function useOrgSync(urlSlug?: string) {
  const { organizations, setSelectedOrganization, selectedOrganization, isHydrated } = useOrganization();

  useEffect(() => {
    if (!urlSlug || !organizations.length || !isHydrated) return;

    // Если текущая организация уже совпадает с URL, ничего не делаем
    if (selectedOrganization?.slug === urlSlug) return;

    const org = organizations.find(o => o.slug === urlSlug);
    if (org) {
      setSelectedOrganization(org);
    }
  }, [urlSlug, organizations, setSelectedOrganization, selectedOrganization?.slug, isHydrated]);
}
