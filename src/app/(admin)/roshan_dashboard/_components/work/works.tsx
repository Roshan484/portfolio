"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from '@/trpc/react'
import EditWork from './edit-work'
import { toast } from 'sonner'
import AlertForDelete from './delete-work'
import { Badge } from '@/components/ui/badge'
const Works = () => {
    const { data: works, isLoading, error } = api.work.getAll.useQuery()
    const utils = api.useUtils()
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
                    <CardTitle>Work Experience</CardTitle>
                    <CardDescription>Loading work experience...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (works?.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                    <CardDescription>No work experience found...</CardDescription>
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
                    <CardTitle>Work Experience</CardTitle>
                    <CardDescription>Error loading work experience...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                </CardContent>
            </Card>
        )
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>Work Experience</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    {works?.map((work) => (
                        <WorkExperience
                            key={work.id}
                            id={work.id}
                            title={work.title}
                            company={work.company}
                            period={work.period}
                            description={work.description}
                            deleteWork={() => deleteMutation.mutateAsync({ id: work.id })}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default Works


function WorkExperience({ id,
    title,
    company,
    period,
    description,
    deleteWork
}: {
    id: number,
    title: string | null,
    company: string | null,
    period: string | null,
    description: string | null
    deleteWork: () => void
}) {
    return (
        <Card className='relative'>
            <Badge className='absolute top-2 right-2 text-sm text-foreground'>
                {id}
            </Badge>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{company} | {period} </CardDescription>
            </CardHeader>
            <CardContent>
                <p className='text-sm text-foreground'>{description}</p>
                <div className='mt-3 flex items-center justify-between border-t border-zinc-700 pt-3'>
                    <EditWork id={id}
                        title={title ?? ""}
                        company={company ?? ""}
                        period={period ?? ""}
                        description={description ?? ""}
                    />
                    <AlertForDelete deleteWork={deleteWork} />
                </div>
            </CardContent>
        </Card>
    )
}