import React from 'react'
import "@/styles/globals.css";
import Navbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer';
import { MobileMenu } from '@/components/layouts/mobile-menu';
import SidebarSocials from '@/components/sidebar-socials';
const BaseRootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <main className='relative scroll-smooth'>
            <Navbar />
            <MobileMenu />
            <SidebarSocials />
            {children}
            <Footer />
        </main>
    )
}

export default BaseRootLayout