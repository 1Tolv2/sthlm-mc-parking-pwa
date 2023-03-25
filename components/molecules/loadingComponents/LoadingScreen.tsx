import React from "react";
import LoadingAnimation from "./LoadingAnimation";

type Props = {};

const LoadingScreen = (props: Props) => {
  return (
    <div className="absolute flex gap-10 flex-col justify-center items-center w-full h-full bg-primary z-[100]">
      <LoadingAnimation />
      <p className="text-xl text-white">Loading parkingspots</p>
    </div>
  );
};

export default LoadingScreen;
