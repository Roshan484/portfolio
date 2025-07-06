import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddProjectForm from './_components/add-project-form'
import ContactTable from './_components/contact-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import WorkExperience from './_components/work-experience'
const Roshan = () => {
    return (
        <main className="max-w-7xl mx-auto p-6 space-y-4">
            <Tabs defaultValue="add-project" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-screen-2xl">
                    <TabsTrigger value="add-project">Add Project</TabsTrigger>
                    <TabsTrigger value="work">Work Experience</TabsTrigger>
                    <TabsTrigger value="messages">Messages</TabsTrigger>

                </TabsList>

                <TabsContent value="add-project" className="mt-6">
                    <AddProjectForm />
                </TabsContent>

                <TabsContent value="work" className="mt-6">
                    <WorkExperience />
                </TabsContent>

                <TabsContent value="messages" className="mt-6">
                    <ContactTable />
                </TabsContent>
            </Tabs>
            <Button asChild className='w-full'>
                <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
            </Button>
        </main>
    )
}

export default Roshan