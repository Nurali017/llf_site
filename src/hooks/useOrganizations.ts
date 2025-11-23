import useSWR from 'swr';
import { getOrganizations } from '@/services/organizations';
import { OrganizationWithSlug } from '@/types/api';

/**
 * Hook для получения всех организаций с кешированием
 */
export function useOrganizations() {
  const { data, error, isLoading } = useSWR<OrganizationWithSlug[]>(
    '/api/organizations',
    getOrganizations,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Кеш на 1 минуту
      revalidateOnReconnect: true,
    }
  );

  return {
    organizations: data,
    isLoading,
    isError: !!error,
    error,
  };
}

/**
 * Hook для получения конкретной организации по slug
 */
export function useOrganizationBySlug(slug: string) {
  const { organizations, isLoading, isError, error } = useOrganizations();

  const organization = organizations?.find((org) => org.slug === slug);

  return {
    organization,
    isLoading,
    isError,
    error,
  };
}
