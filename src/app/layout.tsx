import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/components/providers/themeProvider";
import { FirebaseAppProvider } from "@/components/providers/firebaseAppProvider";

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
      path: '../../public/fonts/poppins/Poppins-Regular.ttf',
      weight: '400'
    },
    {
      path: '../../public/fonts/poppins/Poppins-Bold.ttf',
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
    <html lang="en" suppressHydrationWarning>
      <meta name="theme-color" content={'#00A98D'} />
      <FirebaseAppProvider>
        <body
          className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen min-w-screen h-screen w-screen`}
        >
          <ThemeProvider attribute="class"
            defaultTheme="system">
            {children}</ThemeProvider>
        </body>
      </FirebaseAppProvider>
    </html>
  );
}
