"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({ children, className = "", ...props }) {
const ref = useRef(null);
const [pos, setPos] = useState({ x: 0, y: 0 });

const onMouseMove = (e) => {
const rect = ref.current.getBoundingClientRect();
setPos({ x: (e.clientX - rect.left - rect.width / 2) * 0.25, y: (e.clientY - rect.top - rect.height / 2) * 0.25 });
};

return (
<motion.button
ref={ref}
onMouseMove={onMouseMove}
onMouseLeave={() => setPos({ x: 0, y: 0 })}
animate={{ x: pos.x, y: pos.y }}
transition={{ type: "spring", stiffness: 150, damping: 12 }}
className={className}
{...props}
>
{children}
</motion.button>
);
}
