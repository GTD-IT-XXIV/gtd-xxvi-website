"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuDatabase as Database,
  LuHome as Home,
  LuSettings as Settings,
} from "react-icons/lu";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";

export type DashboardTabsProps = {
  className?: string;
};

export default function DashboardTabs({ className }: DashboardTabsProps) {
  const pathname = usePathname();

  let tabValue = "home";
  switch (pathname) {
    case "/dashboard/settings": {
      tabValue = "settings";
      break;
    }
    case "/dashboard/data": {
      tabValue = "data";
      break;
    }
    case "/dashboard/home":
    default: {
      tabValue = "home";
      break;
    }
  }

  return (
    <Tabs value={tabValue} className={cn("", className)}>
      <TabsList className="flex h-auto">
        <TabsTrigger value="home" className="flex-1" asChild>
          <Link href="/dashboard" className="flex flex-col gap-1">
            <Home className="size-4" />
            Home
          </Link>
        </TabsTrigger>
        <TabsTrigger value="data" className="flex-1" asChild>
          <Link href="/dashboard/data" className="flex flex-col gap-1">
            <Database className="size-4" />
            Data
          </Link>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex-1" asChild>
          <Link href="/dashboard/settings" className="flex flex-col gap-1">
            <Settings className="size-4" />
            Settings
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
