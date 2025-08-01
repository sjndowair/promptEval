'use client';

import { use, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/lib/analytics';

interface IAnayticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider = ({ children }: IAnayticsProviderProps) => {
  const pathName = usePathname();

  useEffect(() => {
    if (pathName) {
      analytics.pageView(pathName);
    }
  }, [pathName]);

  return <>{children}</>;
};
