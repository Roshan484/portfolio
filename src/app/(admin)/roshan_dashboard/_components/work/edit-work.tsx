"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { editWorkSchema } from '@/schema/work'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type z from 'zod'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
type Work = z.infer<typeof editWorkSchema>

interface Props {
    id: number
    title: string
    company: string
    period: string
    description: string
}
const EditWork = ({ id, title, company, period, description }: Props) => {
    const utils = api.useUtils()
    const { handleSubmit, register, formState: { errors, isSubmitting }, setError } = useForm<Work>({
        resolver: zodResolver(editWorkSchema),
        defaultValues: {
            id: id,
            title: title,
            company: company,
            period: period,
            description: description
        },
        mode: "onChange"
    })
    const createWorkMutation = api.work.update.useMutation({
        onSuccess: () => {
            void utils.work.invalidate()
            toast.success("Work Experience updated successfully")
        },
        onError: () => {
            toast.error("Error creating work")
        }
    })
    const onSubmit = async (data: Work) => {
        try {
            await createWorkMutation.mutateAsync({
                id: data.id,
                title: data.title,
                company: data.company,
                period: data.period,
                description: data.description
            })
        } catch (error) {
            console.error("Error saving work:", error)
            setError("root", { message: "Error saving work" })
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-2xl'>
                <DialogHeader>
                    <DialogTitle>Edit Work Experience with id: {id}</DialogTitle>
                </DialogHeader>
                <Card>
                    <CardHeader>
                        <CardTitle>Work Experience</CardTitle>
                        <CardDescription>Enter your work experience details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {
                            errors.root && <p className='text-red-500'>{errors.root.message}</p>
                        }
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div>
                                    <Label htmlFor="title" className='pb-2'>Title</Label>
                                    <Input id="title" defaultValue={title} {...register("title")} />
                                    {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="company" className='pb-2'>Company</Label>
                                    <Input id="company" defaultValue={company} {...register("company")} />
                                    {errors.company && <p className='text-red-500'>{errors.company.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="period" className='pb-2'>Period</Label>
                                    <Input id="period" defaultValue={period} {...register("period")} />
                                    {errors.period && <p className='text-red-500'>{errors.period.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="description" className='pb-2'>Description</Label>
                                    <Textarea id="description" defaultValue={description} {...register("description")} />
                                </div>
                            </div>

                            <Button type='submit' disabled={isSubmitting} className='w-full mt-4'>
                                {isSubmitting ? "Saving..." : "Save"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    )
}

export default EditWork