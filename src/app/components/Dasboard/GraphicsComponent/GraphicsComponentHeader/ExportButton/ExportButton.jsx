"use client";
import { useState } from "react";
import html2canvas from "html2canvas";

export default function ExportButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    setIsLoading(true);

    const element = document.getElementById("dashboard-capture");
    if (!element) {
      setIsLoading(false);
      return;
    }

    await document.fonts.ready;

    // Create a wrapper for html2canvas
    const wrapper = document.createElement("div");
    wrapper.style.padding = "20px";
    wrapper.style.backgroundColor = "white";

    // --- SOLUTION ---
    // 1. Get the computed width of the original dashboard element.
    const originalWidth = element.offsetWidth;
    const originalHeight = element.offsetHeight;
    // 2. Apply this width to the wrapper to give the clone a layout context.
    wrapper.style.width = `${originalWidth}px`;
    wrapper.style.height = `${originalHeight}px`;
    // --- END SOLUTION ---

    // Clone the dashboard
    const cloned = element.cloneNode(true);

    // Selecciona TODOS los spans de texto dentro de la leyenda
    /*  const legendTexts = cloned.querySelectorAll(
      ".recharts-legend-wrapper li span.truncate"
    ); */
    const legendWrapper = cloned.querySelectorAll(".recharts-legend-wrapper");
    const exportLegend = cloned.querySelectorAll(".export-legend");
    const exportLegendText = cloned.querySelectorAll(".export-legend-text");
    const exportButtons = cloned.querySelectorAll(".see-more-button");
    const recoveryTimeTexts = cloned.querySelectorAll(".averageText");

    legendWrapper.forEach((legendItem) => {
      legendItem.style.display = "none";
    });

    exportButtons.forEach((button) => {
      // Cast to HTMLElement to access the style property
      button.style.display = "none";
    });

    exportLegend.forEach((wrapper) => {
      wrapper.style.display = "flex";
    });

    exportLegendText.forEach((text) => {
      text.style.position = "relative";
      text.style.bottom = "8px";
    });

    recoveryTimeTexts.forEach((textSpan) => {
      textSpan.style.position = "relative";
      textSpan.style.bottom = "5px"; // Puedes ajustar este valor si es necesario
    });

    wrapper.appendChild(cloned);
    document.body.appendChild(wrapper);

    try {
      const canvas = await html2canvas(wrapper, {
        useCORS: true,
        scrollY: -window.scrollY,
      });

      const image = canvas.toDataURL("image/png");

      const now = new Date();
      const formattedDate = now
        .toISOString()
        .replace(/T/, "_")
        .replace(/:/g, "-")
        .replace(/\..+/, "");
      const filename = `dashboard-${formattedDate}.png`;

      const link = document.createElement("a");
      link.href = image;
      link.download = filename;
      link.click();
    } catch (error) {
      console.error("Error exporting the dashboard:", error);
    } finally {
      document.body.removeChild(wrapper);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isLoading}
      className={`hover-reduce-opacity group text-[14px] bg-exportButton-green flex items-center justify-center px-[0.65rem] py-2 text-white rounded-full transition-all ease-in-out duration-300 pointer-events-auto hover:px-4 ${
        isLoading
          ? "opacity-50 cursor-not-allowed px-4 py-2 w-[121px] h-[40px]"
          : ""
      }`}
    >
      {isLoading ? (
        <svg
          className="animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width="22"
          height="22"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      ) : (
        <>
          <svg
            width="20"
            height="20"
            viewBox="0 0 22 22"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <g transform="translate(2, 2)">
              <path
                d="M9.72726 8.27273L17 1"
                stroke="#FFFFFF"
                strokeWidth="1.5" // Stroke slightly thicker for clarity
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 6.81818L16.9991 1.00091L11.1818 1"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.0909 9.72736V16.2728C14.0909 16.4657 14.0143 16.6507 13.8779 16.7871C13.7415 16.9235 13.5565 17.0001 13.3636 17.0001H1.72727C1.53439 17.0001 1.3494 16.9235 1.21301 16.7871C1.07662 16.6507 1 16.4657 1 16.2728V4.63645C1 4.44357 1.07662 4.25858 1.21301 4.12219C1.3494 3.9858 1.53439 3.90918 1.72727 3.90918H8.27273"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          <span className="overflow-hidden max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 whitespace-nowrap">
            Exportar
          </span>
        </>
      )}
    </button>
  );
}
