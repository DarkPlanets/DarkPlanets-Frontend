import { useState } from "react";
import { useContract } from "../utils/hooks/useContract";
import { RARITY_LAND_STORAGE_CONTRACT } from "../utils/constants";

import RARITYLANDSTORAGE_ABI from "../utils/abis/raritylandstorage.json";

const RarityStorage = ({ summonerId }) => {
  const [landStats, setLandstats] = useState({
    name: "",
    description: "",
    landIndexType: "0",
    landContentDescription: "",
  });

  const rarity_storage = useContract(
    RARITY_LAND_STORAGE_CONTRACT,
    RARITYLANDSTORAGE_ABI
  );

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "landIndexType") {
      value = parseInt(e.target.value, 10);
    }

    setLandstats({ ...landStats, [e.target.name]: value });
  };

  const handleSetInfo = async () => {
    const sumId = parseInt(summonerId, 10);
    const { name, description, landIndexType, landContentDescription } =
      landStats;

    const estimateClaim = await rarity_storage.estimateGas.setLandInfo(
      sumId,
      name,
      description,
      landIndexType,
      landContentDescription
    );

    await rarity_storage.setLandInfo(
      sumId,
      name,
      description,
      landIndexType,
      landContentDescription,
      { gasLimit: parseInt(estimateClaim, 16) + 200000 }
    );
  };

  return (
    <div className="w-full">
      <div className="py-5 text-black flex flex-col items-center space-y-5">
        <input
          className="w-full rounded-md py-2 px-3"
          name="name"
          placeholder="Name of Land"
          onChange={handleChange}
        />

        <textarea
          className="w-full rounded-md py-2 px-3"
          name="description"
          rows="5"
          cols="50"
          placeholder="Land Description"
          onChange={handleChange}
        />

        <button
          onClick={handleSetInfo}
          className="text-white bg-blue-500 w-full rounded-md py-3"
        >
          Set Rarity Land Info
        </button>
      </div>
    </div>
  );
};

export default RarityStorage;
