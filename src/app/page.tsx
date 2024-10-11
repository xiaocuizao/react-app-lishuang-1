import Image from "next/image";
import Login from "./login/page";
import { Color } from "antd/es/color-picker";
import Layout from "./layout";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Layout>1111{children}</Layout>
    </div>
  );
}
