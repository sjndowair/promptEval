'use client';

import { useAuthState } from '@/lib/use-auth-listener';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // TanStack Query를 사용하여 auth 상태 관리
  useAuthState();

  return <>{children}</>;
}
