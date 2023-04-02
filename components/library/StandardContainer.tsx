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
  height = "h-fit",
  width = "w-full",
  padding = "md",
  className = "",
}: props) {
  return (
    <div
      className={`flex items-center bg-white p-${padding} rounded-lg ${width} ${height} ${className}`}
    >
      {children}
    </div>
  );
}
