import React from "react";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import LocationButton from "../components/molecules/LocationButton";
import AddressSearch from "../components/organisms/AddressSearch";
import Navigation from "../components/organisms/Navigation";
import ParkingDetailModal from "../components/molecules/ParkingDetailModal";

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
        <ParkingDetailModal />
        <div className="fixed bottom-md left-1/2 -translate-x-1/2 flex flex-col gap-2 w-full">
          <LocationButton />
          <Navigation />
        </div>
      </Layout>
    </div>
  );
}
