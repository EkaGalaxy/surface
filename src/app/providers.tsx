// app/providers.tsx
'use client';

import { AuthProvider } from '@/providers/AuthProvider';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>; // Show a loading state
  }

  return <AuthProvider>{children}</AuthProvider>;
}