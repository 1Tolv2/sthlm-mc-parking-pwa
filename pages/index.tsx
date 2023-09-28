import React from "react";
import { GetStaticPropsResult } from "next";
import Head from "next/head";
import axios from "axios";
import AppProvider from "../context/index";
import Layout from "../components/Layout/Layout";
import Content from "../components/Content";
import { FeatureItem } from "../types";

type Props = {
  data: FeatureItem[] | null;
};
export default function Page({ data }: Props) {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Hitta mc parkering i stockholm"
          key="desc"
        />
        <meta name="theme-color" content="#FFFFFF" />
        <title>STHLM MC Parking</title>
        <link rel="manifest" href="./manifest.json" />
        <link rel="apple-touch-icon" href="/parking-180x180.png" />
      </Head>
      <Layout>
        <AppProvider>
          <Content data={data || []} />
        </AppProvider>
      </Layout>
    </div>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<FeatureItem[] | null>
> {
  const url = `${process.env.NEXT_APP_OPEN_PARKING_API_URL}/all?outputFormat=json&apiKey=${process.env.NEXT_APP_OPEN_PARKING_API_KEY}`;
  const { data } = await axios.get(url);

  const modifiedData: any[] = [];
  data.features.forEach((feature: any) => {
    if (
      !modifiedData.find(
        (item) => item.properties.ADDRESS === feature.properties.ADDRESS
      )
    ) {
      modifiedData.push(feature);
    } else if (feature.properties.ADDRESS === "<Adress saknas>") {
      modifiedData.push(feature);
    }
  });
  data.features = modifiedData;

  return {
    props: { data: data.features } as unknown as FeatureItem[] | null,
    revalidate: 300,
  };
}
