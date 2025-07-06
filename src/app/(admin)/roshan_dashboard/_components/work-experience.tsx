"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'


const workSchema = z.object({
    title: z.string().min(1, "Work title is required").max(100, "Title must be less than 100 characters"),
    company: z.string().min(1, "Company name is required").max(100, "Company name must be less than 100 characters"),
    period: z.string().min(1, "Period is required").max(100, "Period must be less than 100 characters"),
    description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description must be less than 1000 characters"),
})

type Work = z.infer<typeof workSchema>

const WorkExperience = () => {
    const { handleSubmit, register, formState: { errors, isSubmitting }, setError } = useForm<Work>({
        resolver: zodResolver(workSchema),
        defaultValues: {
            title: "",
            company: "",
            period: "",
            description: ""
        }
    })

    const onSubmit = async (data: Work) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            console.log("Work data:", data)
        } catch (error) {
            console.error("Error saving work:", error)
            setError("root", { message: "Error saving work" })
        }
    }
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                    <CardDescription>Enter your work experience details</CardDescription>
                </CardHeader>
                <CardContent>
                    {
                        errors.root && <p className='text-red-500'>{errors.root.message}</p>
                    }
                    <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-4 sm:grid-cols-2'>

                        <div>
                            <Label htmlFor="title" className='pb-2'>Title</Label>
                            <Input id="title" {...register("title")} />
                            {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="company" className='pb-2'>Company</Label>
                            <Input id="company" {...register("company")} />
                            {errors.company && <p className='text-red-500'>{errors.company.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="period" className='pb-2'>Period</Label>
                            <Input id="period" {...register("period")} />
                            {errors.period && <p className='text-red-500'>{errors.period.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="description" className='pb-2'>Description</Label>
                            <Textarea id="description" {...register("description")} />
                        </div>

                    </form>
                    <Button type='submit' disabled={isSubmitting} className='w-full mt-4'>
                        {isSubmitting ? "Saving..." : "Save"}
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}

export default WorkExperience