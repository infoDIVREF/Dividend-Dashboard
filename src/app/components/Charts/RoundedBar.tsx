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

export const RoundedBar = ({
  x,
  y,
  width,
  height,
  fill,
  payload,
  dataKey,
  horizontal = false, // ← default: vertical
}: RoundedBarProps) => {
  const keys = ["enTramite", "enviado", "recuperado"];
  const index = keys.indexOf(dataKey);

  const isTopBar = keys.slice(index + 1).every((key) => !payload[key]);
  const radius = 5;

  if (!isTopBar) {
    return <rect x={x} y={y} width={width} height={height} fill={fill} />;
  }

  const r = Math.min(radius, width / 2, height / 2);

  const path = horizontal
    ? // Gráfico horizontal: redondear top-right y bottom-right
      `
        M${x},${y}
        H${x + width - r}
        Q${x + width},${y} ${x + width},${y + r}
        V${y + height - r}
        Q${x + width},${y + height} ${x + width - r},${y + height}
        H${x}
        Z
      `
    : // Gráfico vertical: redondear top-left y top-right
      `
        M${x},${y + height}
        V${y + r}
        Q${x},${y} ${x + r},${y}
        H${x + width - r}
        Q${x + width},${y} ${x + width},${y + r}
        V${y + height}
        Z
      `;

  return <path d={path} fill={fill} />;
};
