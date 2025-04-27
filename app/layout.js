import { Geist, Geist_Mono } from "next/font/google";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff"
};

import "./globals.css";
import Image from "next/image";
import { Toaster } from "sonner";
import Link from "next/link";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const domain = "https://ilifestylei.com";

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
        url: `${domain}/ilifestylei.jpg`,
        width: 1200,
        height: 630,
        alt: "Clase Gratuita Medicina de la Vida - Dra. Idoia Álvarez",
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
        url: `${domain}/dra-idoia-alvarez.svg`,
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
        url: "/favicon-image.ico",
        type: "image/x-icon"
      },
      {
        url: "/favicon.png",
        sizes: "32x32",
        type: "image/png"
      }
    ],
    apple: [
      {
        url: "/favicon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "r9sgsz8s22");
          `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="flex items-center justify-start px-4 py-4">
          <Link href='/'>
            <Image
              src="/International-Lifestyle-Institute-logo.svg"
              alt="International Lifestyle Institute"
              width={95}
              height={40}
              priority
              className=""
            />
          </Link>
        </header>
        <main>{children}</main>
        <Toaster />
        <footer className="flex flex-col px-4 py-8 gap-4 bg-primary">
          <Link href='/'>
            <Image
              src="/International-Lifestyle-Institute.svg"
              alt="International Lifestyle Institute"
              width={95}
              height={40}
              priority
              className=""
            />
          </Link>
          <h3 className="text-white ml-3">
            © {new Date().getFullYear()} Devhoo
          </h3>
        </footer>
      </body>
    </html>
  );
}
