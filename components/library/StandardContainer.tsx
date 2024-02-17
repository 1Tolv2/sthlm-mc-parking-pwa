import React from "react";

type props = {
  children: React.ReactNode;
  width?: string;
  height?: string;
  padding?: string;
  className?: string;
  onClick?: () => void;
  shadow?: boolean;
  round?: boolean;
};

export default function StandardContainer({
  children,
  height = "h-fit",
  width = "w-full",
  padding = "md",
  className = "",
  shadow = false,
  round = false,
  onClick,
}: props) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center bg-white p-${padding} ${
        shadow ? "drop-shadow md:drop-shadow-2xl" : ""
      } ${width} ${height} ${
        round ? "rounded-full" : "rounded-[20px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
