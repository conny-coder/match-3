const TILE_SIZE = 55;

const getTilePosition = (pos: [number, number]) => {
  const [row, col] = pos;

  let x = col * TILE_SIZE;
  let y = row * TILE_SIZE;

  return { x, y };
};

export default getTilePosition;
