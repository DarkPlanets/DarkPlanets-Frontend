import "tailwindcss/tailwind.css";
import Head from "next/head";
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
  );
};

export default MyApp;
