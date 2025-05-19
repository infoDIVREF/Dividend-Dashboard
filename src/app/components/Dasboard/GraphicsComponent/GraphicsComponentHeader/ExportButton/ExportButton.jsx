"use client";
import React, { useState } from "react";
import html2canvas from "html2canvas";

export default function ExportButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    setIsLoading(true);

    const element = document.getElementById("dashboard-capture");
    if (!element) return;

    await document.fonts.ready;

    // Crear wrapper con padding
    const wrapper = document.createElement("div");
    wrapper.style.padding = "20px";
    wrapper.style.backgroundColor = "white";
    wrapper.appendChild(element.cloneNode(true));

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
      console.error("Error exportando el dashboard:", error);
    } finally {
      document.body.removeChild(wrapper);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isLoading}
      className={`bg-exportButton-green flex items-center  gap-2 px-4 py-2 text-white rounded-md transition-all ease-in-out duration-300 w-32 min-w-32 ${
        isLoading
          ? "opacity-50 cursor-not-allowed justify-center"
          : "justify-between "
      }`}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
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
          Exportar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M9.72726 8.27273L17 1"
              stroke="#FFFFFF"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 6.81818L16.9991 1.00091L11.1818 1"
              stroke="#FFFFFF"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.0909 9.72736V16.2728C14.0909 16.4657 14.0143 16.6507 13.8779 16.7871C13.7415 16.9235 13.5565 17.0001 13.3636 17.0001H1.72727C1.53439 17.0001 1.3494 16.9235 1.21301 16.7871C1.07662 16.6507 1 16.4657 1 16.2728V4.63645C1 4.44357 1.07662 4.25858 1.21301 4.12219C1.3494 3.9858 1.53439 3.90918 1.72727 3.90918H8.27273"
              stroke="#FFFFFF"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </>
      )}
    </button>
  );
}
