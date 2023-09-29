import React from "react";

type Props = {
  color?: string;
  handleOnClick: () => void;
};

/**
 *
 * @param param0 color: string, sets color of the icon
 * @param param1 handleOnClick: () => void
 */
const ExitButton = ({ color = "neutral-600", handleOnClick }: Props) => {
  return (
    <div className="cursor-pointer mx-auto w-6 h-6" onClick={handleOnClick}>
      <div className={`relative top-2 w-6 h-0.5 rotate-45 bg-${color}`} />
      <div className={`relative top-1.5 w-6 h-0.5 -rotate-45 bg-${color}`} />
    </div>
  );
};

export default ExitButton;
