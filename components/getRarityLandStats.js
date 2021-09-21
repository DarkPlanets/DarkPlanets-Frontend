/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { useContract } from "./utils/hooks/useContract";
import { AppContext } from "./utils/context/appContext";
import { RARITY_LAND_CONTRACT } from "./utils/constants";

import RARITY_LAND_ABI from "./utils/abis/rarityland.json";

const GetRarityLandStats = () => {
  const { languagePack } = useContext(AppContext);
  const [totalLands, setTotalLands] = useState("");
  const [currentLand, setCurrentLand] = useState("");
  const getRarityLand = useContract(RARITY_LAND_CONTRACT, RARITY_LAND_ABI);

  useEffect(() => {
    getGlobalStats();
  }, [getRarityLand]);

  const getGlobalStats = async () => {
    if (getRarityLand) {
      const { totalSupply, getMaxLands } = getRarityLand;

      setTotalLands(parseInt(await getMaxLands(), 10).toString());
      setCurrentLand(parseInt(await totalSupply(), 10).toString());
    }
  };

  return (
    <div className="flex flex-row w-full justify-center space-x-10 md:space-x-0 md:justify-between mt-3">
      <p className="bg-blue-500 px-3 py-1 rounded-sm">
        {languagePack?.stats?.land_claimed}:{" "}
        {currentLand || languagePack?.error?.login_to_view}
      </p>
      <p className="bg-blue-500 px-3 py-1 rounded-sm">
        {languagePack?.stats?.totalSupply}:{" "}
        {totalLands || languagePack?.error?.login_to_view}
      </p>
    </div>
  );
};

export default GetRarityLandStats;
