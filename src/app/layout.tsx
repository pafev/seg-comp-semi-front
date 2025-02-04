import { AuthProvider } from "@/auth/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { Noto_Sans as Font } from "next/font/google";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Seg Comp - Seminario",
  description:
    "Site para demonstracao do seminario de segurança computacional - 211043531",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const font = Font({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${font.className} antialiased`}>
      <body className="min-h-screen overflow-x-hidden">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
