/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { useContract } from "./utils/hooks/useContract";
import { AppContext } from "./utils/context/appContext";
import { DARK_PLANET_CONTRACT } from "./utils/constants";

import DARK_PLANET_ABI from "./utils/abis/darkplanet.json";

const GetGlobalStats = () => {
  const { languagePack } = useContext(AppContext);
  const [totalUsers, setTotalUsers] = useState("");
  const [collectUsers, setCollectUsers] = useState("");
  const getDarkPlanet = useContract(DARK_PLANET_CONTRACT, DARK_PLANET_ABI);

  useEffect(() => {
    getGlobalStats();
  }, [getDarkPlanet]);

  const getGlobalStats = async () => {
    if (getDarkPlanet) {
      const { planetStatus } = getDarkPlanet;
      const { totalUsers, collectUsers } = await planetStatus();

      setTotalUsers(parseInt(totalUsers, 10).toString());
      setCollectUsers(parseInt(collectUsers, 10).toString());
    }
  };

  return (
    <div className="flex flex-row w-full justify-center space-x-10 md:space-x-0 md:justify-between mt-3">
      <p className="bg-blue-500 px-3 py-1 rounded-sm">
        {languagePack?.stats?.players_remain}:{" "}
        {collectUsers || languagePack?.error?.login_to_view}
      </p>
      <p className="bg-blue-500 px-3 py-1 rounded-sm">
        {languagePack?.stats?.total_players}:{" "}
        {totalUsers || languagePack?.error?.login_to_view}
      </p>
    </div>
  );
};

export default GetGlobalStats;
