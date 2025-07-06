"use client"

import type React from "react"


import { motion } from "framer-motion"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useForm, type SubmitHandler } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/trpc/react"

const formData = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message is required"),
})

type FormData = z.infer<typeof formData>

export function ContactForm() {

    const { register, formState: { errors, isSubmitting }, handleSubmit, reset, setError } = useForm<FormData>({
        resolver: zodResolver(formData),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: ""
        },
        mode: "onChange"
    })
    const createContactMutation = api.contact.submit.useMutation({
        onSuccess: () => {
            toast.success("Message sent successfully", {
                description: "I will get back to you soon"
            })
            reset()
        },
        onError: () => {
            toast.error("Error sending message");
            setError("root", { message: "Error sending message" })
        }
    })
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            await createContactMutation.mutateAsync(data)
            reset()
        } catch (error: unknown) {
            console.log(error)
            toast.error("Error sending message");
            setError("root", { message: "Error sending message" })
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-primary/50">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

                <div className="relative">
                    <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Input
                                placeholder="Your Name"
                                required
                                {...register("name")}
                                className="bg-zinc-900/50 border-zinc-700 focus:border-primary focus:ring-primary/20"
                            />
                            {
                                errors.name && <p className="text-red-500 pt-2">
                                    {errors.name.message}
                                </p>
                            }
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="Your Email"
                                required
                                {...register("email")}
                                className="bg-zinc-900/50 border-zinc-700 focus:border-primary focus:ring-primary/20"
                            />
                            {
                                errors.email && <p className="text-red-500 pt-2">
                                    {errors.email.message}
                                </p>
                            }
                        </div>
                        <div className="space-y-2">
                            <Input
                                placeholder="Subject"
                                required
                                {...register("subject")}
                                className="bg-zinc-900/50 border-zinc-700 focus:border-primary focus:ring-primary/20"
                            />
                            {
                                errors.subject && <p className="text-red-500 pt-2">
                                    {errors.subject.message}
                                </p>
                            }
                        </div>
                        <div className="space-y-2">
                            <Textarea
                                placeholder="Your Message"
                                rows={5}
                                required
                                {...register("message")}
                                className="bg-zinc-900/50 border-zinc-700 focus:border-primary focus:ring-primary/20"
                            />
                            {
                                errors.message && <p className="text-red-500 pt-2">
                                    {errors.message.message}
                                </p>
                            }
                        </div>

                        {errors.root && <em className="text-red-500">
                            {errors.root.message}
                        </em>}
                        <Button
                            type="submit"
                            className="w-full "
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>Sending...</>
                            ) : (
                                <>
                                    Send Message <Send className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}
