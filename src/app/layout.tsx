// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider
import { auth } from "@/lib/auth"; // Import auth to get session on server
import { Toaster } from "@/components/ui/sonner"; // For Shadcn toasts

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KBHS School Management",
  description: "Comprehensive School Management System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth(); // Get session on the server

  return (
    // Wrap everything with SessionProvider and pass the server session
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          {children}
          <Toaster /> {/* Add toaster for notifications */}
        </body>
      </html>
    </SessionProvider>
  );
}
