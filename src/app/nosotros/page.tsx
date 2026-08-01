import type { Metadata } from "next";
import About from "@/components/About";
import Team from "@/components/Team";

export const metadata: Metadata = { title: "Nosotros" };

export default function NosotrosPage() {
  return (
    <>
      <About />
      <Team />
    </>
  );
}
