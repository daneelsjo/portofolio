import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://jonathandaneels.dev'),
  title: 'Jonathan Daneels — Full-stack Webdeveloper & SaaS Architect',
  description:
    'Ik verander complexe problemen in elegante, schaalbare code. Van concept tot productie — snel, modulair en toekomstbestendig.',
  keywords: [
    'webdeveloper',
    'Next.js',
    'Firebase',
    'SaaS',
    'fullstack',
    'Tailwind CSS',
    'React',
    'TypeScript',
    'België',
  ],
  authors: [{ name: 'Jonathan Daneels' }],
  creator: 'Jonathan Daneels',
  openGraph: {
    type: 'website',
    locale: 'nl_BE',
    url: 'https://jonathandaneels.dev',
    title: 'Jonathan Daneels — Full-stack Webdeveloper & SaaS Architect',
    description:
      'Ik verander complexe problemen in elegante, schaalbare code. Van concept tot productie.',
    siteName: 'Jonathan Daneels Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jonathan Daneels — Full-stack Webdeveloper & SaaS Architect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jonathan Daneels — Full-stack Webdeveloper & SaaS Architect',
    description:
      'Ik verander complexe problemen in elegante, schaalbare code. Van concept tot productie.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
