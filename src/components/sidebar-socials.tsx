import { IconBrandFacebook, IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, } from '@tabler/icons-react'
import { Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const socials = [
    {
        icon: <Mail className="w-5 h-5 text-white" />,
        label: 'roshanaryal.dev@gmail.com',
        href: 'mailto:roshanaryal.dev@gmail.com',
    },
    {
        icon: <IconBrandGithub className="w-5 h-5 text-white" />,
        label: 'Github',
        href: 'https://github.com/Roshan484',
    },
    {
        icon: <IconBrandLinkedin className="w-5 h-5 text-white" />,
        label: 'Linkedin',
        href: 'https://www.linkedin.com/in/rosanaryal/',

    },
    {
        icon: <IconBrandInstagram className="w-5 h-5 text-white" />,
        label: 'Instagram',
        href: 'https://www.instagram.com/roshanaryal__/',
    },
    {
        icon: <IconBrandFacebook className="w-5 h-5 text-white" />,
        label: 'Facebook',
        href: 'https://www.facebook.com/roshaan.aryal/',
    }

]

const SidebarSocials = () => {
    return (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50" >
            <div className="space-y-1">
                {socials.map((social, idx) => (
                    <Link
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center  max-w-7 hover:max-w-xs hover:rounded-tr-md hover:rounded-br-md bg-primary transition-all duration-300 overflow-hidden pr-3`}
                    >
                        <span className="ml-1">{social.icon}</span>
                        <span className={`ml-2 text-white whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300`}>
                            {social.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SidebarSocials
