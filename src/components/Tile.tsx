import { motion } from "framer-motion";

interface TileProps {
  color: string | null;
  onClick: () => void;
  isActive: boolean;
}

const Tile: React.FC<TileProps> = ({ color, onClick, isActive }) => {
  if (!color) return <div className="tile empty" />;

  return (
    <motion.div
      className={`tile ${color} ${isActive ? "active" : ""}`}
      onClick={onClick}
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );
};

export default Tile;
