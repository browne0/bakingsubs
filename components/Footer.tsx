'use client';

import { Facebook, Github, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'About', href: '/about' },
      { label: 'All Ingredients', href: '/ingredients' },
      { label: 'Common Substitutes', href: '/common-substitutes' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Learn', href: '/learn' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Support', href: '/support' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/bakingsubs' },
  { icon: Twitter, href: 'https://twitter.com/bakingsubs' },
  { icon: Instagram, href: 'https://instagram.com/bakingsubs' },
  { icon: Github, href: 'https://github.com/bakingsubs' },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold">{section.title}</h3>
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

          <div>
            <h3 className="text-sm font-semibold">Follow Us</h3>
            <div className="flex gap-4 mt-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">Follow us on {social.href.split('.com/')[1]}</span>
                </Link>
              ))}
            </div>
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
