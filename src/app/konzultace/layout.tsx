import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Úvodní rozhovor, 30 minut",
  description:
    "Vyberte si termín v kalendáři, online nebo v kanceláři v Praze 1. " +
    "Probereme firmu, majetek a rodinu a řeknu vám rovnou, jestli vám můžu pomoct.",
};

export default function KonzultaceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
