"use client";
import { RouterProvider, I18nProvider } from "react-aria-components";
import { useRouter } from "next/navigation";
import { ToastProvider } from "@heroui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <RouterProvider navigate={(path) => router.push(path)}>
      <I18nProvider locale="en-US">
        <ToastProvider />
        {children}
      </I18nProvider>
    </RouterProvider>
  );
}
