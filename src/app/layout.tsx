import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/themeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Purely",
  description: "Where personality sparks connections, not just photos",
};

const poppins = localFont({
  src: [
    {
      path: './fonts/poppins/Poppins-Regular.ttf',
      weight: '400'
    },
    {
      path: './fonts/public/fonts/poppins/Poppins-Bold.ttf',
      weight: '700'
    }
  ],
  variable: '--font-poppins'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="theme-color" content={'#00A98D'} />
      <ThemeProvider attribute="class"
            defaultTheme="system">
      <body
        className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body></ThemeProvider>
    </html>
  );
}
