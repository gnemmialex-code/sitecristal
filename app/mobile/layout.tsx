import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aperçu iPhone 16 Pro — Le Cristal 1981",
  robots: { index: false, follow: false },
};

export default function MobilePreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
