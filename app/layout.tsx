import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HK Bus",
  description: "CityBus arrival time estimations",
  manifest: "/hk-bus/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-screen h-screen bg-gray-800`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
