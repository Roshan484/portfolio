"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, ExternalLink, Github } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription, DialogTrigger } from "./ui/dialog"

import { IconEye } from "@tabler/icons-react"

interface ProjectCardProps {
    title: string
    description: string
    tags: string[]
    image: string
    demoUrl: string
    repoUrl: string
}

export function ProjectCard({ title, description, tags, image, demoUrl, repoUrl }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="group"
        >
            <div
                className="relative h-full overflow-hidden rounded-xl cursor-pointer bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 transition-all duration-300 group-hover:border-primary/50"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative h-full flex flex-col">
                    <div className="relative overflow-hidden h-48">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                        <Image
                            fill
                            src={image || "/placeholder.svg"}
                            alt={title}
                            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
                        />
                    </div>

                    <div className="p-6 flex-grow">
                        <h3 className="text-xl font-bold mb-2">{title}</h3>
                        <p className="text-zinc-400 mb-4">{description}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="bg-zinc-700/50 hover:bg-zinc-700 text-zinc-300">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex justify-between mt-auto pt-4 border-t border-zinc-700/50">
                            <ShowPreview
                                title={title}
                                description={description}
                                tags={tags}
                                image={image}
                                demoUrl={demoUrl}
                                repoUrl={repoUrl}
                            />
                            <Button
                                size="sm"
                                asChild
                            >
                                <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
                                    Live Demo
                                    <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="absolute top-3 right-3 z-20">
                        <div
                            className={`w-3 h-3 rounded-full ${isHovered ? "bg-green-500" : "bg-zinc-500"} transition-colors duration-300`}
                        ></div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

function ShowPreview({ title, description, tags, image, demoUrl, repoUrl }: ProjectCardProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                    <IconEye className="mr-2 h-4 w-4" />
                    Show Preview
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl mx-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
                    <DialogDescription className="text-base">
                        Detailed preview of the project with all information and live demo.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="h-[70vh] w-full p-2">
                    <div className="space-y-6 p-1">
                        {/* Project Image */}
                        <div className="relative w-full h-64 rounded-lg overflow-hidden border border-zinc-700">
                            <Image
                                fill
                                src={image || "/placeholder.svg"}
                                alt={title}
                                className="object-cover"
                            />
                        </div>

                        {/* Project Details */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Description</h3>
                                <p className="text-zinc-400 leading-relaxed">{description}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="bg-zinc-700/50 hover:bg-zinc-700 text-zinc-300"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button asChild>
                                    <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        Live Demo
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
                                        <Github className="mr-2 h-4 w-4" />
                                        View Code
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Live Preview Iframe */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold">Live Preview</h3>
                            <div className="w-full h-96 rounded-lg overflow-hidden border border-zinc-700">
                                <iframe
                                    src={demoUrl}
                                    title={`${title} - Live Preview`}
                                    className="w-full h-full"
                                    frameBorder={0}
                                    allowFullScreen
                                />
                            </div>
                        </div>

                        {/* Repository Preview */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold">Repository</h3>
                            <div className="w-full h-96 rounded-lg overflow-hidden border border-zinc-700">
                                <iframe
                                    src={repoUrl}
                                    title={`${title} - Repository`}
                                    className="w-full h-full"
                                    frameBorder={0}
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}