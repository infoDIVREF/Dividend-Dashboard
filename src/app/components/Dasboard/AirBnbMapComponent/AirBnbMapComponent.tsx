import { useState } from "react";
import { scaleQuantize } from "@visx/scale";
import { Mercator } from "@visx/geo";
import * as topojson from "topojson-client";
import topology from "./europe-topo.json";
import { useGetMapData } from "@/hooks/useGetMapData";
import { useScreenSize } from "@visx/responsive";

const background = "white";

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

export default function GeoMercatorMap({ events = false }: { events?: boolean }) {
  const { width, height } = useScreenSize({ debounceTime: 150 });
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const { mapData } = useGetMapData();

  if (width < 10 || height < 10) return null;

  const centerX = width / 2;
  const centerY = height / 1.5;
  const scale = (width / 630) * 250;

  const recoveredValues = mapData.map((d) => d.totalRecovered);
  const minRecovered = Math.min(...recoveredValues);
  const maxRecovered = Math.max(...recoveredValues);

  const color = scaleQuantize({
    domain: [minRecovered, maxRecovered],
    range: [
      "#eff6ff",
      "#dbeafe",
      "#bfdbfe",
      "#93c5fd",
      "#60a5fa",
      "#3b82f6",
      "#2563eb",
      "#1d4ed8",
    ],
  });

  return (
      <svg className="w-full h-full border-2 border-[#e1e4eb] rounded-md">
        <rect x={0} y={0} fill={background} rx={14} />
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
                    stroke={isInData ? "#4b5563" : "#e5e7eb"}
                    strokeWidth={isHovered ? 2 : isInData ? 1.5 : 0.3}
                    onMouseEnter={() => setHoveredFeature(feature.id)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    onClick={() => {
                      console.log("clicked", feature.properties.name);
                      if (events) {
                        alert(
                          `Clicked: ${feature.properties.name} (${feature.id})`
                        );
                      }
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
