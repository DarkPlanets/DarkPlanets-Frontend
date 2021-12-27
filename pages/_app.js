/* eslint-disable @next/next/inline-script-id */
import "aos/dist/aos.css";
import "../styles/styles.css";
import "tailwindcss/tailwind.css";

import AOS from "aos";
import Head from "next/head";
import Script from "next/script";
import NavBar from "../components/navbar";
import LoadingScreen from "../components/loadingscreen";

import { Provider } from "urql";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { client, ssrCache } from "../components/utils/urqlClient";
import { AppProvider } from "../components/utils/context/appContext";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const RenderHeader = () => {
  const router = useRouter();

  const navigation = [
    { title: "Home", url: "/" },
    { title: "Dark Planet", url: "/darkplanet" },
    { title: "Rarity Land", url: "https://darkplanets.vercel.app/rarityland" },
    { title: "Airdrop", url: "https://airdrop-darkplanet.vercel.app/" },
  ];

  switch (router.pathname) {
    case "/":
      return null;

    default:
      return (
        <div>
          <NavBar navigation={navigation} />
        </div>
      );
  }
};

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }

  return (
    <Provider value={client}>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`} />
      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
        `}
      </Script>

      <Web3ReactProvider getLibrary={getLibrary}>
        <AppProvider>
          <Head>
            <link rel="Web Icon" href="/logo.png" type="image/png"></link>
          </Head>

          <LoadingScreen>
            <div className="flex flex-col min-h-screen bg-gray-800">
              <RenderHeader />
              <Component {...pageProps} />
            </div>
          </LoadingScreen>
        </AppProvider>
      </Web3ReactProvider>
    </Provider>
  );
};

export default MyApp;
