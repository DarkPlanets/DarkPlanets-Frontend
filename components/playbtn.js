import { useContext } from "react";
import { AppContext } from "./utils/context/appContext";

import toast from "react-hot-toast";

const PlayButton = ({ stats, getDarkPlanet }) => {
  const { appState, languagePack } = useContext(AppContext);
  const summonerID = parseInt(appState?.user?.summonerID, 10);

  if (getDarkPlanet && summonerID) {
    const startCollectEnergy = async () => {
      try {
        const startEstimate =
          await getDarkPlanet.estimateGas.startCollectingEnergy(summonerID);
        const tx = await getDarkPlanet.startCollectingEnergy(summonerID, {
          gasLimit: startEstimate,
        });

        return await tx.wait();
      } catch (e) {
        toast.error(languagePack?.adventurePage?.error_msg?.start_energy, {
          duration: 3000,
          position: "bottom-left",
        });
      }
    };

    const endCollectEnergy = async () => {
      try {
        const stopEstimate =
          await getDarkPlanet.estimateGas.endCollectingEnergy(summonerID);
        const tx = await getDarkPlanet.endCollectingEnergy(summonerID, {
          gasLimit: stopEstimate,
        });

        return await tx.wait();
      } catch (e) {
        toast.error(languagePack?.adventurePage?.error_msg?.stop_energy, {
          duration: 3000,
          position: "bottom-left",
        });
      }
    };

    const triggerCapture = async () => {
      try {
        const triggerEstimate =
          await getDarkPlanet.estimateGas.triggerCaptureMechanism(summonerID);
        const tx = await getDarkPlanet.triggerCaptureMechanism(summonerID, {
          gasLimit: triggerEstimate,
        });

        return await tx.wait();
      } catch (e) {
        toast.error(languagePack?.adventurePage?.error_msg?.trigger_capture, {
          duration: 3000,
          position: "bottom-left",
        });
      }
    };

    const buttonfn = {
      stop_energy: endCollectEnergy,
      trigger_capture: triggerCapture,
      start_energy: startCollectEnergy,
    };

    const handleDisabled = (btn, stats) => {
      if (
        (btn.tag === "start_energy" && stats.status === 1) ||
        (btn.tag === "stop_energy" && stats.status === 2)
      )
        return true;

      return false;
    };

    return (
      <div className="grid lg:grid-cols-3 grid-cols-2 mt-10 lg:w-1/2 gap-5 w-full">
        {languagePack?.adventurePage?.btn_list?.map((btl, index) => {
          let isDisabled = handleDisabled(btl, stats);
          return (
            <button
              onClick={buttonfn[btl.tag]}
              key={index}
              disabled={isDisabled}
              className={`${
                isDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"
              } py-2 rounded-md w-full z-50`}
            >
              {btl.title}
            </button>
          );
        })}
      </div>
    );
  }

  return null;
};

export default PlayButton;
