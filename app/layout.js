import { Geist, Geist_Mono } from "next/font/google";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff"
};

import "./globals.css";
import Image from "next/image";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const domain = process.env.NEXT_PUBLIC_DOMAIN || "https://tudominio.com";

export const metadata = {
  metadataBase: new URL(domain),
  title: "Clase Gratuita: Medicina de la Vida con la Dra. Idoia Álvarez",
  description:
    "Descubre un método basado en evidencia que mejora la salud real de tus pacientes. Clase gratuita de 10 minutos con la Dra. Idoia Álvarez.",
  keywords: [
    "medicina de la vida",
    "formación médica",
    "salud integrativa",
    "medicina basada en evidencia",
    "Dra. Idoia Álvarez",
    "Instituto Internacional de Estilo de Vida",
    "medicina funcional",
    "medicina preventiva",
    "salud y bienestar",
    "nutrición",
    "International Lifestyle Institute",
    "medicina personalizada",
    "enfermedades crónicas",
    "salud mental",
    "salud física",
    "salud emocional",
    "salud integral",
    "Idoia Álvarez"
  ],
  openGraph: {
    siteName: "Dra. Idoia Álvarez | Medicina de la Vida",
    locale: "es_ES",
    type: "website",
    url: domain,
    title: "Clase Gratuita: Medicina de la Vida con la Dra. Idoia Álvarez",
    description:
      "Descubre un método basado en evidencia que mejora la salud real de tus pacientes. Clase gratuita de 10 minutos con la Dra. Idoia Álvarez.",
    images: [
      {
        url: `${domain}/images/preview.jpg`,
        width: 1200,
        height: 630,
        alt: "Clase Gratuita Medicina de la Vida - Dra. Idoia Álvarez",
        type: "image/jpeg"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Clase Gratuita: Medicina de la Vida con la Dra. Idoia Álvarez",
    description:
      "Descubre un método basado en evidencia que mejora la salud real de tus pacientes. Clase gratuita de 10 minutos con la Dra. Idoia Álvarez.",
    creator: "@idoiaalvarez",
    site: "@idoiaalvarez",
    images: [
      {
        url: `${domain}/images/preview.jpg`,
        width: 1200,
        height: 630,
        alt: "Clase Gratuita Medicina de la Vida - Dra. Idoia Álvarez"
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow"
  },
  alternates: {
    canonical: domain
  },
  applicationName: "Medicina de la Vida - Dra. Idoia Álvarez",
  appleWebApp: {
    title: "Clase Gratuita: Medicina de la Vida con la Dra. Idoia Álvarez",
    statusBarStyle: "default",
    capable: true
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon"
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png"
      }
    ],
    apple: [
      {
        url: "/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="flex items-center justify-start px-4 py-4">
          <Image
            src="/International-Lifestyle-Institute-logo.svg"
            alt="International Lifestyle Institute"
            width={95}
            height={40}
            priority
            className=""
          />
        </header>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
