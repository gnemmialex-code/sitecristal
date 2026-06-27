import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Le Cristal 1981 — Kebab d'exception · Paris 10",
  description:
    "Le Cristal 1981, l'institution du kebab à Paris depuis 1981. Viandes marinées, pain maison, sauces signature. 2 rue de Mazagran, Paris 10e.",
  keywords: [
    "kebab Paris",
    "Le Cristal 1981",
    "restaurant kebab Paris 10",
    "meilleur kebab Paris",
    "rue de Mazagran",
  ],
  openGraph: {
    title: "Le Cristal 1981 — Kebab d'exception",
    description:
      "L'institution du kebab à Paris depuis 1981. 2 rue de Mazagran, Paris 10e.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col grain bg-cream text-ink px-6 md:px-0">
        {children}
      </body>
    </html>
  );
}
