import useSWR from 'swr';
import { getPartners } from '@/services/partners';
import { Partner } from '@/types/api';

export function usePartners(organizationId?: number) {
  const { data, error, isLoading } = useSWR<Partner[]>(
    organizationId ? `/api/partners?organization=${organizationId}` : null,
    () => getPartners(organizationId),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    partners: data || [],
    isLoading,
    isError: !!error,
  };
}
