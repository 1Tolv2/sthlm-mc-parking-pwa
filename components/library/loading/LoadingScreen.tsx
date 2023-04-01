import React from "react";
import LoadingAnimation from "./LoadingAnimation";

const LoadingScreen = () => {
  return (
    <div className="absolute top-0 left-0 flex gap-10 flex-col justify-center items-center w-full h-full bg-primary z-[100] text-center">
      <h1 className="font-tratex text-[24px] sm:text-[40px] text-white">
        STHLM MC Parkering
      </h1>
      <LoadingAnimation />
      <p className="font-tratex text-sm sm:text-xl text-white">
        Laddar in alla parkeringar
      </p>
    </div>
  );
};

export default LoadingScreen;
