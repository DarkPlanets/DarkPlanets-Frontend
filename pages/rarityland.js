import { useContext } from "react";
import { AppContext } from "../components/utils/context/appContext";

import Head from "next/head";
import SummonerIDInput from "../components/SummonerIDInput";
import GetRarityLandStats from "../components/getRarityLandStats";
import RarityLandStatistics from "../components/rarityland/stats";

const RarityLand = () => {
  const { languagePack } = useContext(AppContext);
  const rarityLandPage = languagePack?.raritylandPage;

  return (
    <div>
      <Head>
        <title>{rarityLandPage?.title}</title>
      </Head>

      <GetRarityLandStats />
      <main className="flex flex-col items-center mt-10">
        <h1 className="text-4xl font-bold">{rarityLandPage?.title}</h1>
        <p className="pt-4 lg:text-2xl text-lg font-semibold text-center">
          {rarityLandPage?.description}
        </p>
      </main>

      <section className="mt-5">
        <SummonerIDInput placeholder={languagePack?.indexPage?.land_id} isClaim>
          <RarityLandStatistics />
        </SummonerIDInput>
      </section>
    </div>
  );
};

export default RarityLand;
