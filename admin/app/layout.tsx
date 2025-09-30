import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/auth-context';
import { I18nProvider } from '@/contexts/i18n-context';

// ============================================================================
// FONT CONFIGURATION
// ============================================================================

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

// ============================================================================
// METADATA CONFIGURATION
// ============================================================================

export const metadata: Metadata = {
  title: {
    default: 'Green Pass - Experiencias de Golf Premium',
    template: '%s | Green Pass'
  },
  description: 'Plataforma premium para experiencias de golf, torneos exclusivos y viajes únicos. Descubre los mejores campos de golf del mundo con Green Pass.',
  keywords: [
    'golf',
    'torneos de golf',
    'viajes de golf',
    'experiencias premium',
    'campos de golf',
    'golf argentina',
    'golf internacional',
    'green pass'
  ],
  authors: [{ name: 'Green Pass Team' }],
  creator: 'Green Pass',
  publisher: 'Green Pass',
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
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://greenpass.com',
    siteName: 'Green Pass',
    title: 'Green Pass - Experiencias de Golf Premium',
    description: 'Plataforma premium para experiencias de golf, torneos exclusivos y viajes únicos.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Green Pass - Experiencias de Golf Premium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Green Pass - Experiencias de Golf Premium',
    description: 'Plataforma premium para experiencias de golf, torneos exclusivos y viajes únicos.',
    images: ['/og-image.jpg'],
    creator: '@greenpass',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

// ============================================================================
// ROOT LAYOUT COMPONENT
// ============================================================================

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="es" 
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Preload critical fonts */}
        {/* Remove invalid font preloads (use next/font) */}
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#059669" />
        <meta name="msapplication-TileColor" content="#059669" />
        
        {/* Prevent zoom on iOS */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* Providers */}
        <I18nProvider>
        <AuthProvider>
          {/* Main application content */}
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">
              {children}
            </div>
          </div>
          
          {/* Toast notifications container */}
          <div id="toast-container" className="fixed bottom-4 right-4 z-50" />
          
          {/* Modal container */}
          <div id="modal-container" className="fixed inset-0 z-50 pointer-events-none" />
        </AuthProvider>
        </I18nProvider>
        
        {/* Analytics scripts (replace with your analytics) */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}()
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
