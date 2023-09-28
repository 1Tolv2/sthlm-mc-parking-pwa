import React from "react";
import ExitButton from "../buttons/ExitButton";
import Icons from "../Icons";
import { FeatureItem } from "../../../types";
import Description from "./Description";

type Props = {
  openDirections: () => void;
  closeModal: () => void;
  target: FeatureItem | null;
};

/**
 *
 * @param param0 target - targeted parking spot
 * @param param1 openDirections - navigation link function
 * @param param2 closeModal - closing modal function
 */
const Modal = ({ target, openDirections, closeModal }: Props) => {
  return (
    <div
      id={`detail-${target?.id}`}
      className="relative lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 w-full max-w-[500px] mx-auto px-md h-fit bg-white rounded-xl lg:p-md lg:drop-shadow-2xl z-20"
    >
      <div className="absolute top-md right-md w-fit mx-auto">
        <ExitButton handleOnClick={closeModal} />
      </div>
      <div className="w-full text-left md:mb-md py-md px-sm lg:px-md">
        <h2 className="text-2xl font-semibold break-words mb-md w-[90%]">
          {target?.properties?.ADDRESS}
        </h2>
        {target && <Description target={target} />}
      </div>
      <div
        className="flex justify-center gap-3 w-full h-fit p-md mb-sm lg:mb-0 rounded-xl bg-primary text-white cursor-pointer"
        onClick={openDirections}
      >
        <div className="relative h-8">
          <Icons color="white" icon="direction" />
        </div>
        <p className="text-lg font-medium p-px m-0">Navigera</p>
      </div>
    </div>
  );
};

export default Modal;
