import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  title: "Ayman Siddique - Books & Paintings",
  description: "Discover inspiring books and beautiful paintings by Ayman Siddique. Explore creativity through literature and art.",
  keywords: "books, paintings, art, literature, Ayman Siddique, creativity",
  authors: [{ name: "Ayman Siddique" }],
  openGraph: {
    title: "Ayman Siddique - Books & Paintings",
    description: "Discover inspiring books and beautiful paintings by Ayman Siddique.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-gray-50 min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
