"use client";
import Image from "next/image";
import logo from "../../public/logo.svg";

import { CalendarDaysIcon, FolderIcon, FunnelIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const menuItems = [
  {
    name: "Overview",
    href: "#",
    current: false,
    icon: <HomeIcon className="mr-4 h-5 w-5" />,
  },
  {
    name: "Funnels",
    href: "#",
    current: false,
    icon: <FunnelIcon className="mr-4 h-5 w-5" />,
  },
  {
    name: "Leads",
    href: "#",
    current: false,
    icon: <CalendarDaysIcon className="mr-4 h-5 w-5" />,
  },
  {
    name: "Segments",
    href: "#",
    current: false,
    icon: <FolderIcon className="mr-4 h-5 w-5" />,
  },
  {
    name: "Workflows",
    href: "#",
    current: false,
    icon: <HomeIcon className="mr-4 h-5 w-5" />,
  },
  {
    name: "Integrations",
    href: "#",
    current: false,
    icon: <HomeIcon className="mr-4 h-5 w-5" />,
  },
  {
    name: "Settings",
    href: "#",
    current: false,
    icon: <HomeIcon className="mr-4 h-5 w-5" />,
  },
];

export default function Sidebar() {
  const [selectedItem, setSelectedItem] = useState("Getting started");

  return (
    <div className="border-r-10 w-64 min-w-[281px] rounded-r-2xl bg-nav_bg p-6 shadow-nav-shadow">
      <div className="">
        <Image src={logo} alt="My SVG Image" width={169} height={500} />
      </div>
      <hr className="mt-4" />
      <nav className="mt-3">
        <div className="mx-2 flex items-center pl-1">
        <UserIcon className="mr-1 h-5 w-5" />
          <select className="w-full rounded bg-inherit p-2  font-pretendard text-base font-semibold text-nav_primary">
            <option>My workspace</option>
          </select>
        </div>

        <hr className="my-4" />

        <div
          className={`flex h-10 w-full text-[16px] items-center rounded-md px-3 py-3 text-sm tracking-[0.1px] ${
            true
              ? "bg-nav_primary text-white"
              : "text-gray-400 hover:bg-gray-700 hover:text-white"
          }`}
        >
          <HomeIcon className="mr-4 h-5 w-5" />
          Getting started
        </div>

        <hr className="my-4" />

        <ul>
          {menuItems.map((item) => (
            <li  className='mb-1' key={item.name}>
              <button
                onClick={() => {
                  setSelectedItem(item.name);
                }}
                className={`flex text-[16px] h-10 w-full items-center px-3 py-3 text-left text-base text-sm leading-4 tracking-[0.1px] ${
                  selectedItem === item.name
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center">
         
          <div className="ml-3">
            <p className="text-sm font-medium">Chris Hood</p>
            <p className="text-xs text-gray-500">hello@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
