import React from "react";
import LoadingAnimation from "./LoadingAnimation";

type Props = {};

const LoadingScreen = (props: Props) => {
  return (
    <div className="absolute flex gap-10 flex-col justify-center items-center w-full h-full bg-primary z-[100] text-center">
      <h1 className="text-[24px] sm:text-[40px] text-white">
        STHLM MC Parkering
      </h1>
      <LoadingAnimation />
      <p className="text-sm sm:text-xl text-white">
        Laddar in alla parkeringar
      </p>
    </div>
  );
};

export default LoadingScreen;