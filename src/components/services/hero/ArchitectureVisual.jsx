"use client";

import { useEffect, useRef } from "react";
import {
  Database,
  Layers3,
  Network,
  Workflow,
  ArrowRight,
} from "lucide-react";

const nodes = [
  {
    icon: Database,
    label: "ERP",
    description: "Operations",
  },
  {
    icon: Network,
    label: "CRM",
    description: "Customers",
  },
  {
    icon: Layers3,
    label: "PIM",
    description: "Product data",
  },
  {
    icon: Workflow,
    label: "Shopify",
    description: "Commerce",
  },
];

export default function ArchitectureVisual() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Smoke particles array
    let particles = [];
    let mouse = { x: width / 2, y: height / 2, vx: 0, vy: 0, active: false };
    let lastMouse = { x: width / 2, y: height / 2 };

    class SmokeParticle {
      constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx + (Math.random() - 0.5) * 1.5;
        this.vy = vy + (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 60 + 40;
        this.maxSize = Math.random() * 120 + 80;
        this.alpha = Math.random() * 0.15 + 0.05;
        this.life = 0;
        this.maxLife = Math.random() * 80 + 60;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95; // friction
        this.vy *= 0.95;
        this.life++;
        if (this.size < this.maxSize) {
          this.size += 0.8;
        }
      }

      draw(context) {
        context.save();
        context.globalAlpha = Math.max(0, this.alpha * (1 - this.life / this.maxLife));
        const gradient = context.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        // Golden / Champagne smoke tint
        gradient.addColorStop(0, "rgba(201, 162, 39, 0.25)");
        gradient.addColorStop(0.5, "rgba(180, 130, 20, 0.08)");
        gradient.addColorStop(1, "transparent");

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouse.vx = x - lastMouse.x;
      mouse.vy = y - lastMouse.y;
      mouse.x = x;
      mouse.y = y;
      mouse.active = true;

      lastMouse.x = x;
      lastMouse.y = y;

      // Spawn smoke puffs on motion
      const speed = Math.hypot(mouse.vx, mouse.vy);
      const spawnCount = Math.min(Math.floor(speed / 2) + 1, 4);
      for (let i = 0; i < spawnCount; i++) {
        particles.push(new SmokeParticle(mouse.x, mouse.y, mouse.vx * 0.2, mouse.vy * 0.2));
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and render smoke
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].life >= particles[i].maxLife || particles[i].alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative mt-20 md:mt-24 overflow-hidden rounded-3xl p-6 md:p-8 bg-[#070708] border border-white/10">
      
      {/* =====================================================
          DYNAMIC SMOKE CANVAS BACKGROUND (TIGDUM APPLIED)
      ===================================================== */}
      <canvas
        ref={canvasRef}
        className="pointer-events-auto absolute inset-0 z-0 h-full w-full"
      />

      {/* Subtle overlay to keep content readable */}
      <div className="pointer-events-none absolute inset-0 bg-[#070708]/40 backdrop-blur-[1px] z-0" />

      {/* Connection line */}
      <div className="pointer-events-none absolute left-[12%] right-[12%] top-1/2 hidden h-px bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent md:block z-10" />

      <div className="relative z-10 grid gap-4 md:grid-cols-4">
        {nodes.map((node, index) => {
          const Icon = node.icon;

          return (
            <div
              key={node.label}
              className="group relative transition-all duration-500 hover:-translate-y-1.5"
            >
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-[#0A0907]/75 p-7 backdrop-blur-md transition-all duration-500 hover:border-[#C9A227]/40 hover:bg-white/[0.05] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                
                {/* Individual Card Corner Gold Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#C9A227]/0 blur-3xl transition-all duration-500 group-hover:bg-[#C9A227]/[0.15]" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#C9A227]/20 bg-[#C9A227]/10 text-[#C9A227] transition-all duration-300 group-hover:border-[#C9A227]/50 group-hover:bg-[#C9A227] group-hover:text-black">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/30">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="mt-8 font-display text-2xl text-[#F7F2E8]">
                    {node.label}
                  </p>

                  <p className="mt-2 text-sm text-white/40">
                    {node.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A227] transition-all duration-300 group-hover:translate-x-1">
                    Connected
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}