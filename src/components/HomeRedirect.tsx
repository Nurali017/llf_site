'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getStoredOrgSlug } from '@/utils/localStorage';

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    const storedSlug = getStoredOrgSlug();
    const targetSlug = storedSlug || 'astana';
    router.replace(`/${targetSlug}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}
