import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.scss";
import HeaderUI from "@/components/Layout/Header";
import FooterUI from "@/components/Layout/Footer";
import TranslationContextProvider from "./translation";
import getResourceLocales from "./dictionary";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { Skeleton } from "antd";
import StoreProvider from "./StoreProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SportSocial",
  description:
    "Nơi mọi người có thể tìm kiếm các sân giao lưu gần với mình! Cùng nhau tạo 1 cộng đồng chơi cầu lông lành mạnh",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  const langFromCookies = cookies().get("locale")?.value || "vi";
  const locales = getResourceLocales(langFromCookies);  
  return (
    <html lang="en">
      <body className="h-full">
        <StoreProvider>
          <TranslationContextProvider lng={langFromCookies} locales={locales}>
            <HeaderUI language={langFromCookies} />
            <Suspense fallback={<Skeleton />}>
              <div className="layout-content">{children}</div>
            </Suspense>
            <FooterUI />
          </TranslationContextProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
