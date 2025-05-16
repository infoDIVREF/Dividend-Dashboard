import React from "react";

export default function ToggleSideBarComponent() {
  return (
    <div className="w-full flex flex-row justify-end ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
      >
        <path
          d="M14 14.6015L7.5 7.88424L14 1.16699"
          stroke="#2A2A2A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 14.6015L1 7.88424L7.5 1.16699"
          stroke="#2A2A2A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
