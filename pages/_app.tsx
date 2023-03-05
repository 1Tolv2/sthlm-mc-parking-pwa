import type { AppProps } from "next/app";
import { useEffect } from "react";

import "../styles/global.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registration successful with scope: ",
            registration.scope
          );
        })
        .catch((err) => {
          console.log("Service Worker Registration Failed: ", err);
        });
    }
  }, []);

  return <Component {...pageProps} />;
}
