import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Loader from "./components/Loader";
import CustomCursor from "./components/ui/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

export const metadata: Metadata = {
  title: "vincxxdev - Portfolio",
  description: "Portfolio di Vincenzo Buttari - Software Engineer",
  openGraph: {
    title: "vincxxdev - Portfolio",
    description: "Portfolio di Vincenzo Buttari, un Software Engineer appassionato di creare soluzioni innovative e scalabili.",
    url: "https://your-deployment-link.com",
    siteName: "vincxxdev Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Portfolio di vincxxdev",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "vincxxdev - Portfolio",
    description: "Esplora il portfolio di Vincenzo Buttari, Software Engineer.",
    images: ["https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          <Loader>{children}</Loader>
        </ThemeProvider>
      </body>
    </html>
  );
}