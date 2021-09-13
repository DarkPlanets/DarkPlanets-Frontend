/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useContract } from "../components/utils/hooks/useContract";
import { DARK_PLANET_CONTRACT } from "../components/utils/constants";
import { base64ToJson, saveImage } from "../components/utils/constants";

import StatisticsCard from "../components/StatisticsCard";
import GetGlobalStats from "../components/getGlobalStats";
import DARK_PLANET_ABI from "../components/utils/abis/darkplanet.json";

const Home = () => {
  const [rarityID, setRarityID] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(undefined);
  const getDarkPlanet = useContract(DARK_PLANET_CONTRACT, DARK_PLANET_ABI);

  const getDarkPlanetStats = async () => {
    setLoading(true);
    const {
      dxpRate,
      totalSupply,
      getDarkPlanetPoint,
      getDarkPlanettDxp,
      tokenURI,
    } = getDarkPlanet;

    const userRarityID = parseInt(rarityID, 10);
    const _dXPRate = await dxpRate();
    const _totalSupply = await totalSupply();

    const _tURI = await tokenURI(userRarityID);
    const _dPlanetEXP = await getDarkPlanettDxp(userRarityID);
    const _dPlanetPoint = await getDarkPlanetPoint(userRarityID);

    let _tokenURI = base64ToJson(_tURI);
    let expRate = parseInt(_dXPRate);
    let _totalSup = parseInt(_totalSupply);
    let _points = parseInt(_dPlanetPoint, 10);
    let _d_exp = parseInt(_dPlanetEXP, 10) / 1000000000000000000;

    setStats({
      ...stats,
      name: _tokenURI.name,
      description: _tokenURI.description,
      image: _tokenURI.image,
      exp: _d_exp,
      points: _points,
      expRate: expRate,
      rarityID: userRarityID,
      totalSupply: _totalSup,
    });
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="py-14 pb-20">
        <h1 className="font-extrabold text-6xl text-center">
          Welcome to Dark Planet
        </h1>

        <GetGlobalStats />
      </div>

      <div className="flex flex-col w-full lg:w-1/2 px-5">
        <div className="w-full justify-center flex flex-row items-center space-x-5">
          <input
            type="text"
            value={rarityID}
            placeholder="Enter your Rarity ID..."
            className="text-black px-3 py-2 rounded-md w-full outline-none"
            onChange={(e) => {
              const trimmed_val = e.target.value.replace(/[^0-9]/g, "");

              if (e.target.value.length === trimmed_val.length) {
                setErrorMsg("");
                setRarityID(trimmed_val);
              } else {
                setErrorMsg("Please enter a numeric ID");
              }
            }}
          />

          <button
            onClick={getDarkPlanetStats}
            className="px-10 bg-blue-500 rounded-md py-2"
          >
            Search
          </button>
        </div>

        {errorMsg && (
          <p className="text-red-500 py-2 text-left w-full">{errorMsg}</p>
        )}
      </div>

      <div className="py-10 w-full flex flex-col items-center">
        {loading && <p className="text-xl">Loading...</p>}
        {!loading && stats?.image && stats?.points > 0 && (
          <div className="w-full flex flex-col items-center">
            <div
              style={{ overflow: "hidden" }}
              className="lg:w-1/2 w-full sm:max-h-72 max-h-40 border"
            >
              <img
                src={stats.image}
                alt="dp_image"
                height="800"
                style={{ maxWidth: "initial" }}
              />
            </div>

            <button
              onClick={() => saveImage(stats.image)}
              className="bg-blue-500 w-1/2 mt-3 rounded-md py-3"
            >
              Save Image
            </button>

            <StatisticsCard stats={stats} />
          </div>
        )}
        {!loading && stats?.points <= 0 && (
          <p className="text-lg">Sorry, you are currently not registered!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
