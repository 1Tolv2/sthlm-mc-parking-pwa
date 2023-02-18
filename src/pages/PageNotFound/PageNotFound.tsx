import React from "react";
import { Page } from "../../components/organisms/Page/Page";

export const PageNotFound = (): JSX.Element => {
  const pageNotFoundText = "404 - Page Not Found";

  return (
    <Page description={pageNotFoundText} keywords={pageNotFoundText} title={pageNotFoundText}>
      <p>{pageNotFoundText}</p>
    </Page>
  );
};
