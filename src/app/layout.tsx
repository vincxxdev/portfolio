import type { Metadata } from "next";
import "./globals.css";
import { Onest } from "next/font/google";
import Navbar from "./components/Navbar";
import { ThemeProvider } from './components/ThemeProvider';

const onest = Onest({ subsets: ['latin'], variable: '--font-onest' });


export const metadata: Metadata = {
  title: "VincxxDev - Portfolio",
  description: "Porfolio di Vincenzo - Software Engineer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${onest.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}