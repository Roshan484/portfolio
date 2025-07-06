"use client"
import ShowPreview from "@/components/show-preview"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { api } from "@/trpc/react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Eye, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import EditDialog from "./edit-dialog"



function ProjectTable() {

    const utils = api.useUtils()
    const { data: projects = [], isLoading, error } = api.project.getAll.useQuery()
    const deleteMutation = api.project.delete.useMutation({
        onSuccess: () => {
            void utils.project.invalidate()
            toast.success("Project deleted successfully")
        },
        onError: () => {
            toast.error("Failed to delete project")
        },
    })

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Project</CardTitle>
                    <CardDescription>Loading projects...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Project</CardTitle>
                    <CardDescription>Error loading projects</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-red-600">
                        Failed to load projects: {error.message}
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Projects</CardTitle>
                <CardDescription>View and manage project submissions.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead className="w-[120px]">Image</TableHead>
                                <TableHead className="w-[200px]">Title</TableHead>
                                <TableHead className="w-[200px]">Tags</TableHead>
                                <TableHead className="w-[200px]">URL</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.length > 0 ? (
                                projects.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell className="font-medium">{project.id}</TableCell>
                                        <TableCell>
                                            <Image
                                                src={project.image ?? "/placeholder.png"}
                                                alt={project.title ?? "Project"}
                                                width={100}
                                                height={100}
                                                className="rounded-md"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{project.title}</TableCell>

                                        <TableCell className="max-w-xl truncate">
                                            {project.tags?.map((tag, index) => (

                                                <Badge key={index} className="mr-2">{tag}</Badge>

                                            ))}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant={"outline"} asChild>
                                                <Link href={project.demoUrl ?? "#"} target="_blank" rel="noopener noreferrer">
                                                    <Eye className="mr-2 h-4 w-4" />  View Website
                                                </Link>
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <AlertForDelete deleteProject={() => deleteMutation.mutate({ id: project.id })} />
                                                <ShowPreview
                                                    title={project.title ?? ""}
                                                    description={project.description ?? ""}
                                                    tags={project.tags ?? []}
                                                    image={project.image ?? "/placeholder.png"}
                                                    demoUrl={project.demoUrl ?? ""}
                                                    repoUrl={project.repoUrl ?? ""}
                                                />

                                                <EditDialog
                                                    id={project.id}
                                                    title={project.title ?? ""}
                                                    description={project.description ?? ""}
                                                    tags={project.tags ?? []} image={project.image ?? ""}
                                                    demoUrl={project.demoUrl ?? ""}
                                                    repoUrl={project.repoUrl ?? ""}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))

                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No projects found.
                                    </TableCell>
                                </TableRow>
                            )
                            }
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProjectTable


function AlertForDelete({ deleteProject }: { deleteProject: () => void }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild >
                <Button variant={"outline"} className="hover:border-red-500 hover:text-red-500">
                    <Trash className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteProject} className="bg-red-600">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}