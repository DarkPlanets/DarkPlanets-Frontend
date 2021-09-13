import "tailwindcss/tailwind.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

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
      <div className="flex flex-col h-screen bg-gray-900">
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
        <Footer />
      </div>
    </Web3ReactProvider>
  );
};

export default MyApp;
