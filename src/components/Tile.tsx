import { motion } from "framer-motion";

interface TileProps {
  color: string | null;
  onClick: () => void;
  isActive: boolean;
  initialX: number;
  x: number;
  initialY: number;
  y: number;
}

const Tile: React.FC<TileProps> = ({
  color,
  onClick,
  isActive,
  x,
  y,
  initialY,
  initialX,
}) => {
  console.log(x, y, initialY, initialX);
  if (!color) return <div className="tile empty" />;

  return (
    <motion.div
      className={`tile ${color} ${isActive ? "active" : ""}`}
      onClick={onClick}
      initial={{ y: initialY, x: initialX }}
      animate={{ y: y, x: x }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );
};

export default Tile;
