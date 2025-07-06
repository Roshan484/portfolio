"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { api } from "@/trpc/react"
import { Eye, Trash, Trash2Icon } from "lucide-react"
import { toast } from "sonner"


function ContactTable() {
    const utils = api.useUtils()
    const { data: allContacts, isLoading, error } = api.contact.getAll.useQuery()
    const deleteMutation = api.contact.delete.useMutation({
        onSuccess: () => {
            void utils.contact.invalidate()
            toast.success("Contact deleted successfully")
        },
        onError: () => {
            toast.error("Failed to delete contact")
        },
    })

    const deleteAllMutation = api.contact.deleteAll.useMutation({
        onSuccess: () => {
            void utils.contact.invalidate()
            toast.success("All contacts deleted successfully")
        },
        onError: () => {
            toast.error("Failed to delete all contacts")
        },
    })

    if (isLoading) return (
        <Card>
            <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>Loading contact messages...</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            </CardContent>
        </Card>
    )

    if (error) return (
        <Card>
            <CardHeader>
                <CardTitle>Error</CardTitle>
                <CardDescription>Failed to load contact messages.</CardDescription>
            </CardHeader>
        </Card>
    )

    if (allContacts?.length === 0) return (
        <Card>
            <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>No contact messages found.</CardDescription>
            </CardHeader>
        </Card>
    )
    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <div>
                    <CardTitle>Contact Messages</CardTitle>
                    <CardDescription>View and manage contact form submissions.</CardDescription>
                </div>

                <div>
                    <Button variant={"outline"}
                        className="text-red-500 hover:text-red-700 flex items-center"
                        onClick={() => deleteAllMutation.mutateAsync()}

                    >
                        <Trash2Icon className="w-4 h-4" /> Delete All
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allContacts?.map((contact) => (
                                <TableRow key={contact.id}>
                                    <TableCell className="font-medium">{contact.name}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.subject}</TableCell>
                                    <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                                    <TableCell>{contact.createdAt.toLocaleDateString()}</TableCell>

                                    <TableCell>
                                        <ViewDialog name={contact.name ?? ""}
                                            email={contact.email ?? ""}
                                            subject={contact.subject ?? ""}
                                            message={contact.message ?? ""}
                                        />
                                        <Button variant={"outline"}
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => deleteMutation.mutateAsync(contact.id)}
                                        >
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}

export default ContactTable



function ViewDialog({ name, email, subject, message }: { name: string, email: string, subject: string, message: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Eye className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>
                        {name}
                    </DialogTitle>
                    <DialogDescription>
                        {email}
                    </DialogDescription>
                    <Card className="space-y-4">
                        <CardContent>
                            <CardTitle className="text-center text-foreground pb-3" >
                                {subject}
                            </CardTitle>
                            <div className="text-sm text-foreground">
                                {message}
                            </div>
                        </CardContent>
                    </Card>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}