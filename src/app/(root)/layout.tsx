import type React from "react";
// src/app/(marketing)/layout.tsx
import Footer from "@/components/marketing/Footer";
import Header from "@/components/marketing/Header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
