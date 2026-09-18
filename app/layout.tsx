import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") || incoming.get("host") || "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;
  const title = "AI Shiksha | AI Skilling for Educators";
  const description = "Practical, responsible and inclusive AI learning for educators, created by A4I, Microsoft and Vision Empower Trust.";
  return { title, description, icons:{icon:"/favicon.svg"}, openGraph:{title,description,images:[image]}, twitter:{card:"summary_large_image",title,description,images:[image]} };
}

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
