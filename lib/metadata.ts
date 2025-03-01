import Logo from '@/app/images/logo_horizontal.png';
import { Metadata } from 'next';
// Base metadata configuration

export const ogImage = {
  images: [
    {
      url: Logo.src,
      width: 630,
      height: 630,
      alt: 'BakingSubs - Smart Baking Substitutions',
    },
  ],
};
export const baseMetadata: Metadata = {
  metadataBase: new URL('https://bakingsubs.com'),
  title: {
    template: '%s | BakingSubs',
    default: 'BakingSubs - Your Definitive Baking Substitution Guide',
  },
  description:
    'Discover expert baking substitutions with detailed explanations of how each alternative affects your baked goods. Find the perfect ingredient swap based on your recipe type and needs.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bakingsubs.com',
    siteName: 'BakingSubs',
    ...ogImage,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};
