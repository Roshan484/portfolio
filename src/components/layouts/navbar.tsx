
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

const Navbar = () => {
    return (
        <>
            <div className='p-2 sticky top-0 z-50 md:hidden flex items-center justify-center  border border-primary/20 w-full bg-background/80  supports-[backdrop-filter]:bg-background/60 backdrop-blur '>
                <h1 className='text-center'>Roshan Aryal</h1>
            </div>

            <div className='sticky hidden md:block top-2 z-50 px-2'>
                <div className="max-w-7xl mx-auto flex w-full rounded-full items-center justify-between py-3 bg-background/90  supports-[backdrop-filter]:bg-background/60 backdrop-blur border border-primary/20 px-3">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src={"/logo.png"} width={40} height={40} alt="logo" />
                        <span className="text-xl font-bold">Roshan Aryal</span>
                    </Link>

                    <ul className='flex items-center space-x-4'>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/#about">About</Link>
                        </li>
                        <li>
                            <Link href="/#skills">Skills</Link>
                        </li>

                        <li>
                            <Link href="/#projects">Projects</Link>
                        </li>
                        <li>
                            <Link href="/#services">Work Experience</Link>
                        </li>
                        <li>
                            <Link href="/#contact">Contact</Link>
                        </li>
                    </ul>

                    <Button asChild className='rounded-full'>
                        <Link href="/roshan-resume.pdf" download={true} >Resume</Link>
                    </Button>

                </div>
            </div>
        </>
    )
}

export default Navbar