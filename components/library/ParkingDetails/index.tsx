import React, { useEffect, useState } from "react";
import { useParkingContext } from "../../../context/ParkingContext";
import Modal from "./Modal";

const ParkingDetailModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { targetedParkingSpot, setTargetedParkingSpot } = useParkingContext();
  const handleModal = () => {
    if (document.getElementById("parking-detail-modal")) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleModal);
    return document.removeEventListener("click", handleModal);
  }, []);

  useEffect(() => {
    setIsModalOpen(!!targetedParkingSpot);
  }, [targetedParkingSpot]);

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
        <Modal
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
