import React from "react";
import LoadingAnimation from "./LoadingAnimation";

type Props = {
  withSilhouette: boolean;
};
const LoadingScreen = ({ withSilhouette }: Props) => {
  return (
    <div className="absolute top-0 left-0 flex items-center w-full h-full bg-primary z-[100] text-center">
      <div className="relative top-[10%] w-full flex flex-col justify-center items-center gap-10">
        <LoadingAnimation withSilhouette={withSilhouette} />
        <p className="text-sm sm:text-xl text-white">
          Laddar in alla parkeringar
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
