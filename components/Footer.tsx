'use client';

import Logo from '@/app/images/logo_horizontal.png';
import Link from 'next/link';

const footerLinks = {
  product: {
    title: 'Product',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Learn', href: '/learn' },
      { label: 'Blog', href: '/blog' },
      { label: 'All Ingredients', href: '/ingredients' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
  contact: {
    title: 'Contact',
    links: [{ label: 'support@bakingsubs.com', href: 'mailto:support@bakingsubs.com' }],
  },
};

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and Description Column */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block">
              <img src={Logo.src} alt="BakingSubs Logo" className="h-8 w-auto" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your definitive resource for baking substitutions, <br />
              helping you understand not just what to substitute, <br />
              but why and how.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 grid grid-cols-3 gap-8">
            {Object.values(footerLinks).map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-foreground">{section.title}</h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 mt-8 border-t">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} BakingSubs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
