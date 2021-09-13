import { useEffect, useState } from "react";
import { useContract } from "../components/utils/hooks/useContract";
import { DARK_PLANET_CONTRACT } from "../components/utils/constants";

import DARK_PLANET_ABI from "../components/utils/abis/darkplanet.json";

const TestPage = () => {
  const [rarityID, setRarityID] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const getDarkPlanet = useContract(DARK_PLANET_CONTRACT, DARK_PLANET_ABI);

  useEffect(() => {}, []);

  const getDarkPlanetPoint = async () => {
    let points = await parseInt(
      getDarkPlanet.getDarkPlanetPoint(parseInt(rarityID, 10)),
      10
    );

    return await points;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-extrabold text-4xl text-center py-10">
        Welcome to Dark Planet
      </h1>

      <div className="flex flex-col w-full lg:w-1/2">
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
            onClick={getDarkPlanetPoint}
            className="px-10 bg-blue-500 rounded-md py-2"
          >
            Search
          </button>
        </div>

        {errorMsg && (
          <p className="text-red-500 py-2 text-left w-full">{errorMsg}</p>
        )}
      </div>
    </div>
  );
};

export default TestPage;
