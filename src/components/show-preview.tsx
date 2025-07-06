import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription, DialogTrigger } from "./ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IconEye } from "@tabler/icons-react"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"
import { Badge } from "./ui/badge"
import Link from "next/link"
interface ProjectCardProps {
    title: string
    description: string
    tags: string[]
    image: string
    demoUrl: string
    repoUrl?: string
    showName?: boolean
}

function ShowPreview({ title, description, tags, image, demoUrl, repoUrl, showName }: ProjectCardProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                    <IconEye className="mr-2 h-4 w-4" />
                    {showName ? "Show Preview" : ""}
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

                        <div className="  rounded-lg overflow-hidden ">
                            <Image
                                src={image || "/placeholder.svg"}
                                width={150}
                                height={150}
                                alt={title}
                                className="object-cover rounded-md mx-auto"
                            />
                        </div>

                        {/* Project Details */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Description</h3>
                                <div className="text-zinc-400 leading-relaxed prose-headings:font-bold prose-sm prose-li:text-white prose-a:text-primary prose-p:text-white prose-headings:text-white prose-li:list-disc text-justify" dangerouslySetInnerHTML={{ __html: description }}></div>
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
                                {
                                    repoUrl && (
                                        <Button variant="outline" asChild>
                                            <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
                                                <Github className="mr-2 h-4 w-4" />
                                                View Code
                                            </Link>
                                        </Button>
                                    )
                                }

                            </div>
                        </div>


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

                        {
                            repoUrl && (
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
                            )
                        }

                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default ShowPreview