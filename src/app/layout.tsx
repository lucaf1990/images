import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UserSessionNavBar from "@/components/form/UserSessionNavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <NavBar />
          <main className="mt-20 flex flex-col justify-center items-center">
            <UserSessionNavBar />
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
