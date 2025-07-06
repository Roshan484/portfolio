import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import Image from "next/image";
import { GlassmorphicCard } from "@/components/ui/glassmorphic-card";
import { SkillBadge } from "@/components/ui/skill-badge";
import { ProjectCard } from "@/components/project-card";
import { Timeline } from "@/components/timeline";
import { Github, Linkedin, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const allProjects = await api.project.getAll()
  return (
    <HydrateClient>

      <section
        id="home"
        className="hero-section  min-h-screen flex items-center justify-center text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="animate-blob absolute top-20 left-10 h-72 w-72 rounded-full bg-[#3b82f6] opacity-20 mix-blend-multiply blur-3xl filter"></div>
          <div className="animate-blob animation-delay-2000 absolute top-40 right-10 h-72 w-72 rounded-full bg-[#3b82f6] opacity-20 mix-blend-multiply blur-3xl filter"></div>
          <div className="animate-blob animation-delay-4000 absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-[#3b82f6] opacity-20 mix-blend-multiply blur-3xl filter"></div>
        </div>


        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-[linear-gradient(90deg,transparent,#3b82f6,transparent)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[linear-gradient(90deg,transparent,#3b82f6,transparent)] p-6 backdrop-blur-sm">
            <Image
              src="/logo.png"
              alt="Roshan Aryal"
              width={150}
              height={150}
              className="mx-auto rounded-full"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-4 ">
              <span className="text-primary">Roshan Aryal</span>
            </h1>
            <h2 className="text-xl md:text-3xl mb-8 text-gray-300 font-light">Developer • Designer</h2>
            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-gray-400 ">
              &quot;In the midst of chaos, there is also opportunity.&quot;
              <br />
              Every pixel, a strike. Every line of code, a kata. Calm in craft, fierce in execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-10 justify-center">
              <Button asChild>
                <Link href="#projects" className="">
                  View Projects
                </Link>
              </Button>

            </div>
          </div>

        </div>
      </section >


      {/* About Section */}
      <section id="about" className="min-h-screen py-4 scroll-mt-16 relative max-w-7xl mx-auto px-2">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#3b82f6] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-[#3b82f6] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 px-2">
          <SectionHeading title="About Me" subtitle="My background and journey" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-8">
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-70"></div>
              <div className="relative w-full h-full rounded-xl overflow-hidden border border-zinc-800">
                <Image
                  src="/roshan.png"
                  alt="Roshan Aryal"
                  width={600}
                  height={600}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-medium">Available for work</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <GlassmorphicCard>
                <p className="text-lg text-zinc-300">
                  I&apos;m a passionate software engineer with experience building web applications and digital products. I
                  specialize in frontend development with React and Next.js, but I&apos;m also comfortable working with
                  backend technologies.
                </p>
                <p className="text-lg text-zinc-300 mt-4">
                  My journey in tech started with a strong foundation in software development. I&apos;ve worked with various
                  companies to create intuitive, performant, and accessible digital experiences.
                </p>
                <p className="text-lg text-zinc-300 mt-4">
                  When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects,
                  and staying up-to-date with the latest industry trends.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Name</div>
                    <div className="font-medium">
                      Roshan Aryal
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Email</div>
                    <Link href="mailto:roshanaryal.dev@gmail.com" target="_blank" className="font-medium underline text-primary">roshanaryal.dev@gmail.com</Link>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Location</div>
                    <div className="font-medium">Pokhara, Nepal</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Availability</div>
                    <div className="font-medium text-green-500">Open to opportunities</div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button asChild>
                    <Link href="/roshan-resume.pdf" download={true} target="_blank" className="w-full">
                      Download Resume
                    </Link>
                  </Button>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="scroll-mt-10 py-14 max-w-7xl mx-auto px-2 min-h-[600px] relative">

        <div className="absolute inset-0 z-0">
          <div className="animate-blob absolute top-20 left-10 h-72 w-72 rounded-full bg-[#3b82f6] opacity-20 mix-blend-multiply blur-3xl filter"></div>
          <div className="animate-blob animation-delay-2000 absolute top-40 right-10 h-72 w-72 rounded-full bg-[#3b82f6] opacity-20 mix-blend-multiply blur-3xl filter"></div>
          <div className="animate-blob animation-delay-4000 absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-[#3b82f6] opacity-20 mix-blend-multiply blur-3xl filter"></div>
        </div>

        <div className="max-w-7xl relative z-10">
          <SectionHeading title="My Skills" subtitle="Technologies I work with" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">
            <SkillBadge name="HTML" src="html-5.svg" level={95} />
            <SkillBadge name="CSS" src="css-3.svg" level={95} />
            <SkillBadge name="JavaScript" src="javascript-logo.svg" level={90} />
            <SkillBadge name="TypeScript" src="typescript.svg" level={85} />
            <SkillBadge name="Tailwind CSS" src="tailwind-css.svg" level={90} />
            <SkillBadge name="React" src="react.svg" level={95} />
            <SkillBadge name="React Native" src="react.svg" level={85} />
            <SkillBadge name="Next.js" src="next-js.svg" level={95} />
            <SkillBadge name="Node.js" src="node-js.svg" level={80} />
            <SkillBadge name="tRpc" src="typescript.svg" level={75} />
            <SkillBadge name="PostgreSQL" src="postgresql.svg" level={90} />
            <SkillBadge name="ExpressJS" src="express.webp" level={80} />
            <SkillBadge name="MongoDB" src="mongodb.svg" level={80} />
            <SkillBadge name="Java" src="java.svg" level={80} />
            <SkillBadge name="Docker" src="docker.svg" level={80} />
            <SkillBadge name="Git" src="git.svg" level={85} />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 px-2">
          <SectionHeading title="Featured Projects" subtitle="Some of my recent work" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {
              allProjects?.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title ?? ''}
                  description={project.description ?? ''}
                  tags={project.tags ?? []}
                  image={project.image ?? ''}
                  demoUrl={project.demoUrl ?? ''}
                  repoUrl={project.repoUrl ?? ''}
                />
              ))
            }

          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="services" className="py-20 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto relative px-2 z-10">
          <SectionHeading title="Work Experience" subtitle="My professional journey" />

          <div className="mt-16">
            <Timeline />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 scroll-smooth relative ">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#3b82f6] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-[#3b82f6] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="max-w-7xl px-2 mx-auto relative z-10">
          <SectionHeading title="Get In Touch" subtitle="Let's work together" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">Email</div>
                    <Link href={"mailto:roshanaryal.dev@gmail.com"} className="font-medium">roshanaryal.dev@gmail.com</Link>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">LinkedIn</div>
                    <Link href={"https://linkedin.com/in/rosanaryal"} target="_blank" className="font-medium">linkedin.com/in/rosanaryal</Link>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Github className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">GitHub</div>
                    <Link href={"https://github.com/Roshan484"} target="_blank" className="font-medium">github.com/Roshan484</Link>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-zinc-800">
                <h4 className="text-lg font-medium mb-4">Current Status</h4>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span>Available for freelance work and full-time opportunities</span>
                </div>
              </div>
            </GlassmorphicCard>

            <ContactForm />
          </div>
        </div>
      </section>
    </HydrateClient>
  );
}
