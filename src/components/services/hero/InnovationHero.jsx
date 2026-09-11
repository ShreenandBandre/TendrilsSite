"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Sparkles,
  BrainCircuit,
  Database,
  Bot,
} from "lucide-react";
import { useEffect, useRef } from "react";

import HeroBackground from "./heroBackground";
import HeroButtons from "./HeroButtons";
import { urlFor } from "@/lib/sanity/image";

/**
 * Universal Image Resolver:
 * Sanity ke kisi bhi pattern (_ref, assetUrl, asset.url, heroImage, etc.) se URL extract karta hai
 */
function getHeroImageUrl(source) {
  if (!source) return null;
  if (typeof source === "string" && source.startsWith("http")) return source;

  if (source.assetUrl) return source.assetUrl;
  if (source.imageUrl) return source.imageUrl;
  if (source.url) return source.url;
  if (source.asset?.url) return source.asset.url;

  if (source.asset?._ref || source._ref) {
    try {
      return urlFor(source)
        .width(1400)
        .height(1400)
        .fit("crop")
        .auto("format")
        .url();
    } catch (e) {
      console.warn("Innovation hero image error:", e);
    }
  }

  if (source.image) return getHeroImageUrl(source.image);
  if (source.heroImage) return getHeroImageUrl(source.heroImage);

  return null;
}

/* =========================================================
   HIGH-PERFORMANCE ULTRA-SMOOTH GOLDEN VAPOR (60 FPS)
   - Heavy blur filter removed to eliminate CPU lag
   - Pre-rendered hardware-accelerated radial glows
   ========================================================= */

function GoldenSmoke({ containerRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let particles = [];
    let animationFrame;

    let lastX = null;
    let lastY = null;
    let lastTime = performance.now();

    let velocityX = 0;
    let velocityY = 0;

    const CONFIG = {
      maxParticles: 180, // Optimized limit for smooth 60fps
      minLife: 600,
      maxLife: 1200,
      movementThreshold: 1.2,
      maxEmission: 4,
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const createParticle = (x, y, vx, vy, isCore = false) => {
      const speed = Math.hypot(vx, vy);
      let dirX = 0;
      let dirY = -1;

      if (speed > 0.01) {
        dirX = vx / speed;
        dirY = vy / speed;
      }

      const perpX = -dirY;
      const perpY = dirX;
      const spread = (Math.random() - 0.5) * (isCore ? 12 : 22);

      particles.push({
        x: x + perpX * spread,
        y: y + perpY * spread,
        vx: dirX * (0.4 + Math.random() * 0.4) + perpX * (Math.random() - 0.5) * 0.1,
        vy: dirY * (0.4 + Math.random() * 0.4) + perpY * (Math.random() - 0.5) * 0.1,
        radius: isCore ? Math.random() * 12 + 8 : Math.random() * 24 + 14,
        life: 0,
        maxLife: CONFIG.minLife + Math.random() * (CONFIG.maxLife - CONFIG.minLife),
        opacity: isCore ? 0.35 : 0.2,
        isCore,
      });
    };

    const emitSmoke = (x, y) => {
      if (lastX === null || lastY === null) {
        lastX = x;
        lastY = y;
        return;
      }

      const dx = x - lastX;
      const dy = y - lastY;
      const distance = Math.hypot(dx, dy);

      if (distance < CONFIG.movementThreshold) return;

      velocityX = velocityX * 0.7 + dx * 0.3;
      velocityY = velocityY * 0.7 + dy * 0.3;

      const count = Math.min(
        CONFIG.maxEmission,
        Math.max(1, Math.ceil(distance * 0.4))
      );

      for (let i = 0; i < count; i++) {
        const progress = i / Math.max(count - 1, 1);
        const px = lastX + dx * progress;
        const py = lastY + dy * progress;

        createParticle(px, py, velocityX, velocityY, false);
        if (Math.random() < 0.4) {
          createParticle(px, py, velocityX, velocityY, true);
        }
      }

      lastX = x;
      lastY = y;

      if (particles.length > CONFIG.maxParticles) {
        particles.splice(0, particles.length - CONFIG.maxParticles);
      }
    };

    const handlePointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      emitSmoke(event.clientX - rect.left, event.clientY - rect.top);
    };

    const handlePointerLeave = () => {
      lastX = null;
      lastY = null;
      velocityX = 0;
      velocityY = 0;
    };

    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave);

    const animate = (currentTime) => {
      const delta = Math.min(currentTime - lastTime, 32);
      lastTime = currentTime;

      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.globalCompositeOperation = "screen";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life += delta;

        const progress = p.life / p.maxLife;
        if (progress >= 1) continue;

        p.x += p.vx * (delta / 16);
        p.y += p.vy * (delta / 16);
        p.radius += 0.25;

        const alpha = Math.sin(progress * Math.PI) * p.opacity;
        if (alpha <= 0.005) continue;

        const radGrad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius
        );

        if (p.isCore) {
          radGrad.addColorStop(0, `rgba(255, 235, 150, ${alpha * 0.9})`);
          radGrad.addColorStop(0.4, `rgba(255, 210, 65, ${alpha * 0.5})`);
          radGrad.addColorStop(1, "rgba(201, 162, 39, 0)");
        } else {
          radGrad.addColorStop(0, `rgba(220, 175, 45, ${alpha * 0.7})`);
          radGrad.addColorStop(0.5, `rgba(201, 162, 39, ${alpha * 0.3})`);
          radGrad.addColorStop(1, "rgba(201, 162, 39, 0)");
        }

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      particles = particles.filter((p) => p.life < p.maxLife);
      ctx.globalCompositeOperation = "source-over";
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

/* =========================================================
   MAIN INNOVATION HERO COMPONENT
   ========================================================= */

export default function InnovationHero({ service = {} }) {
  const hero = service?.hero || {};
  const sectionRef = useRef(null);

  // Safe Image Lookup from Sanity
  const imgSrc =
    getHeroImageUrl(hero.image) ||
    getHeroImageUrl(hero.imageUrl) ||
    getHeroImageUrl(service?.image) ||
    getHeroImageUrl(service?.heroImage) ||
    getHeroImageUrl(service?.imageUrl) ||
    null;

  const hasImage = Boolean(imgSrc);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[720px] overflow-hidden bg-[#111111] px-5 py-24 text-white sm:px-6 md:py-36"
    >
      {/* Dark background variant */}
      <HeroBackground variant="innovation" dark />

      {/* Optimized fast golden smoke */}
      <GoldenSmoke containerRef={sectionRef} />

      {/* Subtle ambient gold aura */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-[45%] z-[1] h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A227]/25 blur-[140px] md:h-[650px] md:w-[650px]"
      />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,transparent_20%,rgba(17,17,17,0.3)_58%,rgba(17,17,17,0.85)_100%)]" />

      {/* =====================================================
          CONTENT GRID: Left text, Right hero image
          ===================================================== */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div
          className={`grid items-center gap-12 lg:gap-16 ${
            hasImage
              ? "lg:grid-cols-[1.1fr_0.9fr]"
              : "max-w-4xl mx-auto text-center"
          }`}
        >
          {/* ================= LEFT COLUMN ================= */}
          <div
            className={`flex flex-col ${
              hasImage ? "items-start text-left" : "items-center text-center"
            }`}
          >
            {/* Eyebrow & Icon Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/[0.08] px-4 py-1.5 backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4 text-[#FFD85A]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D7AF35] sm:text-xs">
                {hero.eyebrow || service.category || "Commerce Intelligence"}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.15,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 font-display text-4xl leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]"
            >
              {hero.headline || service.name}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg"
            >
              {hero.description ||
                service.description ||
                service.shortDescription}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className={`mt-8 flex w-full ${
                hasImage ? "justify-start" : "justify-center"
              }`}
            >
              <HeroButtons hero={hero} dark />
            </motion.div>

            {/* AI Ecosystem Nodes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="mt-12 grid w-full max-w-xl grid-cols-3 gap-3 sm:gap-4"
            >
              <InnovationNode icon={Database} label="Data" />
              <InnovationNode
                icon={BrainCircuit}
                label="Intelligence"
                featured
              />
              <InnovationNode icon={Bot} label="Agents" />
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: HERO IMAGE ================= */}
          {hasImage && (
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full justify-center"
            >
              <div className="group relative w-full max-w-lg lg:max-w-none">
                {/* Gold Neon Ambient Aura */}
                <div className="absolute -inset-3 rounded-[3rem] bg-gradient-to-tr from-[#C9A227]/25 via-[#C9A227]/10 to-transparent blur-2xl opacity-70 transition duration-500 group-hover:opacity-100" />

                {/* Luxury Glass Frame */}
                <div className="relative overflow-hidden rounded-[2.5rem] border border-[#C9A227]/40 bg-white/[0.04] p-3.5 shadow-2xl backdrop-blur-2xl">
                  <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-[1.9rem] bg-[#161616]">
                    <Image
                      src={imgSrc}
                      alt={hero.headline || service.name || "Innovation visual"}
                      fill
                      priority
                      unoptimized={imgSrc.endsWith(".svg")}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />

                    {/* Gradient base on image */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />

                    {/* Floating Tech Chip */}
                    <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3.5 py-1 text-[10px] font-semibold tracking-wider text-[#FFD85A] uppercase backdrop-blur-md shadow-lg">
                      <Sparkles className="h-3 w-3 text-[#C9A227]" />
                      <span>Autonomous AI</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   INNOVATION NODE
   ========================================================= */

function InnovationNode({ icon: Icon, label, featured = false }) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className={`group relative overflow-hidden rounded-2xl border p-4 text-left backdrop-blur-xl transition-all duration-500 sm:p-5 ${
        featured
          ? "border-[#C9A227]/40 bg-[#C9A227]/[0.09] hover:border-[#C9A227]/60 hover:bg-[#C9A227]/[0.15]"
          : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18] hover:bg-white/[0.06]"
      }`}
    >
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full blur-2xl transition-opacity duration-500 ${
          featured
            ? "bg-[#C9A227]/25 opacity-100"
            : "bg-white/10 opacity-0 group-hover:opacity-100"
        }`}
      />

      <Icon
        className={`relative z-10 h-5 w-5 transition-transform duration-500 group-hover:scale-110 ${
          featured ? "text-[#C9A227]" : "text-white/40"
        }`}
      />

      <p className="relative z-10 mt-5 font-display text-sm sm:text-base text-white/90">
        {label}
      </p>
    </motion.div>
  );
}