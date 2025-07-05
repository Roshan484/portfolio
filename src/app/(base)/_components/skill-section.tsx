import type React from "react"
import { Code, Palette, Globe, Database, Server, Cpu } from "lucide-react"

const SkillCategory = ({
    title,
    skills,
    icon: Icon,
}: {
    title: string
    skills: { name: string; level: number }[]
    icon: React.ElementType
}) => {
    return (
        <div className="bg-black p-6 border border-primary/20 brush-stroke">
            <div className="flex items-center mb-6">
                <Icon className="text-primary mr-3" size={24} />
                <h3 className="text-xl font-bold ">{title}</h3>
            </div>
            <div className="space-y-4">
                {skills.map((skill) => (
                    <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-300">{skill.name}</span>
                            <span className="text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                            <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const Skills = () => {
    const skillCategories = [
        {
            title: "Frontend Development",
            icon: Code,
            skills: [
                { name: "HTML/CSS", level: 95 },
                { name: "JavaScript", level: 90 },
                { name: "React", level: 85 },
                { name: "Bootstrap", level: 90 },
            ],
        },
        {
            title: "Design",
            icon: Palette,
            skills: [
                { name: "UI/UX Design", level: 80 },
                { name: "Figma", level: 85 },
                { name: "Adobe Photoshop", level: 75 },
                { name: "Responsive Design", level: 90 },
            ],
        },
        {
            title: "Web Technologies",
            icon: Globe,
            skills: [
                { name: "RESTful APIs", level: 85 },
                { name: "GraphQL", level: 70 },
                { name: "Progressive Web Apps", level: 75 },
                { name: "Web Performance", level: 80 },
            ],
        },
        {
            title: "Backend Development",
            icon: Server,
            skills: [
                { name: "Node.js", level: 80 },
                { name: "Express", level: 75 },
                { name: "Python", level: 70 },
                { name: "PHP", level: 65 },
            ],
        },
        {
            title: "Database",
            icon: Database,
            skills: [
                { name: "MongoDB", level: 75 },
                { name: "MySQL", level: 80 },
                { name: "Firebase", level: 85 },
                { name: "PostgreSQL", level: 90 },
            ],
        },
        {
            title: "Other Skills",
            icon: Cpu,
            skills: [
                { name: "Git/GitHub", level: 90 },
                { name: "Docker", level: 65 },
                { name: "CI/CD", level: 70 },
                { name: "Testing", level: 75 },
            ],
        },
    ]

    return (
        <section id="skills" className=" ink-splash">
            <div className="max-w-7xl mx-auto px-4 ">
                <h2 className="section-heading text-3xl md:text-4xl font-bold mb-16  text-center">My Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category) => (
                        <SkillCategory key={category.title} title={category.title} skills={category.skills} icon={category.icon} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Skills
