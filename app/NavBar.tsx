"use client";
import Link from "next/link";
import React from "react";
import { IoBug } from "react-icons/io5";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  const currentPath = usePathname();
  return (
    <nav className="flex h-14 border-b px-6 space-x-6 items-center">
      <Link href="/">
        <IoBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classNames({
                "text-zinc-900": currentPath === link.href,
                "text-zinc-500": currentPath !== link.href,
                " hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
