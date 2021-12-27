import Head from "next/head";

import { useContext } from "react";
import { randomGen } from "../components/utils/constants";
import { AppContext } from "../components/utils/context/appContext";

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

const Rarity = () => {
  const { contracts } = useContext(AppContext);
  const { rarity } = contracts;

  console.log(rarity);
  const _mint = async (_id) => {
    const estimateClaim = await rarity.estimateGas.summon(_id);

    await rarity.summon(_id, {
      gasLimit: parseInt(estimateClaim, 10) + 100000,
    });
  };

  return (
    <div className="text-white">
      <Head>
        <title>Mint a class</title>
      </Head>

      {rarity ? (
        <main className="flex flex-col items-center">
          <div className="my-5 text-center space-y-2">
            <h1 className="font-semibold text-4xl">Summon</h1>
            <p className="text-xl">Mint any class you want</p>
          </div>

          <section className="flex flex-col items-center my-10">
            <button onClick={() => _mint(randomGen())} className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-md">
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
      ) : (
        <div className="flex justify-center items-center mt-40">
          <p className="text-2xl font-semibold">
            Please make sure you're in the correct network. Only Fantom and Fantom Testnet is supported!
          </p>
        </div>
      )}
    </div>
  );
};

export default Rarity;
