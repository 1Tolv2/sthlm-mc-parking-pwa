import React from "react";
import { Marker } from "react-leaflet";
import * as L from "leaflet";
import { useParkingContext } from "../../../context/ParkingContext";

const ParkingLocations = () => {
  const { parkingSpots, setTargetedParkingSpot } = useParkingContext();

  const parkingIcon = new L.Icon({
    iconUrl: "./marker.png",
    iconSize: new L.Point(40, 50),
    iconAnchor: [22, 94],
    className: "leaflet-div-icon !bg-transparent",
  });
  return (
    <>
      {parkingSpots?.map((item) => {
        return (
          <Marker
            key={item.id}
            position={[
              item?.geometry?.coordinates[0][1] as unknown as number,
              item?.geometry?.coordinates[0][0] as unknown as number,
            ]}
            icon={parkingIcon}
            eventHandlers={{
              click: () => {
                setTargetedParkingSpot(item);
              },
            }}
          />
        );
      })}
    </>
  );
};

export default ParkingLocations;
