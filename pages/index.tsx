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
          name="Sök efter mc parkering i Stockholm"
          content="STHLM MC parkering"
        ></meta>
        <title>STHLM MC Parking</title>
      </Head>
      <Layout>
        <Content />
      </Layout>
    </div>
  );
}
