import React, { useState } from "react";
import { scaleQuantize } from "@visx/scale";
import { Mercator /* Graticule */ } from "@visx/geo";
import * as topojson from "topojson-client";
import topology from "./europe-topo.json";
import { useGetMapData } from "@/hooks/useGetMapData";

/* import topology from "./europe-topo.json";
 */ import { useScreenSize } from "@visx/responsive";

export const background = "white";

export type GeoMercatorProps = {
  width: number;
  height: number;
  events?: boolean;
};

interface FeatureShape {
  type: "Feature";
  id: string;
  geometry: { coordinates: [number, number][][]; type: "Polygon" };
  properties: { name: string };
}

// @ts-expect-error: TS no puede inferir correctamente el tipo de 'topology.objects.units'
const europe = topojson.feature(topology, topology.objects.units) as {
  type: "FeatureCollection";
  features: FeatureShape[];
};

export default function GeoMercatorMap({ events = false }: GeoMercatorProps) {
  const { width, height } = useScreenSize({ debounceTime: 150 });
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const centerX = width / 2;
  const centerY = height / 1.5;
  const scale = (width / 630) * 250;

  const { mapData, isLoading, error } = useGetMapData();
  console.log("MAP DATA", mapData);
  console.log("IS LOADING", isLoading);
  console.log("ERROR", error);

  const recoveredValues = mapData.map((d) => d.totalRecovered);
  const minRecovered = Math.min(...recoveredValues);
  const maxRecovered = Math.max(...recoveredValues);

  const color = scaleQuantize({
    domain: [minRecovered, maxRecovered],
    range: [
      "#eff6ff", // Azul muy claro, casi blanco
      "#dbeafe",
      "#bfdbfe",
      "#93c5fd",
      "#60a5fa",
      "#3b82f6",
      "#2563eb",
      "#1d4ed8", // Azul oscuro intenso
    ],
  });

  return width < 10 ? null : (
    <svg
      className="absolute top-[93px] left-0 z-10"
      width={width}
      height={height}
    >
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={background}
        rx={14}
      />
      <Mercator<FeatureShape>
        data={europe.features}
        scale={scale}
        translate={[centerX - 70, centerY + 460]}
      >
        {(mercator) => (
          <g>
            {mercator.features.map(({ feature, path }, i) => {
              const isHovered = hoveredFeature === feature.id;
              const matchedData = mapData.find(
                (c) => c.isoCode3 === feature.id
              );
              const recovered = matchedData?.totalRecovered ?? 0;
              const isInData = !!matchedData;
              return (
                <path
                  key={`map-feature-${i}`}
                  d={path || ""}
                  fill={color(recovered)}
                  className={`${isHovered ? "bg-red" : ""}`}
                  stroke={isInData ? "#4b5563" : "#e5e7eb"} // gris oscuro si tiene datos, gris claro si no
                  strokeWidth={isHovered ? 2 : isInData ? 1.5 : 0.3}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  onClick={() => {
                    console.log("clicked", feature.properties.name);
                    if (events)
                      alert(
                        `Clicked: ${feature.properties.name} (${feature.id})`
                      );
                  }}
                />
              );
            })}
          </g>
        )}
      </Mercator>
    </svg>
  );
}
