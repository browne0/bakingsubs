import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMediaQuery } from '@/hooks/use-media-query';
import { MoreHorizontal } from 'lucide-react';
import { Fragment } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (!isDesktop && items.length > 3) {
    // On mobile, show first item, dropdown for middle items, and last item
    const firstItem = items[0];
    const middleItems = items.slice(1, -1);
    const lastItem = items[items.length - 1];

    return (
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            {firstItem.href ? (
              <BreadcrumbLink href={firstItem.href}>{firstItem.label}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{firstItem.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>

          <span className="mx-2 text-muted-foreground">/</span>

          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-auto p-1">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {middleItems.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    {item.href ? (
                      <a href={item.href} className="w-full">
                        {item.label}
                      </a>
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>

          <span className="mx-2 text-muted-foreground">/</span>

          <BreadcrumbItem>
            {lastItem.href ? (
              <BreadcrumbLink href={lastItem.href}>{lastItem.label}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{lastItem.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // On desktop or when there are few items, show full breadcrumb
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
