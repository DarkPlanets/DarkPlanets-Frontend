import Head from "next/head";
import RARITY_ABI from "../components/utils/abis/rarity.json";

import { RARITY_CONTRACT, randomGen } from "../components/utils/constants";
import { useContract } from "../components/utils/hooks/useContract";

const SUMMONER_CLASS = [
  { id: 1, name: "barbarian" },
  { id: 2, name: "bard" },
  { id: 3, name: "cleric" },
  { id: 4, name: "druid" },
  { id: 5, name: "fighter" },
  { id: 6, name: "monk" },
  { id: 7, name: "paladin" },
  { id: 8, name: "ranger" },
  { id: 9, name: "rogue" },
  { id: 10, name: "sorcerer" },
  { id: 11, name: "wizard" },
];

const Summon = () => {
  const rarity_contract = useContract(RARITY_CONTRACT, RARITY_ABI);

  const _mint = async (_id) => {
    const estimateClaim = await rarity_contract.estimateGas.summon(_id);

    await rarity_contract.summon(_id, {
      gasLimit: parseInt(estimateClaim, 10) + 100000,
    });
  };

  return (
    <div>
      <Head>
        <title>Mint a class</title>
      </Head>

      <main className="flex flex-col items-center">
        <div className="my-5 text-center space-y-2">
          <h1 className="font-semibold text-4xl">Summon</h1>
          <p className="text-xl">Mint any class you want</p>
        </div>

        <section className="flex flex-col items-center my-10">
          <button
            onClick={() => _mint(randomGen())}
            className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-md"
          >
            Mint a random summoner ⚔️
          </button>

          <div className="grid grid-cols-6 gap-3 my-10">
            {SUMMONER_CLASS?.map((s, index) => {
              return (
                <button
                  key={index}
                  onClick={() => _mint(s?.id)}
                  className="bg-blue-500 hover:bg-blue-600 rounded-md px-8 py-5 text-md font-semibold"
                >
                  {s?.name?.toUpperCase()}
                </button>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Summon;
