"use client"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import React, { useState } from 'react'
import { editProjectSchema, } from "@/schema/project"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import type z from "zod"
import { api } from "@/trpc/react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Edit } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"


const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
interface EditDialogProps {
    id: number
    title: string
    description: string
    tags: string[]
    image: string
    demoUrl: string
    repoUrl: string
}
const EditDialog = ({ id, title, description, tags, image, demoUrl, repoUrl
}: EditDialogProps) => {
    const initailTags = tags
    const [editTags, setTags] = useState<string[]>(initailTags)
    const [tagInput, setTagInput] = useState("")
    const utils = api.useUtils();
    type FormData = z.infer<typeof editProjectSchema>
    const {
        formState: { errors, isSubmitting },
        setError,
        setValue,
        control,
        register,
        handleSubmit,
    } = useForm<FormData>({
        resolver: zodResolver(editProjectSchema),
        defaultValues: {
            id,
            title,
            description,
            tags,
            image,
            demoUrl,
            repoUrl
        },
        mode: "onChange"
    })

    const addTag = () => {
        if (tagInput.trim() && !editTags.includes(tagInput.trim()) && editTags.length < 10) {
            const newTags = [...editTags, tagInput.trim()]
            setTags(newTags)
            setValue("tags", newTags, { shouldValidate: true })
            setTagInput("")
        }
    }

    const removeTag = (tagToRemove: string) => {
        const newTags = editTags.filter((tag) => tag !== tagToRemove)
        setTags(newTags)
        setValue("tags", newTags, { shouldValidate: true })
    }


    const createUpdateMutation = api.project.update.useMutation({
        onSuccess: () => {
            void utils.project.invalidate()
            toast.success("Project updated successfully")

        },
        onError: () => {
            toast.error("Failed to update project")
            setError("root", {
                type: "manual",
                message: "Something went wrong. Please try again later.",
            })
        },
    })

    const onSubmit = async (data: FormData) => {
        console.log("Form data:", data);
        try {
            await createUpdateMutation.mutateAsync({
                ...data,
                id,
                tags: editTags
            })
        } catch (error) {
            console.error("Submit error:", error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Edit className="mr-2 w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>

                <Card>
                    <CardHeader>
                        <CardTitle>Edit Project</CardTitle>
                        <CardDescription>Fill in the details below to update your project.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <ScrollArea className="h-[70vh] w-full p-2">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {
                                    errors.root && (
                                        <p className="text-sm text-red-500">{errors.root.message}</p>
                                    )
                                }
                                <DialogTitle>
                                    <Input defaultValue={id} readOnly disabled />
                                </DialogTitle>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Project Title *</Label>
                                        <Input
                                            id="title"
                                            placeholder="Enter project title"
                                            defaultValue={title}
                                            {...register("title")}
                                            className={errors.title ? "border-red-500" : ""}
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-red-500">{errors.title.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="image">Image URL</Label>
                                        <Input
                                            id="image"
                                            placeholder="https://example.com/image.jpg"
                                            defaultValue={image}
                                            {...register("image")}
                                            className={errors.image ? "border-red-500" : ""}
                                        />
                                        {errors.image && (
                                            <p className="text-sm text-red-500">{errors.image.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags * (Click to remove)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="tags"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            placeholder="Add a tag"
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault()
                                                    addTag()
                                                }
                                            }}
                                            className={errors.tags ? "border-red-500" : ""}
                                        />
                                        <Button
                                            type="button"
                                            onClick={addTag}
                                            variant="outline"
                                            disabled={!tagInput.trim() || editTags.length >= 10}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                    {editTags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {editTags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                    className="cursor-pointer hover:bg-red-100 hover:text-red-800 transition-colors"
                                                    onClick={() => removeTag(tag)}
                                                >
                                                    {tag} ×
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                    {errors.tags && (
                                        <p className="text-sm text-red-500">{errors.tags.message}</p>
                                    )}
                                    <p className="text-sm text-gray-500">{editTags.length}/10 tags</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="demoUrl">Demo URL</Label>
                                        <Input
                                            id="demoUrl"
                                            placeholder="https://demo.example.com"
                                            defaultValue={demoUrl}
                                            {...register("demoUrl")}
                                            className={errors.demoUrl ? "border-red-500" : ""}
                                        />
                                        {errors.demoUrl && (
                                            <p className="text-sm text-red-500">{errors.demoUrl.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="repoUrl">Repository URL</Label>
                                        <Input
                                            id="repoUrl"
                                            placeholder="https://github.com/username/repo"
                                            defaultValue={repoUrl}
                                            {...register("repoUrl")}
                                            className={errors.repoUrl ? "border-red-500" : ""}
                                        />
                                        {errors.repoUrl && (
                                            <p className="text-sm text-red-500">{errors.repoUrl.message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-6 mb-20 sm:mb-14">
                                    <Label className="mb-1 block font-medium">Property Description</Label>
                                    <Controller
                                        control={control}
                                        name="description"
                                        render={({ field }) => (
                                            <ReactQuill
                                                theme="snow"
                                                className="h-[200px]"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {
                                        errors.description && (
                                            <p className="text-sm text-red-500">{errors.description.message}</p>
                                        )
                                    }
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="min-w-[120px]"
                                    >
                                        {isSubmitting ? "Saving..." : "Save Project"}
                                    </Button>
                                </div>
                            </form>
                        </ScrollArea>
                    </CardContent>
                </Card>

            </DialogContent>
        </Dialog>
    )
}




export default EditDialog