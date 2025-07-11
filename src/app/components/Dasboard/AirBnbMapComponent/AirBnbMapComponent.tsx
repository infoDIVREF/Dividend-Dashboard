"use client";

import { useState } from "react";
import { scaleQuantize } from "@visx/scale";
import { Mercator } from "@visx/geo";
import * as topojson from "topojson-client";
import topology from "./europe-topo.json";
import { useGetMapData } from "@/hooks/useGetMapData";
import { useScreenSize } from "@visx/responsive";
import { useFilters } from "@/contexts/FiltersContext";

const background = "white";

interface FeatureShape {
  type: "Feature";
  id: string; // This is the 3-letter ISO code like 'DEU'
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
  const {
    selectedFilters: { countries: selectedCountries },
  } = useFilters();

  // --- START OF THE FIX ---

  // 1. Create a Set of the selected ISO codes for efficient O(1) lookups.
  const selectedCountryCodes = new Set(
    selectedCountries.map((country) => country.isoCode)
  );

  // 2. Filter the main mapData to only include countries that are in the Set.
  const filteredMapData = mapData.filter((dataItem) =>
    selectedCountryCodes.has(dataItem.isoCode)
  );

  // --- END OF THE FIX ---

  if (width < 10 || height < 10) return null;

  const centerX = width / 2;
  const centerY = height / 1.5;
  const scale = (width / 630) * 250;

  const rangeRecovered = ["#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa"];
  const rangePending = ["#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa"];
  const rangeSent = ["#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa"];

  // 3. Use `filteredMapData` for all subsequent calculations.
  const valuesRecovered = filteredMapData
    .map((d) => d.totalRecovered)
    .filter((v) => v > 0);
  const valuesPending = filteredMapData
    .map((d) => d.totalPending)
    .filter((v) => v > 0);
  const valuesSent = filteredMapData.map((d) => d.totalSent);

  const scaleRecovered = scaleQuantize({
    domain: [Math.min(...valuesRecovered), Math.max(...valuesRecovered)],
    range: rangeRecovered,
  });

  const scalePending = scaleQuantize({
    domain: [Math.min(...valuesPending), Math.max(...valuesPending)],
    range: rangePending,
  });

  const scaleSent = scaleQuantize({
    domain: [Math.min(...valuesSent), Math.max(...valuesSent)],
    range: rangeSent,
  });

  const translateX = centerX - 90;
  const translateY = centerY + height * 0.64;

  return (
    <>
      <svg className="w-full h-full rounded-md">
        <rect x={0} y={0} fill={background} rx={14} />
        <Mercator<FeatureShape>
          data={europe.features}
          scale={scale}
          translate={[translateX, translateY]}
        >
          {(mercator) => (
            <g className="m-2">
              {[
                ...mercator.features.filter(
                  ({ feature }) => feature.id !== hoveredFeature
                ),
                ...mercator.features.filter(
                  ({ feature }) => feature.id === hoveredFeature
                ),
              ].map(({ feature, path }, i) => {
                const isHovered = hoveredFeature === feature.id;

                // 4. Use `filteredMapData` to find the matching data.
                const matchedData = filteredMapData.find(
                  (c) => c.isoCode3 === feature.id
                );

                let colorValue = 0;
                let fillColor = "#f3f4f6";

                if (matchedData) {
                  if (matchedData.totalRecovered > 0) {
                    colorValue = matchedData.totalRecovered;
                    fillColor = scaleRecovered(colorValue);
                  } else if (matchedData.totalPending > 0) {
                    colorValue = matchedData.totalPending;
                    fillColor = scalePending(colorValue);
                  } else {
                    colorValue = matchedData.totalSent;
                    fillColor = scaleSent(colorValue);
                  }
                }
                const isInData = !!matchedData;

                return (
                  <g key={`map-group-${i}`}>
                    <path
                      d={path || ""}
                      fill={fillColor}
                      // ... (rest of your path props)
                      stroke="#ffffff"
                      strokeWidth={2.5}
                      transform={
                        isInData
                          ? isHovered
                            ? "scale(1.0199)"
                            : "scale(1)"
                          : "scale(1)"
                      }
                      style={{
                        transformOrigin: "center",
                        transition: "transform 0.2s ease",
                      }}
                      onMouseEnter={(event) => {
                        // Only trigger hover effects if there's data for the country
                        if (matchedData) {
                          setHoveredFeature(feature.id);
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
                        if (events && matchedData) {
                          alert(
                            `Clicked: ${feature.properties.name} (${feature.id})`
                          );
                        }
                      }}
                    />
                  </g>
                );
              })}
            </g>
          )}
        </Mercator>
      </svg>
      {/* ... (your Tooltip JSX remains the same) ... */}
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
