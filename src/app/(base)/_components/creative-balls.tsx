"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function CreativeHero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let devicePixelRatio: number;

        // Set canvas dimensions
        const setCanvasDimensions = () => {
            if (!canvas || !ctx) return;

            devicePixelRatio = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width * devicePixelRatio;
            canvas.height = rect.height * devicePixelRatio;

            ctx.scale(devicePixelRatio, devicePixelRatio);
        };

        setCanvasDimensions();

        // Mouse position
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            targetX = e.clientX - rect.left;
            targetY = e.clientY - rect.top;
        };

        const handleResize = () => {
            setCanvasDimensions();
            init();
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        // Particle class
        class Particle {
            x: number;
            y: number;
            size: number;
            baseX: number;
            baseY: number;
            density: number;
            color: string;
            distance: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.size = Math.random() * 5 + 2;
                this.density = Math.random() * 30 + 1;
                this.distance = 0;

                // Blend between primary (#3b82f6) and secondary (#6b7280)
                const t = Math.random();
                const r = Math.round(0x3b * (1 - t) + 0x6b * t);
                const g = Math.round(0x82 * (1 - t) + 0x72 * t);
                const b = Math.round(0xf6 * (1 - t) + 0x80 * t);
                this.color = `rgb(${r},${g},${b})`;
            }

            update() {
                // Calculate distance between mouse and particle
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                this.distance = Math.sqrt(dx * dx + dy * dy);

                const forceDirectionX = dx / this.distance;
                const forceDirectionY = dy / this.distance;

                const maxDistance = 100;
                const force = (maxDistance - this.distance) / maxDistance;

                if (this.distance < maxDistance) {
                    const directionX = forceDirectionX * force * this.density;
                    const directionY = forceDirectionY * force * this.density;

                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        const dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        const dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }

            draw() {
                if (!ctx) return;

                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        // Create particle grid
        const particlesArray: Particle[] = [];
        const gridSize = 30;

        function init() {
            if (!canvas) return;

            particlesArray.length = 0;

            const canvasWidth = canvas.width / devicePixelRatio;
            const canvasHeight = canvas.height / devicePixelRatio;

            const numX = Math.floor(canvasWidth / gridSize);
            const numY = Math.floor(canvasHeight / gridSize);

            for (let y = 0; y < numY; y++) {
                for (let x = 0; x < numX; x++) {
                    const posX = x * gridSize + gridSize / 2;
                    const posY = y * gridSize + gridSize / 2;
                    particlesArray.push(new Particle(posX, posY));
                }
            }
        }

        init();

        const animate = () => {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            mouseX += (targetX - mouseX) * 0.1;
            mouseY += (targetY - mouseY) * 0.1;

            for (let i = 0; i < particlesArray.length; i++) {
                const particleI = particlesArray[i];
                if (!particleI) continue;

                particleI.update();
                particleI.draw();

                for (let j = i + 1; j < particlesArray.length; j++) {
                    const particleJ = particlesArray[j];
                    if (!particleJ) continue;

                    const dx = particleI.x - particleJ.x;
                    const dy = particleI.y - particleJ.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 30) {
                        ctx.beginPath();
                        // Blend line color between primary and secondary as well
                        const t = 0.5;
                        const r = Math.round(0x3b * (1 - t) + 0x6b * t);
                        const g = Math.round(0x82 * (1 - t) + 0x72 * t);
                        const b = Math.round(0xf6 * (1 - t) + 0x80 * t);
                        ctx.strokeStyle = `rgba(${r},${g},${b},${0.2 - distance / 150})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particleI.x, particleI.y);
                        ctx.lineTo(particleJ.x, particleJ.y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        animate();

        // Cleanup function
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <motion.div
            className="relative h-[400px] w-full md:h-[500px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <canvas
                ref={canvasRef}
                className="h-full w-full"
                style={{ display: "block" }}
            />
        </motion.div>
    );
}