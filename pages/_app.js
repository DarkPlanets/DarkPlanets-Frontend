/* eslint-disable @next/next/inline-script-id */
import "tailwindcss/tailwind.css";
import Head from "next/head";
import Script from "next/script";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

import { Provider } from "urql";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { client, ssrCache } from "../components/utils/urqlClient";
import { AppProvider } from "../components/utils/context/appContext";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const MyApp = ({ Component, pageProps }) => {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }

  return (
    <Provider value={client}>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
      />
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
            <link
              rel="Web Icon"
              href="/planets/planet08.png"
              type="image/png"
            ></link>
          </Head>

          <div className="flex flex-col h-screen">
            <Navbar>
              <Component {...pageProps} />
            </Navbar>
            <Footer />
          </div>
        </AppProvider>
      </Web3ReactProvider>
    </Provider>
  );
};

export default MyApp;
