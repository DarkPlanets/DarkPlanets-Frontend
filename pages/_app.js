import "tailwindcss/tailwind.css";
import Navbar from "../components/navbar";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const MyApp = ({ Component, pageProps }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </Web3ReactProvider>
  );
};

export default MyApp;
