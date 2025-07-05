import { Button } from "@/components/ui/button"
import Link from "next/link"

const Hero = () => {
    return (
        <section
            id="home"
            className="hero-section min-h-screen flex items-center justify-center text-center relative overflow-hidden"
        >
            <div className="absolute inset-0 z-0">
                <div className="animate-blob absolute top-20 left-10 h-72 w-72 rounded-full bg-[#3b82f6] opacity-20 mix-blend-multiply blur-3xl filter"></div>
                <div className="animate-blob animation-delay-2000 absolute top-40 right-10 h-72 w-72 rounded-full bg-[#3b82f6] opacity-20 mix-blend-multiply blur-3xl filter"></div>
                <div className="animate-blob animation-delay-4000 absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-[#3b82f6] opacity-20 mix-blend-multiply blur-3xl filter"></div>
            </div>


            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-[linear-gradient(90deg,transparent,#3b82f6,transparent)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[linear-gradient(90deg,transparent,#3b82f6,transparent)] p-10 md:p-12 backdrop-blur-sm">
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

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center items-start p-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Hero
