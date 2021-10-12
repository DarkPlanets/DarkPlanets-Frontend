/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import { utils } from "ethers";
import { useQuery } from "urql";
import { base64ToJson } from "../utils/constants";
import { FixedSizeList as List } from "react-window";
import { useContract } from "../utils/hooks/useContract";
import { RARITY_LAND_CONTRACT } from "../utils/constants";

import Link from "next/link";
import RarityLand from "./rarityland";
import RarityStorage from "./raritystorage";
import StatisticsCard from "../StatisticsCard";
import RARITYLAND_ABI from "../utils/abis/rarityland.json";
import SaveImage from "../saveImage";

const SummonerQuery = `
query SummonerQ($ownerAddr: String!) {
  summoners(
    first: 1000,
    where: {
      owner : $ownerAddr
    }
  ) {
    id
    owner
    _class
    _level
  }
}
`;

const RenderDetails = ({ stats, appState, setAppState }) => {
  const summonerCoordX = parseInt(
    appState?.summonerCoord?.x || stats?.stats?.summonerCoord?.x,
    10
  );
  const summonerCoordY = parseInt(
    appState?.summonerCoord?.y || stats?.stats?.summonerCoord?.y,
    10
  );

  if (stats?.summonerId) {
    if (stats?.stats?.landImage && stats?.stats?.isLandOwned) {
      return (
        <div className="my-14">
          <h3 className="text-4xl font-bold mb-5">Land Customization</h3>
          <div className="flex flex-col w-full">
            <RarityStorage summonerId={stats?.summonerId} />
            <RarityLand
              appState={appState}
              landStats={stats?.stats}
              setAppState={setAppState}
              summonerId={stats?.summonerId}
              image={stats?.stats?.landImage}
              landOwn={stats?.stats?.isLandOwned}
            />
          </div>

          <StatisticsCard stats={stats?.stats} />
        </div>
      );
    }

    return (
      <div className="w-1/2">
        <p className="mt-10 font-semibold text-lg text-red-400">
          You currently do not have any land, however, you can move to any
          location you want. Just key in the coordinates!
        </p>
        <RarityLand
          appState={appState}
          landStats={stats?.stats}
          setAppState={setAppState}
          summonerId={stats?.summonerId}
          image={stats?.stats?.landImage}
          landOwn={stats?.stats?.isLandOwned}
        />

        <div className="my-10">
          {summonerCoordX > 0 && summonerCoordY > 0 ? (
            <div>
              <p className="py-5 text-2xl">
                Your summoner is currently on this land.
              </p>

              <SaveImage imageUrl={stats?.stats?.summonerOnLandImage} />
            </div>
          ) : (
            <p className="text-2xl">
              Your summoner is currently in position (0, 0)
            </p>
          )}
        </div>
      </div>
    );
  }

  return null;
};

const SummonerList = ({ account, appState, setAppState }) => {
  const rarity_land = useContract(RARITY_LAND_CONTRACT, RARITYLAND_ABI);
  const [result] = useQuery({
    query: SummonerQuery,
    variables: { ownerAddr: account },
  });
  const [isLoading, setLoading] = useState(false);
  const { data, loading, error } = result;

  useEffect(() => {
    if (appState?.summonerId) {
      _search();
    }

    _getTotalSupply();
  }, [appState?.summonerId]);

  const _search = async () => {
    setLoading(true);
    const {
      tokenURI,
      landState,
      getLandFee,
      getLandState,
      getLandIncome,
      getLandSummoners,
      getLandCoordinates,
      getSummonerCoordinates,
    } = rarity_land;

    const { summonerId } = { ...appState };
    const _getSummonerCoord = await getSummonerCoordinates(summonerId);

    // const _landState = await landState(summonerId);
    const _getLandState = await getLandState(summonerId);
    const _getLandFee = await getLandFee(summonerId);
    const _getLandIncome = await getLandIncome(summonerId);
    const _getLandsummoners = await getLandSummoners(summonerId);
    const _getLandCoordinates = await getLandCoordinates(summonerId);

    const _summonerOnLandTokenId = Math.floor(
      parseInt(_getSummonerCoord["x"], 10) / 1000
    );
    const _landTokenId = Math.floor(
      parseInt(_getLandCoordinates["x"], 10) / 1000
    );

    let newStats = {
      getLandFee: utils.formatEther(_getLandFee[1]),
      landImage: base64ToJson(await tokenURI(_landTokenId))["image"],
      summonerOnLandImage: base64ToJson(await tokenURI(_summonerOnLandTokenId))[
        "image"
      ],
      isLandPublic: _getLandState[1],
      getLandSummoners: parseInt(_getLandsummoners[1], 10),
      getLandIncome: utils.formatEther(_getLandIncome["income"]),
      summonerCoord: _getSummonerCoord,
      landCoord: _getLandCoordinates,
      isLandOwned: _getSummonerCoord[0], // _getSummonerCoord -> true: owns land already else land is not own
    };

    if (_getSummonerCoord[0]) {
      setAppState({
        ...appState,
        stats: newStats,
        isSearchModal: false,
        errorMsg: "Sorry, you've already claimed a land!",
      });
    } else {
      setAppState({
        ...appState,
        stats: newStats,
        isSearchModal: false,
        errorMsg: "",
      });
    }

    setLoading(false);
  };

  const _getTotalSupply = async () => {
    const supply = await rarity_land.totalSupply();
    setAppState({ ...appState, totalSupply: parseInt(supply, 10) });
  };

  const _claim = async () => {
    if (appState?.summonerId) {
      const claimFee = utils.formatEther(await rarity_land.getClaimFee());
      const estimateClaim = await rarity_land.provider.estimateGas({
        value: utils.parseUnits(claimFee),
      });

      return await rarity_land.claim(parseInt(appState?.summonerId, 10), {
        value: utils.parseUnits(claimFee),
        gasLimit: parseInt(estimateClaim, 10) + 1000000,
      });
    } else {
      setAppState({
        ...appState,
        summonerList: {
          errorMsg:
            "You've already claimed a land. You can't claim more than once.",
          isLandOwned: true,
        },
      });
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Error, oops!</p>;

  const filtered_data = data?.summoners
    ?.filter((e) => {
      return parseInt(e?.id, 16)
        .toString()
        .includes(appState?.filterSummoner || "");
    })
    ?.sort((a, b) => b._level - a._level);

  const Row = ({ index, style }) => {
    const summonerId = parseInt(filtered_data[index]?.id, 16);

    return (
      <div className="flex flex-row justify-center items-center" style={style}>
        <button
          key={index}
          onClick={() => setAppState({ ...appState, summonerId })}
          className={`w-1/2 py-5 ${
            appState?.summonerId === summonerId ? "bg-blue-500" : "bg-gray-600"
          } rounded-md hover:bg-blue-500`}
        >
          {summonerId}
        </button>
      </div>
    );
  };

  if (data?.summoners?.length === 0) {
    return (
      <Link href="/summon">
        <a className="text-xl font-semibold hover:text-blue-300">
          You currently do not have any summoners. Please click here to summon!
        </a>
      </Link>
    );
  }

  return (
    <div className="w-full space-y-5 pb-5">
      <div className="flex flex-row justify-center items-center">
        <p className="bg-blue-500 rounded-sm px-4 py-2">
          {appState?.totalSupply} / 10000 land claimed
        </p>
      </div>

      <h3 className="text-2xl font-semibold">
        Select your summoner ({data?.summoners?.length})
      </h3>
      <div className="items-center flex flex-col">
        {!(isLoading || appState?.isMoveLoading) && (
          <input
            className="rounded-md w-1/2 py-3 px-4 text-black mb-10"
            placeholder="Search your summoner..."
            onChange={(e) =>
              setAppState({ ...appState, filterSummoner: e.target.value })
            }
          />
        )}

        <div className="lg:w-1/2 w-full">
          {!(isLoading || appState?.isMoveLoading) && (
            <List
              height={250}
              itemSize={100}
              itemCount={filtered_data?.length || 0}
            >
              {Row}
            </List>
          )}

          {!isLoading && appState?.summonerId && (
            <div className="mt-10">
              {appState?.errorMsg && (
                <p className="text-lg text-red-500 py-3">
                  {appState?.errorMsg}
                </p>
              )}

              <div className="flex flex-row space-x-5 justify-center">
                <button
                  disabled={appState?.stats?.isLandOwned}
                  onClick={_claim}
                  className={`${
                    appState?.stats?.isLandOwned
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-blue-500"
                  } w-full py-3 rounded-md`}
                >
                  Claim Land
                </button>
              </div>
            </div>
          )}
        </div>

        {isLoading || appState?.isMoveLoading ? (
          <p className="mt-10 text-xl">Loading...</p>
        ) : (
          <RenderDetails
            stats={appState}
            appState={appState}
            setAppState={setAppState}
          />
        )}
      </div>
    </div>
  );
};

export default SummonerList;
