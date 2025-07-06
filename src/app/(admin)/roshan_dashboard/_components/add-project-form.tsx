"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


const projectSchema = z.object({
    title: z.string().min(1, "Project title is required").max(100, "Title must be less than 100 characters"),
    image: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description must be less than 1000 characters"),
    demoUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    repoUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    tags: z.array(z.string()).min(1, "At least one tag is required").max(10, "Maximum 10 tags allowed")
})

type ProjectFormData = z.infer<typeof projectSchema>

function AddProjectForm() {
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
        setValue,
        reset
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

    const onSubmit = async (data: ProjectFormData) => {
        try {

            await new Promise(resolve => setTimeout(resolve, 1000))
            console.log("Project data:", data)
            reset()
            setTags([])
            setTagInput("")
            alert("Project saved successfully!")
        } catch (error) {
            console.error("Error saving project:", error)

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
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe your project..."
                            className={`min-h-[100px] ${errors.description ? "border-red-500" : ""}`}
                            {...register("description")}
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">{errors.description.message}</p>
                        )}
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

                    <div className="flex gap-2">
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