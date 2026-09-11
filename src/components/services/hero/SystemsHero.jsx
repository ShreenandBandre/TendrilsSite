"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

import HeroButtons from "./HeroButtons";
import ArchitectureVisual from "./ArchitectureVisual";
import { urlFor } from "@/lib/sanity/image";

/* =========================================================
   PERFORMANCE-OPTIMIZED GOLDEN CURSOR VAPOR
   ========================================================= */

function GoldenSmoke({ containerRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });

    if (!ctx) return;

    let animationFrame = 0;
    let particles = [];
    let lastX = null;
    let lastY = null;
    let velocityX = 0;
    let velocityY = 0;
    let lastTime = performance.now();
    let width = 0;
    let height = 0;
    let isVisible = true;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const CONFIG = {
      maxParticles: isMobile ? 140 : 280,
      minLife: isMobile ? 600 : 720,
      maxLife: isMobile ? 1050 : 1250,
      intensity: isMobile ? 1.05 : 1.18,
      movementThreshold: 2.2,
      maxEmission: isMobile ? 3 : 5,
      particleSpacing: isMobile ? 18 : 12,
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();

      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", resize);
    }

    const createParticle = (x, y, vx, vy, layer = "normal") => {
      const speed = Math.hypot(vx, vy);

      let dirX = 0;
      let dirY = -1;

      if (speed > 0.01) {
        dirX = vx / speed;
        dirY = vy / speed;
      }

      const perpX = -dirY;
      const perpY = dirX;

      let spread;
      let length;
      let width;
      let opacity;

      if (layer === "fine") {
        spread = (Math.random() - 0.5) * 14;
        length = Math.random() * 30 + 22;
        width = Math.random() * 0.8 + 0.55;
        opacity = Math.random() * 0.12 + 0.11;
      } else if (layer === "core") {
        spread = (Math.random() - 0.5) * 6;
        length = Math.random() * 25 + 18;
        width = Math.random() * 1.2 + 0.9;
        opacity = Math.random() * 0.14 + 0.17;
      } else {
        spread = (Math.random() - 0.5) * 11;
        length = Math.random() * 30 + 22;
        width = Math.random() * 1.2 + 0.7;
        opacity = Math.random() * 0.13 + 0.13;
      }

      particles.push({
        x: x + perpX * spread,
        y: y + perpY * spread,
        vx:
          dirX * (0.24 + Math.random() * 0.42) +
          perpX * (Math.random() - 0.5) * 0.07,
        vy:
          dirY * (0.24 + Math.random() * 0.42) +
          perpY * (Math.random() - 0.5) * 0.07,
        width,
        length,
        life: 0,
        maxLife:
          CONFIG.minLife +
          Math.random() * (CONFIG.maxLife - CONFIG.minLife),
        opacity,
        turbulence: Math.random() * Math.PI * 2,
        turbulenceSpeed: 0.0009 + Math.random() * 0.0018,
        turbulenceAmount: 0.003 + Math.random() * 0.006,
        layer,
        growth: Math.random() * 0.06 + 0.025,
        renderOpacity: 0,
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

      velocityX = velocityX * 0.78 + dx * 0.22;
      velocityY = velocityY * 0.78 + dy * 0.22;

      const speed = Math.hypot(velocityX, velocityY);
      const speedFactor = Math.min(speed / 14, 1.7);

      const count = Math.min(
        CONFIG.maxEmission,
        Math.max(1, Math.ceil(distance / CONFIG.particleSpacing))
      );

      for (let i = 0; i < count; i++) {
        const progress = i / Math.max(count - 1, 1);
        const px = lastX + dx * progress;
        const py = lastY + dy * progress;

        createParticle(
          px,
          py,
          velocityX * (0.85 + speedFactor * 0.15),
          velocityY * (0.85 + speedFactor * 0.15),
          "normal"
        );

        if (Math.random() < 0.45) {
          createParticle(px, py, velocityX, velocityY, "fine");
        }

        if (Math.random() < 0.1 + speedFactor * 0.08) {
          createParticle(px, py, velocityX, velocityY, "core");
        }
      }

      lastX = x;
      lastY = y;

      if (particles.length > CONFIG.maxParticles) {
        particles.splice(0, particles.length - CONFIG.maxParticles);
      }
    };

    let pendingPointer = null;

    const handlePointerMove = (event) => {
      pendingPointer = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handlePointerEnter = () => {
      lastX = null;
      lastY = null;
      velocityX = 0;
      velocityY = 0;
    };

    const handlePointerLeave = () => {
      lastX = null;
      lastY = null;
      velocityX = 0;
      velocityY = 0;
      pendingPointer = null;
    };

    container.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    container.addEventListener("pointerenter", handlePointerEnter);
    container.addEventListener("pointerleave", handlePointerLeave);

    let observer;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0.01 }
      );
      observer.observe(container);
    }

    const drawParticle = (particle) => {
      const {
        x,
        y,
        vx,
        vy,
        width: particleWidth,
        length,
        renderOpacity,
        layer,
      } = particle;

      if (renderOpacity <= 0.001) return;

      const speed = Math.hypot(vx, vy);
      const stretch = Math.min(speed * 22, 55);
      const dynamicLength = length + stretch;
      const angle = Math.atan2(vy, vx);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      const glow = ctx.createLinearGradient(
        -dynamicLength,
        0,
        dynamicLength,
        0
      );

      glow.addColorStop(0, "rgba(201,162,39,0)");
      glow.addColorStop(
        0.22,
        `rgba(201,162,39,${renderOpacity * 0.2})`
      );
      glow.addColorStop(
        0.48,
        `rgba(255,211,72,${renderOpacity * 0.28})`
      );
      glow.addColorStop(
        0.7,
        `rgba(201,162,39,${renderOpacity * 0.14})`
      );
      glow.addColorStop(1, "rgba(201,162,39,0)");

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.ellipse(
        0,
        0,
        dynamicLength,
        particleWidth * (layer === "core" ? 2.4 : 3.2),
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      const stream = ctx.createLinearGradient(
        -dynamicLength,
        0,
        dynamicLength,
        0
      );

      stream.addColorStop(0, "rgba(201,162,39,0)");
      stream.addColorStop(
        0.28,
        `rgba(214,172,42,${renderOpacity * 0.28})`
      );
      stream.addColorStop(
        0.5,
        `rgba(255,215,79,${
          renderOpacity * (layer === "core" ? 0.72 : 0.48)
        })`
      );
      stream.addColorStop(
        0.64,
        `rgba(255,232,139,${
          renderOpacity * (layer === "core" ? 0.62 : 0.4)
        })`
      );
      stream.addColorStop(
        0.78,
        `rgba(207,165,40,${renderOpacity * 0.3})`
      );
      stream.addColorStop(1, "rgba(201,162,39,0)");

      ctx.fillStyle = stream;
      ctx.beginPath();
      ctx.ellipse(
        0,
        0,
        dynamicLength,
        particleWidth * (layer === "core" ? 0.9 : 1.2),
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.restore();
    };

    const animate = (currentTime) => {
      animationFrame = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = Math.min(currentTime - lastTime, 32);
      lastTime = currentTime;

      if (pendingPointer) {
        const rect = container.getBoundingClientRect();

        emitSmoke(
          pendingPointer.x - rect.left,
          pendingPointer.y - rect.top
        );

        pendingPointer = null;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen";

      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];

        particle.life += delta;

        const progress = particle.life / particle.maxLife;

        if (progress >= 1) {
          particles[i] = particles[particles.length - 1];
          particles.pop();
          continue;
        }

        particle.turbulence += particle.turbulenceSpeed * delta;

        particle.vx +=
          Math.sin(particle.turbulence + particle.y * 0.006) *
          particle.turbulenceAmount *
          (delta / 16);

        particle.vy +=
          Math.cos(particle.turbulence + particle.x * 0.006) *
          particle.turbulenceAmount *
          (delta / 16);

        particle.vx *= 0.9985;
        particle.vy *= 0.9985;

        particle.x += particle.vx * (delta / 16);
        particle.y += particle.vy * (delta / 16);

        particle.length += particle.growth * (delta / 16);

        let fade;

        if (progress < 0.08) {
          fade = progress / 0.08;
        } else if (progress < 0.38) {
          fade = 1;
        } else {
          const t = (progress - 0.38) / 0.62;
          fade = 1 - Math.pow(t, 1.6);
        }

        particle.renderOpacity =
          Math.max(0, fade) *
          particle.opacity *
          CONFIG.intensity;

        drawParticle(particle);
      }

      ctx.globalCompositeOperation = "source-over";
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);

      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", resize);
      }

      if (observer) {
        observer.disconnect();
      }

      container.removeEventListener(
        "pointermove",
        handlePointerMove
      );
      container.removeEventListener(
        "pointerenter",
        handlePointerEnter
      );
      container.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
      style={{
        mixBlendMode: "screen",
      }}
    />
  );
}

/* =========================================================
   SYSTEMS HERO
   ========================================================= */

export default function SystemsHero({ service = {} }) {
  const hero = service?.hero || {};
  const sectionRef = useRef(null);

  /* =======================================================
     IMAGE RESOLUTION (Nested, Ref, or Direct)
  ======================================================= */

  const src =
    hero.imageUrl ||
    hero.image?.assetUrl ||
    hero.image?.asset?.url ||
    (hero.image?.asset?._ref || hero.image?._ref
      ? urlFor(hero.image)
          .width(1400)
          .height(1400)
          .fit("crop")
          .auto("format")
          .url()
      : null) ||
    service?.heroImageUrl ||
    service?.imageUrl ||
    (service?.image
      ? urlFor(service.image)
          .width(1400)
          .height(1400)
          .fit("crop")
          .auto("format")
          .url()
      : null) ||
    null;

  const hasImage = Boolean(src);

  const enrichedService = {
    ...service,
    resolvedHeroImage: src,
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#050507] px-5 pt-28 pb-24 text-[#F7F2E8] sm:px-6 sm:pt-36 sm:pb-28 md:pt-44 md:pb-36"
    >
      {/* ====================================================
          CURSOR-GENERATED GOLDEN VAPOR
      ==================================================== */}
      <GoldenSmoke containerRef={sectionRef} />

      {/* ====================================================
          TOP-RIGHT FAINT GOLDEN HONEYCOMB
      ==================================================== */}
      <div className="pointer-events-none absolute -right-28 top-2 z-0 select-none opacity-20 sm:-right-16 sm:top-6 md:right-8 md:top-14 md:opacity-25">
        <svg
          width="480"
          height="480"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[330px] w-[330px] text-[#C9A227] sm:h-[400px] sm:w-[400px] md:h-[480px] md:w-[480px]"
        >
          <path
            d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
            stroke="currentColor"
            strokeWidth="0.75"
            fill="rgba(201, 162, 39, 0.02)"
          />
          <path
            d="M90 30 L130 10 L170 30 L170 70 L130 90 L90 70 Z"
            stroke="currentColor"
            strokeWidth="0.75"
            fill="rgba(201, 162, 39, 0.04)"
          />
          <path
            d="M130 90 L170 70 L210 90 L210 130 L170 150 L130 130 Z"
            stroke="currentColor"
            strokeWidth="0.75"
            fill="rgba(201, 162, 39, 0.015)"
          />
          <path
            d="M50 90 L90 70 L130 90 L130 130 L90 150 L50 130 Z"
            stroke="currentColor"
            strokeWidth="0.75"
            fill="rgba(201, 162, 39, 0.05)"
          />
          <path
            d="M10 70 L50 90 L50 130 L10 150 L-30 130 L-30 90 Z"
            stroke="currentColor"
            strokeWidth="0.75"
            fill="rgba(201, 162, 39, 0.025)"
          />
          <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.4" />
          <circle cx="130" cy="50" r="3" fill="currentColor" opacity="0.4" />
          <circle cx="90" cy="110" r="3" fill="currentColor" opacity="0.4" />
          <circle cx="10" cy="110" r="2" fill="currentColor" opacity="0.3" />
          <circle cx="170" cy="110" r="2" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      {/* ====================================================
          BACKGROUND AMBIENCE
      ==================================================== */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.12, 0.18, 0.12],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-160px] top-[-30px] h-[480px] w-[480px] rounded-full blur-[150px] sm:right-[-120px] sm:h-[560px] sm:w-[560px] md:right-[-100px] md:top-[5%] md:h-[600px] md:w-[600px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,162,39,0.28) 0%, rgba(201,162,39,0.08) 42%, transparent 75%)",
          }}
        />
        <motion.div
          animate={{
            x: [0, 20, 0],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-20 -left-32 h-[380px] w-[380px] rounded-full blur-[150px] md:bottom-[10%] md:h-[500px] md:w-[500px]"
          style={{
            background:
              "radial-gradient(circle, rgba(180,140,40,0.2) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse at center,
                transparent 42%,
                rgba(5,5,7,0.32) 72%,
                rgba(5,5,7,0.88) 100%
              )
            `,
          }}
        />
      </div>

      {/* ====================================================
          MAIN CONTENT GRID: LEFT TEXT, RIGHT IMAGE
      ==================================================== */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div
          className={`grid items-center gap-12 lg:gap-16 ${
            hasImage
              ? "lg:grid-cols-[1.1fr_0.9fr]"
              : "max-w-4xl"
          }`}
        >
          {/* LEFT COLUMN: Headings, Descriptions & CTAs */}
          <div className="flex flex-col items-start text-left">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D7AF35] sm:text-xs sm:tracking-[0.32em]"
            >
              {hero.eyebrow ||
                service?.pillar ||
                "Systems & Integration"}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.08,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 font-display text-4xl leading-[1.02] tracking-tight sm:text-5xl md:mt-6 md:text-7xl lg:text-[5.5rem]"
            >
              {hero.headline || service?.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18, duration: 0.7 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:mt-8 sm:text-lg"
            >
              {hero.description ||
                service?.description ||
                service?.shortDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28, duration: 0.7 }}
              className="mt-8 sm:mt-10 flex justify-start"
            >
              <HeroButtons hero={hero} dark />
            </motion.div>
          </div>

          {/* RIGHT COLUMN: HERO IMAGE SHOWCASE */}
          {hasImage && (
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center w-full"
            >
              <div className="group relative w-full max-w-lg lg:max-w-none">
                {/* Gold Neon Ambient Aura */}
                <div className="absolute -inset-3 rounded-[3rem] bg-gradient-to-tr from-[#C9A227]/25 via-[#C9A227]/10 to-transparent blur-2xl opacity-75 transition duration-500 group-hover:opacity-100" />

                {/* Dark Luxury Glass Frame */}
                <div className="relative overflow-hidden rounded-[2.5rem] border border-[#C9A227]/40 bg-white/[0.04] p-3.5 shadow-2xl backdrop-blur-2xl">
                  <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-[1.9rem] bg-[#111113]">
                    <Image
                      src={src}
                      alt={hero.headline || service?.name || "Systems visual"}
                      fill
                      priority
                      unoptimized={src.endsWith(".svg")}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050507]/80 via-transparent to-transparent" />

                    {/* Corner Tag */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3.5 py-1 text-[10px] font-semibold tracking-wider text-[#FFD85A] uppercase backdrop-blur-md shadow-lg">
                      <Sparkles className="h-3 w-3 text-[#C9A227]" />
                      <span>Enterprise Systems</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* ==================================================
            ARCHITECTURE VISUAL (Cleanly docked below)
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.35,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 mt-14 sm:mt-18 md:mt-24"
        >
          <ArchitectureVisual service={enrichedService} />
        </motion.div>
      </div>
    </section>
  );
}