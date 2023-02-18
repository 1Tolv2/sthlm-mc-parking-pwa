import React from "react";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import LocationButton from "../components/molecules/LocationButton";
import AddressSearch from "../components/organisms/AddressSearch";
import Navigation from "../components/organisms/Navigation";

export default function Page() {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="Sök efter mc parkering i Stockholm"
          content="STHLM MC parkering"
        ></meta>
        <title>Sofia Johnsson S.</title>
      </Head>
      <Layout>
        <AddressSearch />
        <div className="flex flex-col gap-2">
          <LocationButton />
          <Navigation />
        </div>
      </Layout>
    </div>
  );
}
