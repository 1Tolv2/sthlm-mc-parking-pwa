import React from "react";
import { useRouter } from "next/router";
import { Marker } from "react-leaflet";
import * as L from "leaflet";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MarkerClusterGroup from "@christopherpickering/react-leaflet-markercluster";
import { useParkingContext } from "../../../context/ParkingContext";
import { useMapContext } from "../../../context/MapContext";

const ParkingLocations = () => {
  const { parkingSpots, setTargetedParkingSpot, setCurrentLocation } =
    useParkingContext();
  const { setMapView } = useMapContext();
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
              (item?.geometry?.coordinates[0][1] as unknown as number) + 0.002,
              item?.geometry?.coordinates[0][0] as unknown as number,
            ]}
            icon={parkingIcon}
            eventHandlers={{
              click: () => {
                setMapView({
                  zoom: 16,
                  center: {
                    lat: item.geometry.coordinates[0][1] as unknown as number,
                    lng: item.geometry.coordinates[0][0] as unknown as number,
                  },
                });
                setCurrentLocation({
                  lat: item.geometry.coordinates[0][1] as unknown as number,
                  lng: item.geometry.coordinates[0][0] as unknown as number,
                });
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
