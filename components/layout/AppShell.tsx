"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";

// Pages that should NOT have the sidebar (landing, generate)
const NO_SIDEBAR_ROUTES = ["/", "/generate"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = !NO_SIDEBAR_ROUTES.includes(pathname);

  if (!showSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-dark-bg overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-y-auto">
        <div className="min-h-full">{children}</div>
      </main>
    </div>
  );
}
