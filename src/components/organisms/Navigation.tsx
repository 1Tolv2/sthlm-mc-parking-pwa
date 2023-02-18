import React from "react";
import StandardContainer from "../atoms/StandardContainer";

const Navigation = () => {
  const renderNavigation = () => {
    return (
      <div className="w-full text-center border-r-2 last:border-0 border-neutral">
        hej
      </div>
    );
  };

  return (
    <StandardContainer className="mx-auto max-w-[500px]">
      <div className="grid grid-cols-3 w-full justify-evenly place-items-center">
        {renderNavigation()}
        {renderNavigation()}
        {renderNavigation()}
      </div>
    </StandardContainer>
  );
};

export default Navigation;
