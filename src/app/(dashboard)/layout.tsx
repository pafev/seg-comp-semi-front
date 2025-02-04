import type { PropsWithChildren } from "react";
import { Navbar } from "./_components/navbar";

export default function LayoutDashboardPage({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
