import React, { PropsWithChildren, ReactNode } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { app } from "../../../common/constants";
import { Layout } from "../../Layout/Layout";

interface PageProps {
  // className?: string | undefined;
  // isFluid?: boolean;
  // role?: string;
  // Tag?: keyof JSX.IntrinsicElements;
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
    <Layout>{children}</Layout>
  </HelmetProvider>
);
