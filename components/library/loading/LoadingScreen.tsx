import React from "react";
import LoadingAnimation from "./LoadingAnimation";

type Props = {
  withSilhouette: boolean;
};
const LoadingScreen = ({ withSilhouette }: Props) => {
  return (
    <div className="absolute top-0 left-0 flex gap-10 flex-col justify-center items-center w-full h-full bg-primary z-[100] text-center">
      <LoadingAnimation withSilhouette={withSilhouette} />
      <p className="text-sm sm:text-xl text-white">
        Laddar in alla parkeringar
      </p>
    </div>
  );
};

export default LoadingScreen;
