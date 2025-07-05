import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconBadge,
    IconContract,
    IconHome,
    IconMail,

    IconTerminal2,
    IconUser,
} from "@tabler/icons-react";
import Image from "next/image";

export function MobileMenu() {
    const links = [
        {
            title: "Home",
            icon: (
                <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },

        {
            title: "About",
            icon: (
                <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "Projects",
            icon: (
                <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "Download Resume",
            icon: (
                <Image
                    src="/logo.png"
                    width={40}
                    height={40}
                    alt="Aceternity Logo"
                />
            ),
            href: "/roshan-resume.pdf",
            download: true,
        },
        {
            title: "Skills",
            icon: (
                <IconContract className="h-full w-full text-neutral-500 dark:text-neutral-300" />

            ),
            href: "#",
        },

        {
            title: "Work Experience",
            icon: (
                <IconBadge className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "Contact",
            icon: (
                <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
    ];
    return (
        <div className="fixed bottom-3 right-0 flex items-center w-full z-50 ">
            <FloatingDock
                items={links}
            />
        </div>
    );
}
