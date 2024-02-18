import React from "react";
import ExitButton from "../buttons/ExitButton";
import { FeatureItem } from "../../../types";
import Description from "./Description";
import StandardContainer from "../StandardContainer";
import Button from "../buttons/Button";

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
const Card = ({ target, openDirections, closeModal }: Props) => {
  return (
    <div id={`detail-${target?.id}`} className="pointer-events-auto">
      <StandardContainer padding="lg" className="relative flex-col pb-0">
        <div className="w-full text-left">
          <div className="flex justify-between w-full ">
            <h2 className="grow text-xl sm:text-2xl font-semibold break-words mb-sm sm:mb-md w-[90%]">
              {target?.properties?.ADDRESS}
            </h2>
            <ExitButton handleOnClick={closeModal} />
          </div>

          {target && (
            <Description target={target} containerClasses="-mb-6 md:mb-0" />
          )}
        </div>
        <div className="relative -bottom-[35px] mx-auto">
          <span className="block max-w-[230px] mx-auto italic text-gray-500 text-center text-xs md:text-sm mb-1">
            Avvikelser kan förekomma, kontrollera alltid föreskrifterna på plats
          </span>
          <Button onClick={openDirections} icon="direction">
            {"Navigera"}
          </Button>
        </div>
      </StandardContainer>
    </div>
  );
};

export default Card;
