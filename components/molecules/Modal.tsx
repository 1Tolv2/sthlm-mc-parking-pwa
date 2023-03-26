import React from "react";
import ExitButton from "../atoms/ExitButton";

type Props = {
  children: JSX.Element;
};

const Modal = ({ children }: Props) => {
  return (
    <div className="absolute w-screen h-screen z-[90] flex justify-center items-center">
      <div className="w-fit h-fit bg-primary text-white ">
        {/* <ExitButton />  */}
        <div className="text-base sm:text-lg font-tratex p-lg border-8 border-white rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
