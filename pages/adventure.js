import { useContext } from "react";
import { useContract } from "../components/utils/hooks/useContract";
import { AppContext } from "../components/utils/context/appContext";
import { DARK_PLANET_CONTRACT } from "../components/utils/constants";

import Head from "next/head";
import SummonerIDInput from "../components/SummonerIDInput";
import DARK_PLANET_ABI from "../components/utils/abis/darkplanet.json";

const Adventure = () => {
  const { languagePack, appState } = useContext(AppContext);

  const summonerID = parseInt(appState?.user?.summonerID, 10);
  const getDarkPlanet = useContract(DARK_PLANET_CONTRACT, DARK_PLANET_ABI);

  const startCollectEnergy = async () => {
    if (getDarkPlanet && summonerID) {
      try {
        let overrides = {
          gasLimit: 1000000,
        };

        const tx = await getDarkPlanet.startCollectingEnergy(
          summonerID,
          overrides
        );
        return await tx.wait();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const endCollectEnergy = async () => {
    if (getDarkPlanet && summonerID) {
      try {
        let overrides = {
          gasLimit: 1000000,
        };

        const tx = await getDarkPlanet.endCollectingEnergy(
          summonerID,
          overrides
        );
        return await tx.wait();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const triggerCapture = async () => {
    if (getDarkPlanet && summonerID) {
      if (getDarkPlanet && summonerID) {
        try {
          let overrides = {
            gasLimit: 82176,
          };

          const tx = await getDarkPlanet.triggerCaptureMechanism(
            summonerID,
            overrides
          );
          return await tx.wait();
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  const buttonList = [
    {
      title: "Start Collecting Energy ⚡",
      func: startCollectEnergy,
    },
    {
      title: "Stop Collecting Energy ⚡",
      func: endCollectEnergy,
    },
    {
      title: "Trigger Capture",
      func: triggerCapture,
    },
  ];

  return (
    <div>
      <Head>
        <title>{languagePack?.adventurePage?.title}</title>
      </Head>

      <main className="flex flex-col items-center mt-10">
        <h1 className="text-4xl font-bold">
          {languagePack?.adventurePage?.title}
        </h1>
        <p className="mt-3 font-semibold text-lg">
          {languagePack?.adventurePage?.description}
        </p>

        <div className="w-full mt-10">
          <SummonerIDInput>
            <div className="grid lg:grid-cols-3 grid-cols-2 mt-10 lg:w-1/2 gap-5 w-full">
              {buttonList.map((btl, index) => {
                return (
                  <button
                    onClick={btl.func}
                    key={index}
                    className="bg-blue-500 py-2 rounded-md w-full"
                  >
                    {btl.title}
                  </button>
                );
              })}
            </div>
          </SummonerIDInput>
        </div>
      </main>
    </div>
  );
};

export default Adventure;
