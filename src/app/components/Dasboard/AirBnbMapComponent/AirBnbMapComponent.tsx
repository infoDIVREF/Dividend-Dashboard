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

export default function GeoMercatorMap({
  events = false,
}: {
  events?: boolean;
}) {
  const { width, height } = useScreenSize({ debounceTime: 150 });
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [hoverData, setHoverData] = useState<{
    x: number;
    y: number;
    data: {
      country: string;
      totalPending: number;
      totalRecovered: number;
      totalSent: number;
    };
  } | null>(null);
  const { mapData } = useGetMapData();
  console.log("MAP DATA", mapData);

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
    <>
      <svg className="w-full h-full  rounded-md">
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
                    onMouseEnter={(event) => {
                      setHoveredFeature(feature.id);
                      if (matchedData) {
                        const { clientX, clientY } = event;
                        setHoverData({
                          x: clientX,
                          y: clientY,
                          data: {
                            country: matchedData.country,
                            totalPending: matchedData.totalPending,
                            totalRecovered: matchedData.totalRecovered,
                            totalSent: matchedData.totalSent,
                          },
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredFeature(null);
                      setHoverData(null);
                    }}
                    onClick={() => {
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
      {hoverData && (
        <div
          className="fixed z-50 bg-white shadow-lg border p-4 text-sm"
          style={{
            top: hoverData.y + 10,
            left: hoverData.x + 10,
            pointerEvents: "none",
            minWidth: 220,
          }}
        >
          <div className="font-semibold text-md mb-1">
            {hoverData.data.country}
          </div>
          <div className="text-gris mb-1">
            En trámite:{" "}
            {hoverData.data.totalPending.toLocaleString("es-ES", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="text-azul font-medium mb-1">
            Enviado:{" "}
            {hoverData.data.totalSent.toLocaleString("es-ES", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="text-azul-oscuro font-semibold">
            Recuperado:{" "}
            {hoverData.data.totalRecovered.toLocaleString("es-ES", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      )}
    </>
  );
}
