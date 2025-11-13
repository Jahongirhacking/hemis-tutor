import { type ReactNode, Suspense } from 'react';

import { Spinner } from '@/components/Spinner';

export default function Wrapper({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}
