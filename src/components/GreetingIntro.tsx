
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type GreetingIntroProps = {
  onComplete: () => void;
};

const GREETINGS = [
  "Hello.",
  "നമസ്കാരം.",
  "नमस्ते.",
  "नमस्कार.",
  "hola!",
];

export default function GreetingIntro({
  onComplete,
}: GreetingIntroProps) {
  const [index, setIndex] = useState(0);
  const completeRef = useRef(onComplete);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => {
        if (current >= GREETINGS.length - 1) {
          window.clearInterval(interval);

          window.setTimeout(() => {
            completeRef.current();
          }, 450);

          return current;
        }

        return current + 1;
      });
    }, 450);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{ backgroundColor: "#E95B4D" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
      aria-label="Multilingual greeting introduction"
    >
      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          className="px-5 text-center text-white"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(3rem, 10vw, 8rem)",
            fontWeight: 400,
            letterSpacing: "-0.045em",
            lineHeight: 1.15,
          }}
          initial={{
            opacity: 0,
            filter: "blur(14px)",
            y: 8,
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
          }}
          exit={{
            opacity: 0,
            filter: "blur(12px)",
            y: -6,
          }}
          transition={{
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {GREETINGS[index]}
        </motion.h1>
      </AnimatePresence>
    </motion.section>
  );
}
