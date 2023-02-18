import React from "react";
import { Page } from "../../components/organisms/Page/Page";

export const Home = (): JSX.Element => {
  const homeText = "Home";

  return (
    <Page description={homeText} keywords={homeText} title={homeText}>
      <h1>Hej</h1>
    </Page>
  );
};
