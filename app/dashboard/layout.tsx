"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import {
  Briefcase,
  ChevronLeft,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  Users,
  X,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/services", label: "Services", icon: Briefcase },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string } | null>(null);

  const handleLogout = () => {
    console.log("Logging out and redirecting to root...");
    localStorage.removeItem("currentUser"); // Clear user session
    router.push("/");
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="flex w-full min-h-screen bg-gray-100 md:flex-row flex-col">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4 border-b border-gray-700 sticky top-0 z-20">
        <div className="flex items-center gap-2 cursor-pointer">
          <Link href="https://mtmony.vercel.app">
            <Image
              src="/avatar.png"
              alt="Company Logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full bg-white p-0.5"
            />
            <span className="text-xl font-bold">MT MONY</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleLogout} aria-label="Log out">
            <LogOut size={24} />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Backdrop for mobile sidebar */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Desktop Sidebar */}
      {/* Hidden on mobile, visible from md breakpoint up */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-40 flex flex-col bg-gray-800 text-white p-4 shrink-0 transition-transform duration-300 ease-in-out ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${isSidebarCollapsed ? "md:w-20" : "w-64"}`}
      >
        <button
          className="absolute top-3 right-3 md:hidden text-gray-400 hover:text-white"
          onClick={() => setMobileSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>
        <div className="mb-8">
          <button
            className={`flex items-center rounded-lg text-white transition-colors duration-300 hover:bg-gray-700 ${
              isSidebarCollapsed ? "justify-center" : "bg-cyan-800"
            } w-full`}
          >
            <Link href="https://mtmony.vercel.app">
              <div className="flex items-center gap-3 p-3">
                <Image
                  src="/avatar.png"
                  alt="Company Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 shrink-0 rounded-full bg-white p-0.5 border-2 border-gray-700"
                />
                <span
                  className={`text-xl font-bold transition-opacity flex-1 text-center ${
                    isSidebarCollapsed ? "hidden" : "inline"
                  }`}
                >
                  MT MONY
                </span>
              </div>
            </Link>
          </button>
        </div>
        <nav className="grow">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 p-3 my-2 rounded-lg text-gray-300 transition-all duration-200 ease-in-out hover:bg-gray-700 hover:text-white ${
                    isSidebarCollapsed ? "justify-center" : ""
                  } ${pathname === item.href ? "bg-gray-700 text-white" : ""}`}
                >
                  <item.icon className=" h-5 w-5 shrink-0" strokeWidth={2.5} />
                  <span
                    className={`${isSidebarCollapsed ? "hidden" : "inline"}`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Sidebar Toggle Button */}
        <div className="mt-auto flex flex-col items-center gap-4">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 p-3 my-2 rounded-lg text-gray-300 transition-all duration-200 ease-in-out hover:bg-red-800/50 hover:text-white w-full ${
              isSidebarCollapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="h-5 w-5 shrink-0" strokeWidth={2.5} />
            <span className={`${isSidebarCollapsed ? "hidden" : "inline"}`}>
              Log Out
            </span>
          </button>
          <div className="border-t border-gray-700 w-full pt-4 flex justify-center">
            <button
              onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
              className="bg-cyan-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
              aria-label={
                isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
            >
              <ChevronLeft
                size={28}
                className={`transition-transform duration-300 ${
                  isSidebarCollapsed ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content - with padding for the bottom nav on mobile */}
      <div className="flex-1 flex flex-col">
        <main className="grow p-4 md:p-6">{children}</main>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className="fixed bottom-5 right-5 bg-gray-900 text-white py-3 px-5 rounded-lg shadow-lg animate-fade-in-up"
          role="alert"
          aria-live="assertive"
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
