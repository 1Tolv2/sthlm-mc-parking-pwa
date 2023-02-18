import React from "react";
import { Page } from "../components/organisms/Page";

export const PageNotFound = (): JSX.Element => {
  const pageNotFoundText = "404 - Page Not Found";

  return (
    // eslint-disable-next-line prettier/prettier
    <Page
      description={pageNotFoundText}
      keywords={pageNotFoundText}
      title={pageNotFoundText}
    >
      <p>{pageNotFoundText}</p>
    </Page>
  );
};
