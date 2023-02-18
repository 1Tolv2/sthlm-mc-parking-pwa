import React from "react";

type props = {
  children: React.ReactNode;
  width?: string;
  height?: string;
  padding?: string;
  className?: string;
};

export default function StandardContainer({
  children,
  height = "fit",
  width = "full",
  padding = "md",
  className = "",
}: props) {
  return (
    <div
      className={`flex items-center bg-white p-${padding} rounded-lg drop-shadow w-${width} h-${height} ${className}`}
    >
      {children}
    </div>
  );
}
