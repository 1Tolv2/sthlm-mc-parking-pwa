import React, { ReactNode, useState } from "react";
import { CoordinateItem, FeatureItem } from "../../types";
import {
  searchParkingSpots,
  // getNearbyParkingSpots,
  searchStreetName,
  // getStreetLocation,
  // getStreets,
} from "../api";
import StandardContainer from "../atoms/StandardContainer";
import ExitButton from "../atoms/ExitButton";
import { useMapContext } from "../../context/MapContext";
import { useParkingContext } from "../../context/ParkingContext";

type Props = {};

const AddressSearch = (props: Props) => {
  const [address, setAddress] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const { setZoom, setCenter } = useMapContext();
  const { setParkingSpots } = useParkingContext();

  const fetchParkingSpots = async (address: string) => {
    const streetName = address;

    // const coordinates = await getStreetLocation(streetName);
    // If specific street number is given
    // const data = await getNearbyParkingSpots({
    //   longitude: coordinates.longitude,
    //   latitude: coordinates.latitude,
    // });
    const data = await searchParkingSpots(streetName);
    console.log("COORDS", data);
    if (data.features.length > 0) {
      setParkingSpots(data.features);
      setCenter({
        lat:
          (data.features[0].geometry.coordinates[0][1] as unknown as number) ||
          0,
        lng:
          (data.features[0].geometry.coordinates[0][0] as unknown as number) ||
          0,
      } as CoordinateItem);
      setZoom(15);
      setAddress("");
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // fetchParkingSpots(address);
  };

  const handleOnChange = async (e: any) => {
    setAddress(e.target.value);
    if (e.target.value !== "") {
      const response = await searchStreetName(e.target.value);
      // if (response?.length === 1) {
      //   const data = await getStreets(response[0]);
      //   console.log("DATA", data);
      //   setSearchResults([
      //     `${response[0]} ${data[0].StreetNum}`,
      //     `${response[0]} ${data[1].StreetNum}`,
      //     `${response[0]} ${data[2].StreetNum}`,
      //   ]);
      // } else {
      setSearchResults(response?.slice(0, 3) || []);
      console.log("RES", response);
      // }
    } else if (e.target.value === "") {
      setSearchResults([]);
    }
  };

  const handleOnSearchResultClick = (result: string) => {
    setAddress(result);
    fetchParkingSpots(result);
    setSearchResults([]);
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
    <div className="fixed top-md left-1/2 -translate-x-1/2 w-full md:w-[500px]">
      <StandardContainer width="full" className="mx-auto w-full">
        <div className="w-[39px] border-r-2 border-neutral mr-md">
          {renderSearchIcon()}
        </div>
        <form className="w-full h-full" onSubmit={handleOnSubmit}>
          <input
            id="address"
            type="text"
            name="address"
            onChange={handleOnChange}
            value={address}
            placeholder="Hitta parkering"
            className="w-full h-full outline-transparent focus:outline-transparent"
          />
          <input type="submit" hidden title="submit" />
        </form>
        <ExitButton handleOnClick={() => setAddress("")} />
      </StandardContainer>
      {searchResults && searchResults.length !== 0 && (
        <div className="pl-[50px] pr-[39px] opacity-90">
          <StandardContainer className="mt-sm" width="w-full md:w-[450px]">
            <ul className="w-full">
              {searchResults &&
                searchResults.map((result) => (
                  <li
                    key={`result-${result}`}
                    className="p-1 hover:bg-primary-200 cursor-pointer"
                    onClick={() => handleOnSearchResultClick(result)}
                  >
                    {result}
                  </li>
                ))}
            </ul>
          </StandardContainer>
        </div>
      )}
    </div>
  );
};

export default AddressSearch;
