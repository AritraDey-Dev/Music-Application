import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import SupabaseProvider from "@/Providers/supabaseProvider";
import UserProvider from "@/Providers/useProvider";
import ModelProvider from "@/Providers/modelprovider";
import ToasterProvider from "@/Providers/toastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome To Your Music Player",
  description: "Listen To Your Favourite Music!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider/>
        <SupabaseProvider>
          <UserProvider>
            <ModelProvider/>
        {/* <Sidebar> */}
        
          {children}
        {/* </Sidebar> */}
      
        </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
 