import React, { ReactNode, useState } from "react";
import { searchParkingSpots } from "../api";
import StandardContainer from "../atoms/StandardContainer";
import { CoordinateItem, FeatureItem } from "../../types";

type Props = {
  states: { setParkingSpots: (parkingSpots: FeatureItem[]) => void };
  mapStates: {
    setZoom: React.Dispatch<React.SetStateAction<number>>;
    setCenter: React.Dispatch<React.SetStateAction<CoordinateItem | null>>;
  };
};

const AddressSearch = ({ states, mapStates }: Props) => {
  const [address, setAddress] = useState<string>("");
  const { setParkingSpots } = states;
  const { setZoom, setCenter } = mapStates;

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await searchParkingSpots(address);

    setParkingSpots(data.features);
    console.log("FEATURES", data.features[0].geometry.coordinates[0][1]);
    setCenter({
      lat:
        (data.features[0].geometry.coordinates[0][1] as unknown as number) || 0,
      lng:
        (data.features[0].geometry.coordinates[0][0] as unknown as number) || 0,
    } as CoordinateItem);
    setZoom(15);
    setAddress("");
  };

  const renderSearchIcon = (): ReactNode => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 96 960 960"
        className="w-[120%] pr-md"
      >
        <path d="M796 935 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l264 262-44 44ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z" />
      </svg>
    );
  };
  return (
    <div className="fixed top-md left-1/2 -translate-x-1/2 w-[500px]">
      <StandardContainer width="full" className="mx-auto max-w-[500px]">
        <div className="w-[39px] border-r-2 border-neutral mr-md">
          {renderSearchIcon()}
        </div>
        <form className="w-full h-full" onSubmit={handleOnSubmit}>
          <input
            id="address"
            type="text"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder="Hitta parkering"
            className="w-full h-full outline-transparent focus:outline-transparent"
          />
          <input type="submit" hidden title="submit" />
        </form>
      </StandardContainer>
    </div>
  );
};

export default AddressSearch;
