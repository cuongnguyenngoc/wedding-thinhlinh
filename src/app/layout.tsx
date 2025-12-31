import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { inviteData } from "@/utils/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: inviteData.coupleNamesMeta,
  description: `Thiệp mời cưới ${inviteData.coupleNamesMeta}`,
  openGraph: {
    title: inviteData.coupleNamesMeta,
    description: `Thiệp mời cưới ${inviteData.coupleNamesMeta}`,
    siteName: "Wedding Invite",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: inviteData.coupleNamesMeta,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div id="page-wrapper" className="overflow-y-auto h-screen">
          {children}
        </div>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              fontSize: "1.1rem",
              fontWeight: 500,
              fontFamily: "inherit",
              background: "#fffaf8",
              color: "#7b2020",
              border: "1px solid #f0c5c5",
              borderRadius: "12px",
              padding: "1rem 1.25rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            },
            success: {
              iconTheme: {
                primary: "#b33",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
