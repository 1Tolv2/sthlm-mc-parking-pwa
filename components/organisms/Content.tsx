import React from "react";
import Map from "../molecules/Map";
import TopNavigation from "./TopNavigation";
import BottomNavigation from "./BottomNavigation";

type Props = {};

const Content = (props: Props) => {
  return (
    <>
      <Map />
      <TopNavigation />
      <BottomNavigation />
    </>
  );
};

export default Content;
