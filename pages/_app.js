/* eslint-disable @next/next/inline-script-id */
import "tailwindcss/tailwind.css";
import Head from "next/head";
import Script from "next/script";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { AppProvider } from "../components/utils/context/appContext";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
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

          <div className="flex flex-col h-screen bg-gray-900">
            <Navbar>
              <Component {...pageProps} />
            </Navbar>
            <Footer />
          </div>
        </AppProvider>
      </Web3ReactProvider>
    </>
  );
};

export default MyApp;
