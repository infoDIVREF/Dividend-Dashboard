import { BarProps } from "recharts";

type RoundedBarProps = BarProps & {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  dataKey: string;
  payload: Record<string, number>;
  horizontal?: boolean; // ← clave aquí
};
const THRESHOLD = 0.005; // 0.5% del total como mínimo para considerarse visible
const MIN_PIXEL_WIDTH = 2; // puedes ajustar a 1, 2, 3...

export const RoundedBar = ({
  x,
  y,
  width,
  height,
  fill,
  payload,
  dataKey,
  horizontal = false,
}: RoundedBarProps) => {
  const keys = ["enTramite", "enviado", "recuperado"];
  const index = keys.indexOf(dataKey);

  const total = keys.reduce((sum, key) => sum + (payload[key] || 0), 0);
  const hasRightBar = keys
    .slice(index + 1)
    .some((key) => (payload[key] || 0) / total > THRESHOLD);

  const isTopBar = !hasRightBar;

  // 🔒 Ocultar si el ancho es muy pequeño (ej. 1px)
  if (width < MIN_PIXEL_WIDTH) {
    return null;
  }

  const radius = 5;
  const r = Math.min(radius, width / 2, height / 2);

  const path = horizontal
    ? `
        M${x},${y}
        H${x + width - r}
        Q${x + width},${y} ${x + width},${y + r}
        V${y + height - r}
        Q${x + width},${y + height} ${x + width - r},${y + height}
        H${x}
        Z
      `
    : `
        M${x},${y + height}
        V${y + r}
        Q${x},${y} ${x + r},${y}
        H${x + width - r}
        Q${x + width},${y} ${x + width},${y + r}
        V${y + height}
        Z
      `;

  return isTopBar ? (
    <path d={path} fill={fill} />
  ) : (
    <rect x={x} y={y} width={width} height={height} fill={fill} />
  );
};
