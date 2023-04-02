import React from "react";

type Props = {
  handleOnClick: () => void;
};

const ExitButton = ({ handleOnClick }: Props) => {
  return (
    <div className="cursor-pointer mx-auto w-6 h-6" onClick={handleOnClick}>
      <div className="relative top-2 w-6 h-0.5 rotate-45 bg-neutral-600" />
      <div className="relative top-1.5 w-6 h-0.5 -rotate-45 bg-neutral-600" />
    </div>
  );
};

export default ExitButton;
