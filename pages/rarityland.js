import { useContext, useEffect, useState } from "react";
import { utils } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { AppContext } from "../components/utils/context/appContext";
import { useContract } from "../components/utils/hooks/useContract";
import { RARITY_LAND_CONTRACT } from "../components/utils/constants";

import Head from "next/head";
import Link from "next/link";
import SummonerList from "../components/rarityland/summonerlist";
import RARITY_LAND_ABI from "../components/utils/abis/rarityland.json";

const RarityLand = () => {
  const { account } = useWeb3React();
  const { languagePack } = useContext(AppContext);
  const { rarityLandPage } = languagePack;
  const { setAppState, appState } = useContext(AppContext);
  const [currentFee, setCurrentFee] = useState("0");
  const rarity_land = useContract(RARITY_LAND_CONTRACT, RARITY_LAND_ABI);

  useEffect(() => {
    getLandFee().then((fee) => setCurrentFee(fee));
  }, [rarity_land]);

  const getLandFee = async () => {
    if (rarity_land) {
      return utils.formatEther(await rarity_land.getClaimFee());
    }

    return "0";
  };

  return (
    <div>
      <Head>
        <title>{rarityLandPage?.title}</title>
      </Head>

      <div
        className="flex bg-blue-100 rounded-lg p-4 mb-4 my-5 text-sm text-blue-700"
        role="alert"
      >
        <svg
          className="w-5 h-5 inline mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div>
          <Link href="/guides">
            <a>
              <span className="font-medium">Please Read!</span> Land claim fee
              will increase 5 FTM for every 1000 land claimed. The current land
              fee price is at{" "}
              <span className="font-bold">{currentFee} FTM</span>. Click here
              for more info!
            </a>
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center text-center text-white">
        <main className="min-h-screen container mx-auto">
          <div className="flex flex-col justify-center items-center">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="mix-blend-lighten lg:w-1/4 w-1/2 my-10 mt-16"
            >
              <source src="/planets/planet.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {account ? (
            <section className="flex justify-center">
              <div className="w-full px-10 py-10">
                <SummonerList
                  account={account}
                  appState={appState}
                  setAppState={setAppState}
                />
              </div>
            </section>
          ) : (
            <p className="text-xl font-semibold">
              Please login to search or claim land
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

export default RarityLand;
