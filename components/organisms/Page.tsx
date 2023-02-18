import React, { PropsWithChildren, ReactNode } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
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
    <Helmet
      defaultTitle="STHLM MC Parkering"
      titleTemplate={`${"STHLM MC Parkering"} | %s`}
    >
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <title>{title}</title>
      {elements}
    </Helmet>
    <Layout>
      <AddressSearch />
      {children}
      <div className="flex flex-col gap-2">
        <LocationButton />
        <Navigation />
      </div>
    </Layout>
  </HelmetProvider>
);
