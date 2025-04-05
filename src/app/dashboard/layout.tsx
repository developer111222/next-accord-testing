"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../component/DashboardComponent";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt,} from "@tabler/icons-react";
import { FcShop } from "react-icons/fc";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // Detect current page

  const links = [
    { label: "Dashboard", href: "/dashboard", icon: <IconBrandTabler className="h-5 w-5" /> },
    // { label: "Profile", href: "/dashboard/profile", icon: <IconUserBolt className="h-5 w-5" /> },
    { label: "Product", href: "/dashboard/product", icon: <FcShop className="h-5 w-5" /> },
    { label: "All Products", href: "/dashboard/allproducts", icon: <IconArrowLeft className="h-5 w-5" /> },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-100 dark:bg-neutral-900">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="gap-10">
          <div className="flex flex-1 flex-col">
            {links.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={link}
                className={`p-2 ${pathname === link.href ? "bg-gray-200 dark:bg-neutral-700" : ""}`} // ✅ Highlight active page
              />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content Area */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
