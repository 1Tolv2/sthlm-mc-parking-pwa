import React, { useEffect, useState } from "react";
import { useParkingContext } from "../../../context/ParkingContext";
import Card from "./Card";

const ParkingDetailModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { targetedParkingSpot, setTargetedParkingSpot } = useParkingContext();

  // checks if feature is targeted and opens and closes modal
  useEffect(() => {
    setIsModalOpen(!!targetedParkingSpot);
  }, [targetedParkingSpot]);

  /**
   * @description Links to location on google maps for navigation
   */
  const handleOpenDirections = () => {
    const lng: string =
      targetedParkingSpot?.geometry.coordinates[0][0].toString() || "";
    const lat: string =
      targetedParkingSpot?.geometry.coordinates[0][1].toString() || "";

    window.open(`https://maps.google.com/?q=${lat},${lng}`);
  };

  return (
    <>
      {isModalOpen && (
        <Card
          target={targetedParkingSpot}
          openDirections={handleOpenDirections}
          closeModal={() => {
            setIsModalOpen(false);
            setTargetedParkingSpot(null);
          }}
        />
      )}
    </>
  );
};

export default ParkingDetailModal;
