import React from "react";
import { Page } from "../components/organisms/Page/Page";

export const Home = (): JSX.Element => {
  const homeText = "Home";

  return <Page title={homeText} keywords={homeText}></Page>;
};
