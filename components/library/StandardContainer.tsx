import React from "react";

type props = {
  children: React.ReactNode;
  width?: string;
  height?: string;
  padding?: string;
  className?: string;
  onClick?: () => void;
  shadow?: boolean;
};

export default function StandardContainer({
  children,
  height = "h-fit",
  width = "w-full",
  padding = "md",
  className = "",
  shadow = false,
  onClick,
}: props) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center bg-white p-${padding} rounded-xl ${
        shadow ? "drop-shadow md:drop-shadow-2xl" : ""
      } ${width} ${height} ${className}`}
    >
      {children}
    </div>
  );
}
