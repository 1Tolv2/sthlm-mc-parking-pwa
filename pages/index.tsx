import React from "react";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import Content from "../components/organisms/Content";

export default function Page() {
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
        <Content />
      </Layout>
    </div>
  );
}
