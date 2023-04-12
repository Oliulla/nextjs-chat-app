import { Icons } from "@/components/Icons";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  return (
    <div className="w-full flex h-screen">
      <div
        className="flex h-full w-full max-w-xs grow 
      flex-col gap-y-5 overflow-y-auto 
      border-r border-gray-300 bg-white px-6"
      >
        <Link href="/dashboard" className="flex h-16 shrink-0 items-center">
          <Icons.Logo className="h-8 w-auto text-indigo-950 ms-auto" />
        </Link>

        <div className="text-xs font-semibold leading-6 text-gray-500">
          your chats
        </div>

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>// chats that this user has</li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-500">
                Overview
              </div>
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;
