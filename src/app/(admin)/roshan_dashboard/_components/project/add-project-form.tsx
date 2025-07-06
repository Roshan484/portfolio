"use client"
import { useState } from "react"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type z from "zod"
import { projectSchema } from "@/schema/project"
import { api } from "@/trpc/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";


const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type ProjectFormData = z.infer<typeof projectSchema>

function AddProjectForm() {
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState("")
    const utils = api.useUtils();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
        setValue,
        reset,
        control,
        setError
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: "",
            image: "",
            description: "",
            demoUrl: "",
            repoUrl: "",
            tags: []
        },
        mode: "onChange"
    })

    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 10) {
            const newTags = [...tags, tagInput.trim()]
            setTags(newTags)
            setValue("tags", newTags, { shouldValidate: true })
            setTagInput("")
        }
    }

    const removeTag = (tagToRemove: string) => {
        const newTags = tags.filter((tag) => tag !== tagToRemove)
        setTags(newTags)
        setValue("tags", newTags, { shouldValidate: true })
    }

    const createProjectMutation = api.project.create.useMutation({
        onSuccess: async (data) => {
            if (data.success) {
                reset();
                await utils.project.invalidate();
                router.push("/roshan_dashboard?tab=project");
                toast.success("Buyer created successfully");
            } else {
                toast.error(data.error ?? "Failed to create buyer");
                setError("root", {
                    type: "manual",
                    message:
                        data.error ?? "Something went wrong. Please try again later.",
                });
            }

        },
        onError: (error) => {
            console.error("Mutation error:", error);
            toast.error("Failed to create project");
            setError("root", {
                type: "manual",
                message: "Something went wrong. Please try again later.",
            });
        },
    })

    const onSubmit: SubmitHandler<ProjectFormData> = async (data: ProjectFormData) => {
        try {
            await createProjectMutation.mutateAsync(data)
            setTags([])
            setTagInput("")

        } catch (error) {
            console.error(error, "Something went wrong. Please try again later.");
            setError("root", {
                type: "manual",
                message: "Something went wrong. Please try again later.",
            });
        }
    }

    const onSaveDraft = async (data: ProjectFormData) => {
        try {

            await new Promise(resolve => setTimeout(resolve, 500))
            console.log("Draft saved:", data)
            alert("Draft saved successfully!")
        } catch (error) {
            console.error("Error saving draft:", error)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Project</CardTitle>
                <CardDescription>Fill in the details below to add a new project to your portfolio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-6">
                    {
                        errors.root && (
                            <p className="text-sm text-red-500">{errors.root.message}</p>
                        )
                    }
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Project Title *</Label>
                            <Input
                                id="title"
                                placeholder="Enter project title"
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
                                onKeyPress={(e) => {
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
                                disabled={!tagInput.trim() || tags.length >= 10}
                            >
                                Add
                            </Button>
                        </div>
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map((tag) => (
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
                        <p className="text-sm text-gray-500">{tags.length}/10 tags</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="demoUrl">Demo URL</Label>
                            <Input
                                id="demoUrl"
                                placeholder="https://demo.example.com"
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
                                {...register("repoUrl")}
                                className={errors.repoUrl ? "border-red-500" : ""}
                            />
                            {errors.repoUrl && (
                                <p className="text-sm text-red-500">{errors.repoUrl.message}</p>
                            )}
                        </div>

                    </div>
                    <div className="space-y-2 mb-20 sm:mb-14">
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

                    <div className="flex gap-2 mt-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="min-w-[120px]"
                            onClick={handleSubmit(onSubmit)}
                        >
                            {isSubmitting ? "Saving..." : "Save Project"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleSubmit(onSaveDraft)}
                            disabled={isSubmitting || !isDirty}
                            className="min-w-[120px]"
                        >
                            Save as Draft
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default AddProjectForm