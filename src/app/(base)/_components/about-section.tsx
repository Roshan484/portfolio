import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { GlassmorphicCard } from "@/components/ui/glassmorphic-card";
import Image from "next/image";
import Link from "next/link";

import React from 'react'

const AboutSection = () => {
    return (
        <section id="about" className="min-h-screen py-4 relative max-w-6xl mx-auto">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#3b82f6] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-[#3b82f6] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 px-2">
                <SectionHeading title="About Me" subtitle="My background and journey" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
                    <div className="relative">
                        <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-70"></div>
                        <div className="relative w-full h-full rounded-xl overflow-hidden border border-zinc-800">
                            <Image
                                src="/placeholder.svg?height=600&width=600"
                                alt="Roshan Aryal"
                                width={600}
                                height={685}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 w-full p-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-sm font-medium">Available for work</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <GlassmorphicCard>
                            <p className="text-lg text-zinc-300">
                                I&apos;m a passionate software engineer with experience building web applications and digital products. I
                                specialize in frontend development with React and Next.js, but I&apos;m also comfortable working with
                                backend technologies.
                            </p>
                            <p className="text-lg text-zinc-300 mt-4">
                                My journey in tech started with a strong foundation in software development. I&apos;ve worked with various
                                companies to create intuitive, performant, and accessible digital experiences.
                            </p>
                            <p className="text-lg text-zinc-300 mt-4">
                                When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects,
                                and staying up-to-date with the latest industry trends.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 mt-8">
                                <div className="space-y-1">
                                    <div className="text-sm text-zinc-500">Name</div>
                                    <div className="font-medium">
                                        Roshan Aryal
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-zinc-500">Email</div>
                                    <Link href="mailto:roshanaryal.dev@gmail.com" target="_blank" className="font-medium underline text-primary">roshanaryal.dev@gmail.com</Link>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-zinc-500">Location</div>
                                    <div className="font-medium">Pokhara, Nepal</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-zinc-500">Availability</div>
                                    <div className="font-medium text-green-500">Open to opportunities</div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <Button asChild>
                                    <Link href="/roshan-resume.pdf" download={true} target="_blank" className="w-full">
                                        Download Resume
                                    </Link>
                                </Button>
                            </div>
                        </GlassmorphicCard>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection