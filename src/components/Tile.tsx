import { motion } from "framer-motion";
import { BOARD_SIZE } from "../utils/create-board";

interface TileProps {
  color: string | null;
  onClick: () => void;
  isActive: boolean;
  initialX: number;
  x: number;
  initialY: number;
  y: number;
  col: number;
  row: number;
  isFirstRender: boolean;
}

const Tile: React.FC<TileProps> = ({
  color,
  onClick,
  isActive,
  x,
  y,
  initialY,
  initialX,
  col,
  row,
  isFirstRender,
}) => {
  console.log(x, y, initialY, initialX);
  if (!color) return <div className="tile empty" />;

  return (
    <motion.div
      className={`tile ${color} ${isActive ? "active" : ""}`}
      onClick={onClick}
      initial={
        isFirstRender
          ? { y: initialY + row * -30, x: initialX, opacity: 0 }
          : { y: initialY, x: initialX }
      }
      animate={{ y: y, x: x, opacity: 1 }}
      transition={{
        duration: 0.3,
        delay: isFirstRender ? (BOARD_SIZE - row + col) * 0.05 : 0,
        ease: "easeOut",
      }}
    />
  );
};

export default Tile;
