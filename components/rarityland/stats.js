/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { useContract } from "../utils/hooks/useContract";
import { AppContext } from "../utils/context/appContext";
import { RARITY_LAND_CONTRACT } from "../utils/constants";
import { base64ToJson, saveImage } from "../utils/constants";

import SaveImage from "../saveImage";
import RARITY_LAND_ABI from "../utils/abis/rarityland.json";

const RarityLandStatistics = ({ stats }) => {
  const { summonerID } = { ...stats };
  const { languagePack } = useContext(AppContext);
  const [rlStats, setStats] = useState({});
  const getRarityLand = useContract(RARITY_LAND_CONTRACT, RARITY_LAND_ABI);

  useEffect(() => {
    getStatistics();
  }, [getRarityLand]);

  const getStatistics = async () => {
    if (getRarityLand && stats) {
      const { tokenURI, getLandCoordinates, getLandFee } = getRarityLand;

      if (!rlStats?.image) {
        setStats({
          image: base64ToJson(await tokenURI(summonerID))["image"],
          landCoord: await getLandCoordinates(summonerID),
          landFee: await getLandFee(summonerID),
        });
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-10">
      {rlStats?.image && <SaveImage imageUrl={rlStats?.image} />}
    </div>
  );
};

export default RarityLandStatistics;
