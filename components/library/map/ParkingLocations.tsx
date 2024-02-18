import React from "react";
import { useRouter } from "next/router";
import { Marker } from "react-leaflet";
import * as L from "leaflet";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MarkerClusterGroup from "@christopherpickering/react-leaflet-markercluster";
import { useParkingContext } from "../../../context/ParkingContext";

const ParkingLocations = () => {
  const { parkingSpots, setTargetedParkingSpot } = useParkingContext();
  const router = useRouter();

  const parkingIcon = new L.Icon({
    iconUrl: "./marker.png",
    iconSize: new L.Point(30, 37.5),
    iconAnchor: [15, 37.5],
    className: "leaflet-div-icon",
  });
  return (
    <MarkerClusterGroup>
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
                router.query.id = item?.id;
                router.push(router);
              },
            }}
          />
        );
      })}
    </MarkerClusterGroup>
  );
};

export default ParkingLocations;
