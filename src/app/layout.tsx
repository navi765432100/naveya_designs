import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VALENTINA VOSS | navjot kaur - Haute Couture Portfolio",
  description: "Explore the sculptural fashion designs, sketches, and editorial runway collections of Valentina Voss, an avant-garde haute couture designer based in Milan.",
  keywords: "Fashion Designer, Portfolio, Haute Couture, Valentina Voss, Milan Fashion, Editorial, Runway, Sketches",
  authors: [{ name: "Valentina Voss" }],
  creator: "Valentina Voss Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-950 font-sans text-stone-300">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

