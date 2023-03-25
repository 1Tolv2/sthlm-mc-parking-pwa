import React from "react";

type Props = {
  handleOnClick: () => void;
};

const ExitButton = ({ handleOnClick }: Props) => {
  return (
    <div
      className="relative top-3 cursor-pointer mx-auto"
      onClick={handleOnClick}
    >
      <div className="relative top-0.5 w-6 h-0.5 rotate-45 bg-neutral" />
      <div className="w-6 h-0.5 -rotate-45 bg-neutral" />
    </div>
  );
};

export default ExitButton;
