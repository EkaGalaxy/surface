// app/page.tsx
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRoutesConfig } from '@/router/routesConfig';
import { ResponsiveLayout } from '@/components/website/layout/ResponsiveLayout';
import { Loading } from '@/components/common/Loading';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

export default function Page() {
  const { websiteRoutes, authRoutes } = useRoutesConfig();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      {/* Auth Routes */}
      {authRoutes.map((route) => (
        <div 
          key={route.path}
          style={{ display: route.path === pathname ? 'block' : 'none' }}
        >
          {route.element}
        </div>
      ))}

      {/* Website Routes */}
      <ResponsiveLayout>
        {websiteRoutes.map((route) => {
          const basePath = route.path.split(':')[0];
          const isActive = pathname === route.path || 
                         (route.path.includes(':') && pathname?.startsWith(basePath));
          
          return (
            <div
              key={route.path}
              style={{ display: isActive ? 'block' : 'none' }}
            >
              {route.element}
            </div>
          );
        })}
      </ResponsiveLayout>
    </Suspense>
  );
}