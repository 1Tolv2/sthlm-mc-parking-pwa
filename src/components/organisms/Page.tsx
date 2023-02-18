import React, { PropsWithChildren, ReactNode } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { app } from "../../common/constants";
import { Layout } from "../Layout/Layout";
import LocationButton from "../molecules/LocationButton";
import AddressSearch from "./AddressSearch";
import Navigation from "./Navigation";

interface PageProps {
  description?: string;
  elements?: ReactNode;
  keywords?: string;
  title?: string;
}

export const Page = ({
  children,
  description,
  elements,
  keywords,
  title,
}: PropsWithChildren<PageProps>): JSX.Element => (
  <HelmetProvider>
    <Helmet defaultTitle={app.name} titleTemplate={`${app.name} | %s`}>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <title>{title}</title>
      {elements}
    </Helmet>
    <Layout>
      <AddressSearch />
      {children}
      <div className="flex flex-col gap-sm">
        <LocationButton icon="locationOff" />
        <Navigation />
      </div>
    </Layout>
  </HelmetProvider>
);
