import Leftbar from "@/components/dashboardLayout/Leftbar";
import TopBar from "@/components/dashboardLayout/TopBar";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai_Looped } from "next/font/google";
import "../globals.css";

const inter = IBM_Plex_Sans_Thai_Looped({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard Layout for admin",
  description: "Generated by next js for dashboard authentication layout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex max-lg:flex-col min-w-screen min-h-screen bg-gradient-to-br from-white to-blue-100">
          <Leftbar />
          <TopBar />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
