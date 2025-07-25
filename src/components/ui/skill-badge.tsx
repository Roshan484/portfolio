"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface SkillBadgeProps {
    name: string
    level: number
    src: string
}

export function SkillBadge({ name, level, src }: SkillBadgeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
        >
            <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 h-full transition-all duration-300 hover:border-primary/50">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative">
                    <div className="text-center mb-4 font-medium text-lg">

                        <div className="flex items-center justify-center gap-2">
                            <Image src={`/language/${src}`} width={20} height={20} alt="skill icon" />
                            {name}
                        </div>
                    </div>

                    <div className="relative h-2.5 w-full bg-zinc-700 rounded-full overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${level}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            viewport={{ once: true }}
                        />
                    </div>

                    <div className="mt-2 text-right text-sm text-zinc-400">{level}%</div>
                </div>
            </div>
        </motion.div>
    )
}
