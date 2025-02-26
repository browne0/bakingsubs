'use client';

import { BreadcrumbNav } from '@/components/BreadcrumbNav';

interface ClientBreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export function ClientBreadcrumbs({ items }: ClientBreadcrumbsProps) {
  return <BreadcrumbNav items={items} />;
}
