import { BarProps } from "recharts";
import { useFilters } from "@/contexts/FiltersContext";

type RoundedBarProps = BarProps & {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  dataKey: string;
  payload: Record<string, number>;
  horizontal?: boolean;
};

const THRESHOLD = 0.005;
const MIN_PIXEL_WIDTH = 2;

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
  const { claimStatus } = useFilters();

  // ✨ CAMBIO 1: Crear una lista dinámica de las barras que están visibles
  const allKeys = ["enTramite", "enviado", "recuperado"] as const;
  const statusMap = {
    enTramite: "EN TRÁMITE",
    enviado: "ENVIADO",
    recuperado: "RECUPERADO",
  };

  const visibleKeys = allKeys.filter((key) =>
    claimStatus.includes(statusMap[key])
  );

  // ✨ CAMBIO 2: Usar la lista de claves visibles para toda la lógica
  const index = visibleKeys.indexOf(dataKey as (typeof allKeys)[number]);

  const total = allKeys.reduce((sum, key) => sum + (payload[key] || 0), 0);

  const hasBarOnTop = visibleKeys
    .slice(index + 1)
    .some((key) => (payload[key] || 0) / total > THRESHOLD);

  const isTopBar = !hasBarOnTop;

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
    <path className="z-20" d={path} fill={fill} />
  ) : (
    <rect x={x} y={y} width={width} height={height} fill={fill} />
  );
};
