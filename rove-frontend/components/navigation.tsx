'use client';

import { Button } from '@/components/ui/button';
import { BookOpen, Plane } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Plane className="h-6 w-6" />
            Rove
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button 
                variant={pathname === '/' ? 'default' : 'ghost'}
                size="sm"
              >
                Flight Search
              </Button>
            </Link>
            <Link href="/blog">
              <Button 
                variant={pathname.startsWith('/blog') ? 'default' : 'ghost'}
                size="sm"
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
