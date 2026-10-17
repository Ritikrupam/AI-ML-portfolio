import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import PortraitAssembly from "./PortraitAssembly";

type LampIntroProps = {
  onComplete?: () => void;
};

export default function LampIntro({
  onComplete,
}: LampIntroProps) {
  const [finished, setFinished] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setFinished(true);

    setTimeout(() => {
      onComplete?.();
    }, 2400);

  }, 9000);

  return () => clearTimeout(timer);
}, [onComplete]);
  return (
    <motion.section
  initial={{ opacity: 1 }}
  animate={{
    opacity: finished ? 0 : 1,
  }}
  transition={{
    duration: 2.4,
    ease: "easeInOut",
  }}
  className={`
    fixed inset-0 z-[999]
    flex items-start justify-center
    bg-black
    ${finished ? "pointer-events-none" : ""}
  `}
>
  {/* Background Gradient */}

<div
  className="
    absolute
    inset-0
    pointer-events-none
  "
  style={{
    background: `
      radial-gradient(circle at center,
      rgba(255,200,90,.05) 0%,
      rgba(0,0,0,.25) 35%,
      rgba(0,0,0,.85) 75%,
      #000 100%)
    `,
  }}
/>
{/* Vignette */}

<div
  className="
    absolute
    inset-0
    pointer-events-none
  "
  style={{
    boxShadow: "inset 0 0 220px rgba(0,0,0,.95)",
  }}
/>
{/* Ambient Glow */}

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 0.18 }}
  transition={{
    delay: 2,
    duration: 2,
  }}
  className="
    absolute
    left-1/2
    top-[170px]
    h-[500px]
    w-[500px]
    -translate-x-1/2
    rounded-full
    bg-yellow-300/10
    blur-[140px]
    pointer-events-none
  "
/>
      {/* Wire */}

<div
  className="
    absolute
    top-0
    h-40
    w-[2px]
    bg-gradient-to-b
    from-neutral-300
    to-neutral-700
  "
/>

{/* Ceiling Cap */}

<div
  className="
    absolute
    top-0
    h-4
    w-6
    -translate-x-1/2
    rounded-b-md
    bg-neutral-700
  "
  style={{
    left: "50%",
  }}
/>

      {/* Lamp */}
      <motion.div
        initial={{
          y: -220,
          rotate: 0,
        }}
        animate={{
          y: 140,
          rotate: [0, 10, -8, 5, -2, 0],
        }}
        transition={{
          y: {
            duration: 1.3,
            ease: [0.22, 1, 0.36, 1],
          },
          rotate: {
            delay: 1.3,
            duration: 2,
          },
        }}
        className="absolute"
      >
        {/* Lamp Head */}

<div
  className="
    relative
    h-20
    w-28
    overflow-hidden
    rounded-b-[60px]
    rounded-t-lg
    border
    border-neutral-700
    bg-gradient-to-b
    from-neutral-500
    via-neutral-700
    to-neutral-900
    shadow-[0_20px_50px_rgba(0,0,0,.75)]
  "
>
  {/* Top Highlight */}
  <div
    className="
      absolute
      left-3
      top-2
      h-[2px]
      w-20
      rounded-full
      bg-white/25
    "
  />

  {/* Inner Housing */}
  <div
    className="
      absolute
      bottom-0
      left-1/2
      h-8
      w-20
      -translate-x-1/2
      rounded-t-full
      bg-neutral-900
    "
  />
</div>

        {/* Light Cone */}

<motion.div
  initial={{
    opacity: 0,
    scaleY: 0,
  }}
  animate={{
    opacity: [
      0,
      0.35,
      0.12,
      0.45,
      0.25,
      0.4,
    ],
    scaleY: [0, 1.03, 0.98, 1],
  }}
  transition={{
    delay: 2.1,
    duration: 1.2,
    ease: "easeOut",
  }}
  className="
    absolute
    left-1/2
    top-14
    h-[650px]
    w-[480px]
    -translate-x-1/2
    origin-top
  "
  style={{
    clipPath: "polygon(49% 0%,51% 0%,92% 100%,8% 100%)",
    background:
"radial-gradient(circle at top, rgba(255,235,190,.45), rgba(255,210,120,.20), transparent 85%)",
    filter: "blur(40px)",
  }}
/>

{/* Light Layer 2 */}

<motion.div
  initial={{ opacity: 0, scaleY: 0 }}
  animate={{
    opacity: [0, 0.18, 0.12, 0.2],
    scaleY: [0, 1],
  }}
  transition={{
    delay: 2.2,
    duration: 1.3,
  }}
  className="
    absolute
    left-1/2
    top-16
    h-[620px]
    w-[380px]
    -translate-x-1/2
    origin-top
    pointer-events-none
  "
  style={{
    clipPath: "polygon(49% 0%,51% 0%,88% 100%,12% 100%)",
    background:
      "linear-gradient(to bottom, rgba(255,235,180,.22), rgba(255,210,120,.08), transparent)",
    filter: "blur(35px)",
  }}
/>
{/* Light Layer 3 */}

<motion.div
  initial={{ opacity: 0 }}
  animate={{
    opacity: [0, 0.12, 0.08, 0.14],
  }}
  transition={{
    delay: 2.4,
    duration: 1.5,
  }}
  className="
    absolute
    left-1/2
    top-20
    h-[700px]
    w-[600px]
    -translate-x-1/2
    origin-top
    pointer-events-none
  "
  style={{
    clipPath: "polygon(49% 0%,51% 0%,100% 100%,0% 100%)",
    background:
      "linear-gradient(to bottom, rgba(255,220,120,.08), transparent)",
    filter: "blur(80px)",
  }}
/>
{/* Core Beam */}

<motion.div
  initial={{ opacity: 0 }}
  animate={{
    opacity: [0, 0.25, 0.18],
  }}
  transition={{
    delay: 2.5,
    duration: 1,
  }}
  className="
    absolute
    left-1/2
    top-20
    h-[520px]
    w-[140px]
    -translate-x-1/2
    rounded-full
    pointer-events-none
  "
  style={{
    background:
      "linear-gradient(to bottom, rgba(255,255,220,.18), transparent)",
    filter: "blur(55px)",
  }}
/>

{/* Bulb */}
<motion.div
  initial={{
    scale: 0.5,
    opacity: 0,
  }}
  animate={{
  scale: [0.5, 1.2, 0.9, 1.15, 1],
  opacity: [0, 1, 0.25, 1, 0.7, 1],
}}
  transition={{
  delay: 2,
  duration: 1.2,
}}
  className="
absolute
left-1/2
top-[58px]
h-5
w-5
-translate-x-1/2
rounded-full
bg-yellow-100
shadow-[0_0_45px_rgba(255,235,180,.95)]
"
/>
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 0.22 }}
  transition={{
    delay: 2,
    duration: 1,
  }}
  className="
    absolute
    left-1/2
    top-[42px]
    h-10
    w-12
    -translate-x-1/2
    rounded-full
    bg-yellow-100/20
    blur-xl
  "
/>

{/* Lamp Glow */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{
  opacity: [
    0,
    0.5,
    0.15,
    0.6,
    0.3,
    0.55,
    0.45,
  ],
}}
  transition={{
    delay: 2,
    duration: 1.2,
  }}
  className="
    absolute
    left-1/2
    top-8
    h-32
    w-32
    -translate-x-1/2
    rounded-full
    blur-3xl
    bg-yellow-300/30
  "
/>
      </motion.div>
      {/* Floor Glow */}
      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 0.35 }}
  transition={{
    delay: 3,
    duration: 1.2,
  }}
  className="
    absolute
    bottom-0
    left-1/2
    h-24
    w-72
    -translate-x-1/2
    rounded-full
    bg-yellow-200/10
    blur-3xl
    pointer-events-none
  "
/>

<div
  className="
    absolute
    bottom-16
    left-[57%]
    translate-x-10
    pointer-events-none
  "
>
  <PortraitAssembly
    src="/profile/ritik.png"
    finished={finished}
  />
</div>
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 0.35 }}
  transition={{
    delay: 3.2,
    duration: 1.2,
  }}
  className="
    absolute
    bottom-16
    left-[55%]
    -translate-x-1/2
    h-[320px]
w-[240px]
    rounded-full
    pointer-events-none
  "
  style={{
    boxShadow: "0 0 80px rgba(255,235,180,.18)",
    filter: "blur(30px)",
  }}
/>
{/* Name */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 4.8,
    duration: 0.8,
  }}
  className="
absolute
top-24
left-8
max-w-2xl
text-left
pointer-events-none
"
>
  <h1 className="text-5xl font-bold tracking-[0.25em] text-white">
    <TypeAnimation
      sequence={[
        "RITIK RUPAM NANDA",
        1000,
      ]}
      speed={55}
      cursor={true}
      repeat={0}
    />
  </h1>

  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{
      delay: 6.4,
      duration: 1,
    }}
    className="
      mt-5
      text-lg
      tracking-[0.45em]
      uppercase
      text-neutral-300
    "
  >
    AI • ML ENGINEER
  </motion.p>
  <motion.p
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 7.2,
    duration: 1,
  }}
  className="
    mt-6
    max-w-xl
    text-base
    leading-8
    tracking-wide
    text-neutral-400
  "
>
  Building intelligent systems, crafting premium digital experiences,
  and transforming ideas into impactful AI solutions.
</motion.p>
</motion.div>
{/* Expanding Light */}

<motion.div
  initial={{
    scale: 0,
    opacity: 0,
  }}
  animate={{
  scale: finished ? 40 : 0,
  opacity: finished ? 0.9 : 0,
}}
  transition={{
    duration: 2,
    ease: "easeInOut",
  }}
  className="
    absolute
    left-1/2
    top-[156px]
    h-24
    w-24
    -translate-x-1/2
    rounded-full
    bg-yellow-100
    blur-3xl
    pointer-events-none
  "
/>
      {/* Dust Particles */}

{Array.from({ length: 35 }).map((_, i) => (
  <motion.div
    key={i}
    initial={{
      opacity: 0,
      y: -20,
      x: (Math.random() - 0.5) * 260,
    }}
    animate={{
      opacity: [0, 0.8, 0],
      y: [0, 520],
      x: [
        (Math.random() - 0.5) * 260,
        (Math.random() - 0.5) * 260,
      ],
    }}
    transition={{
      delay: 2.2 + Math.random(),
      duration: 4 + Math.random() * 4,
      repeat: Infinity,
      repeatDelay: Math.random() * 2,
      ease: "linear",
    }}
    className="
      absolute
      left-1/2
      top-[150px]
      h-[2px]
      w-[2px]
      rounded-full
      bg-yellow-100
      blur-[2px]
    "
  />
))}
    </motion.section>
  );
}