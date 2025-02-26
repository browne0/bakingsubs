'use client';

import { Button } from '@/components/ui/button';
import { Facebook, Link2, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const shareLinks = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
      icon: <Facebook className="h-5 w-5" />,
      label: 'Share on Facebook',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
      icon: <Mail className="h-5 w-5" />,
      label: 'Share via Email',
    },
    {
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
      icon: <Linkedin className="h-5 w-5" />,
      label: 'Share on LinkedIn',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="flex items-center justify-center lg:justify-start space-x-2 py-4 border-t border-b">
      <span className="text-sm text-gray-600 mr-4">SHARE</span>
      {shareLinks.map((link) => (
        <Button key={link.label} variant="ghost" size="icon" className="rounded-full" asChild>
          <Link href={link.href} aria-label={link.label} target={link.target} rel={link.rel}>
            {link.icon}
          </Link>
        </Button>
      ))}
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={handleCopyLink}
        aria-label="Copy link"
      >
        <Link2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
