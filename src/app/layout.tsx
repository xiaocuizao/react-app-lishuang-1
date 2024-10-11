"use client";
import { useEffect, useState } from "react";
import "./globals.css";
import { useRouter, usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isJump, setIsJump] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 在客户端渲染时才执行以下代码
      let loginInfor = localStorage.getItem("loginInfor");
      if (loginInfor) {
        // router.push("/login");
      }
      setIsJump(true);
    }
  }, []);

  return (
    <html lang="en">
      <body>{isJump && <main>{children}</main>}</body>
    </html>
  );
}
