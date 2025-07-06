import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ContactMessage {
    id: number
    name: string
    email: string
    subject: string
    message: string
    date: string
}

const contactMessages: ContactMessage[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        subject: "Project Inquiry",
        message: "I'm interested in collaborating on a new project...",
        date: "2024-01-15",
    },
    {
        id: 2,
        name: "Sarah Smith",
        email: "sarah@example.com",
        subject: "Website Feedback",
        message: "Great work on your portfolio! I have some suggestions...",
        date: "2024-01-14",
    },
    {
        id: 3,
        name: "Mike Johnson",
        email: "mike@example.com",
        subject: "Job Opportunity",
        message: "We have an exciting opportunity that might interest you...",
        date: "2024-01-13",
    },
]

function ContactTable() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>View and manage contact form submissions.</CardDescription>
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
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contactMessages.map((contact) => (
                                <TableRow key={contact.id}>
                                    <TableCell className="font-medium">{contact.name}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.subject}</TableCell>
                                    <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                                    <TableCell>{contact.date}</TableCell>
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