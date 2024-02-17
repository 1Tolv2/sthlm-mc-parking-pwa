import React, { ReactNode, useState } from "react";
import { CoordinateItem } from "../../types";
import {
  searchParkingSpots,
  getNearbyParkingSpots,
  searchStreetName,
  getStreetLocation,
} from "../api";
import StandardContainer from "../library/StandardContainer";
import ExitButton from "./buttons/ExitButton";
import { useMapContext } from "../../context/MapContext";
import { useParkingContext } from "../../context/ParkingContext";
import { useModalContext } from "../../context/ModalContext";
import { useAppContext } from "../../context/AppContext";
import { pruneFeatures } from "../../utils/pruneFeatures";
import Icons from "./Icons";
import getHexColor from "../../utils/getHexColor";

type Props = {
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddressSearch = ({ setIsSearching }: Props) => {
  const [address, setAddress] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const { setMapView } = useMapContext();
  const { setParkingSpots, resetParking } = useParkingContext();
  const { setModalContent } = useModalContext();
  const { setIsLoading } = useAppContext();

  const fetchParkingSpots = async (address: string) => {
    const streetName = address;

    const data = await searchParkingSpots(streetName);
    if (data.features?.length > 0) {
      setParkingSpots(pruneFeatures(data.features));
      setMapView({
        zoom: 14,
        center: {
          lat:
            (data.features[0].geometry
              .coordinates[0][1] as unknown as number) || 0,
          lng:
            (data.features[0].geometry
              .coordinates[0][0] as unknown as number) || 0,
        } as CoordinateItem,
      });
      setIsSearching(true);
    } else if (data.features?.length === 0) {
      try {
        const coordinates = await getStreetLocation(streetName);
        const proximityData = await getNearbyParkingSpots({
          lng: coordinates.lng,
          lat: coordinates.lat,
        });
        if (proximityData.features?.length !== 0) {
          setParkingSpots(pruneFeatures(data.features));
          setMapView({
            zoom: 14,
            center: {
              lat:
                (data.features[0].geometry
                  .coordinates[0][1] as unknown as number) || 0,
              lng:
                (data.features[0].geometry
                  .coordinates[0][0] as unknown as number) || 0,
            } as CoordinateItem,
          });

          setAddress("");
        }
      } catch (err) {
        setModalContent("Inga parkeringar hittades");
      }
    }
  };

  const handleOnChange = async (e: React.FormEvent<HTMLInputElement>) => {
    setAddress(e.currentTarget.value);
    if (e.currentTarget.value !== "") {
      const response = await searchStreetName(e.currentTarget.value);
      setSearchResults(response?.slice(0, 3) || []);
    } else if (e.currentTarget.value === "") {
      setSearchResults([]);
    }
  };

  const handleOnSearchResultClick = (result: string) => {
    setIsLoading(true);
    setAddress(result);
    fetchParkingSpots(result).then(() => setIsLoading(false));
    setSearchResults([]);
  };

  return (
    <div className="relative w-full ">
      <StandardContainer
        width={isExpanded ? "w-full" : "w-fit"}
        padding="lg"
        round
      >
        <div
          className="w-[35px] h-[35px]"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icons icon="search" color={getHexColor("black") || "#000"} />
        </div>
        {isExpanded && (
          <>
            <form className="flex grow ml-md h-full">
              <input
                id="address"
                type="text"
                name="address"
                onChange={handleOnChange}
                value={address}
                autoComplete="off"
                placeholder="Sök på gatunamn"
                className="w-full h-full outline-transparent focus:outline-transparent"
              />
              <input type="submit" hidden title="submit" />
            </form>
            {address && (
              <ExitButton
                handleOnClick={() => {
                  setIsLoading(true);
                  setAddress("");
                  resetParking();
                  setIsSearching(false);
                  setSearchResults([]);
                }}
              />
            )}
          </>
        )}
      </StandardContainer>
      {searchResults && searchResults.length !== 0 && (
        <div className="absolute pl-[50px] pr-[39px] w-full opacity-90">
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
