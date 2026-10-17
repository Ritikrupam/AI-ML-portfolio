import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * Character-by-character heading reveal. Each glyph rises and fades in with a
 * small stagger the first time the heading scrolls into view. Reduced motion
 * gets the plain text. Whole words stay together so line-wrapping is natural.
 */
export default function SplitHeading({
  text,
  className = '',
  as: Tag = 'h2',
}: {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  const reduced = usePrefersReducedMotion();
  const words = text.split(' ');

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true" className="inline-flex flex-wrap">
        {words.map((word, wi) => (
          <span key={wi} className="mr-[0.25em] inline-flex overflow-hidden">
            {word.split('').map((char, ci) => (
              <motion.span
                key={ci}
                className="inline-block"
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: (wi * 4 + ci) * 0.018,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
}
