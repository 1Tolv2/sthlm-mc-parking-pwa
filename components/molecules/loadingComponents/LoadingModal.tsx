import React from "react";
import LoadingAnimation from "./LoadingAnimation";

type Props = {};

const LoadingModal = (props: Props) => {
  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      <div className="flex gap-10 flex-col justify-center items-center w-64 h-64 rounded-lg bg-[#ffffffc5] z-[100]">
        <LoadingAnimation primaryColor="#242424" secondaryColor="#929292" />
      </div>
    </div>
  );
};

export default LoadingModal;
