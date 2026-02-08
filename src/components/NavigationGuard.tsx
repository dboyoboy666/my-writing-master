'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useWritingStore } from '@/stores/writing';

export function NavigationGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const { stepStatus } = useWritingStore();

  useEffect(() => {
    const step = parseInt(pathname.split('/step')[1]);
    if (isNaN(step)) return;

    const status = stepStatus[step - 1];
    if (status === 'locked') {
      // 如果步骤被锁定，跳转到当前活跃步骤
      const currentStep = stepStatus.findIndex(s => s === 'active') + 1;
      router.push(`/step${currentStep}`);
    }
  }, [pathname, stepStatus, router]);

  return null;
}
