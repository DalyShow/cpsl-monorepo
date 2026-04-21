"use client";
import dynamic from "next/dynamic";

// ssr: false prevents sanity.config.ts from being evaluated on the server,
// which would crash Vercel's serverless runtime.
const StudioClient = dynamic(() => import("./StudioClient"), { ssr: false });

export default function StudioPage() {
  return <StudioClient />;
}
