import { motion } from "framer-motion";

type PortraitAssemblyProps = {
  src: string;
  finished?: boolean;
};

const WIDTH = 200;
const HEIGHT = 250;
const ROWS = 6;
const COLS = 6;

const TILE_W = WIDTH / COLS;
const TILE_H = HEIGHT / ROWS;

export default function PortraitAssembly({
  src,
  finished = false,
}: PortraitAssemblyProps) {
  const tiles = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      tiles.push({
  id: `${r}-${c}`,
  row: r,
  col: c,

  startX:
    Math.random() > 0.5
      ? -window.innerWidth
      : window.innerWidth,

  startY:
    Math.random() > 0.5
      ? -window.innerHeight
      : window.innerHeight,

  rotate:
    Math.random() * 720 - 360,

  delay:
    Math.random() * 0.7,
});
    }
  }

  return (
    <motion.div
      className="relative"
      style={{
        width: WIDTH,
        height: HEIGHT,
        perspective: 1200,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: finished ? 0 : 1,
      }}
      transition={{
        duration: 0.8,
      }}
    >
            {tiles.map((tile) => (
        <motion.div
  key={tile.id}

  initial={{
    x: tile.startX,
    y: tile.startY,
    rotate: tile.rotate,
rotateX: Math.random() * 180 - 90,
rotateY: Math.random() * 180 - 90,
    opacity: 0,
    scale: 0.2,
  }}

  animate={{
  x: 0,
  y: 0,
  rotate: 0,
  rotateX: 0,
rotateY: 0,
  opacity: 1,
  scale: [0.2, 1.08, 1],
}}

 transition={{
  delay: 2.8 + tile.delay,
  type: "spring",
  stiffness: 240,
  damping: 16,
  mass: 0.55,
}}
          className="absolute overflow-hidden"
          style={{
            width: TILE_W,
            height: TILE_H,
            left: tile.col * TILE_W,
            top: tile.row * TILE_H,
          }}
        >
          <div
            style={{
              width: WIDTH,
              height: HEIGHT,
              backgroundImage: `url(${src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${WIDTH}px ${HEIGHT}px`,
              backgroundPosition: `-${tile.col * TILE_W}px -${tile.row * TILE_H}px`,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}