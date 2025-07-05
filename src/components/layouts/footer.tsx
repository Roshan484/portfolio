import React from 'react'
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from 'next/link';
import { Button } from '../ui/button';
const Footer = () => {
    return (

        <footer className="border-t border-zinc-800 py-12 mb-10 md:mb-0">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <Link href="/" className="font-bold text-xl">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Roshan Aryal</span>

                    </Link>
                    <p className="text-sm text-zinc-500 mt-2">
                        © {new Date().getFullYear()} Roshan Aryal. All rights reserved.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                        >
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </Button>
                    </Link>
                    <Link href="https://www.linkedin.com/in/shinekyawkyawaung/" target="_blank" rel="noopener noreferrer">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                        >
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Button>
                    </Link>
                    <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                        >
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </Button>
                    </Link>
                    <Link href="mailto:hello@example.com">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                        >
                            <Mail className="h-5 w-5" />
                            <span className="sr-only">Email</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer