/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { useRouter } from "next/dist/client/router";
import { AppContext } from "./utils/context/appContext";

import SaveImage from "../components/saveImage";

const StatisticsCard = ({ stats }) => {
  const { languagePack } = useContext(AppContext);
  const router = useRouter();

  console.log(router?.pathname);

  switch (router?.pathname) {
    case "/rarityland":
      return (
        <div className="flex flex-col items-center my-14 z-50 text-white text-left">
          <h2 className="py-8 text-4xl font-bold">Stats</h2>

          <div className="w-full flex flex-col items-center pb-10">
            <p className="py-5 text-2xl">
              Your summoner is currently on this land
            </p>
            <SaveImage imageUrl={stats?.summonerOnLandImage} />
          </div>

          <div className="w-full flex flex-col items-center">
            <p className="py-5 text-2xl">Your Land Statistics</p>
            <SaveImage imageUrl={stats?.landImage} />
          </div>

          <div className="grid lg:grid-cols-3 grid-cols-2 gap-5 mt-10">
            {Object.keys(stats).map((st, index) => {
              switch (st) {
                case "landImage":
                  return null;

                case "summonerOnLandImage":
                  return null;

                case "isLandPublic":
                  return (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-md px-5 pb-4 pt-3"
                    >
                      <p className="font-bold text-xl">
                        {languagePack?.stats[st]}
                      </p>
                      <p className="py-2">{stats[st] ? "Public" : "Private"}</p>
                    </div>
                  );

                case "getLandFee":
                  return (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-md px-5 pb-4 pt-3"
                    >
                      <p className="font-bold text-xl">
                        {languagePack?.stats[st]}
                      </p>
                      <p className="py-2">
                        {stats[st]
                          ? `${stats[st]} FTM`
                          : "Land is not for sale"}
                      </p>
                    </div>
                  );

                case "getLandIncome":
                  return (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-md px-5 pb-4 pt-3"
                    >
                      <p className="font-bold text-xl">
                        {languagePack?.stats[st]}
                      </p>
                      <p className="py-2">{stats[st]} FTM</p>
                    </div>
                  );

                case "isLandOwned":
                  return (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-md px-5 pb-4 pt-3"
                    >
                      <p className="font-bold text-xl">
                        {languagePack?.stats[st]}
                      </p>
                      <p className="py-2">{stats[st] && "Claimed"}</p>
                    </div>
                  );

                case "getLandSummoners":
                  return (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-md px-5 pb-4 pt-3"
                    >
                      <p className="font-bold text-xl">
                        {languagePack?.stats[st]}
                      </p>
                      <p className="py-2">{stats[st]} Summoners</p>
                    </div>
                  );

                case "summonerCoord":
                  return (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-md px-5 pb-4 pt-3"
                    >
                      <p className="font-bold text-xl">
                        {languagePack?.stats[st]}
                      </p>
                      <p className="py-2">
                        ({parseInt(stats[st].x, 10)},{" "}
                        {parseInt(stats[st].y, 10)})
                      </p>
                    </div>
                  );

                case "landCoord":
                  return (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-md px-5 pb-4 pt-3"
                    >
                      <p className="font-bold text-xl">
                        {languagePack?.stats[st]}
                      </p>
                      <p className="py-2">
                        ({parseInt(stats[st].x, 10)},{" "}
                        {parseInt(stats[st].y, 10)})
                      </p>
                    </div>
                  );

                default:
                  return (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-md px-5 pb-4 pt-3"
                    >
                      <p className="font-bold text-xl">
                        {languagePack?.stats[st]}
                      </p>
                      <p className="py-2">{stats[st]}</p>
                    </div>
                  );
              }
            })}
          </div>
        </div>
      );

    default:
      return (
        <div className="flex flex-col items-center my-14 z-50 text-white text-left">
          <h2 className="py-8 text-4xl font-bold">Stats</h2>

          <div className="grid lg:grid-cols-3 grid-cols-2 gap-5 mt-10">
            {Object.keys(stats).map((st, index) => {
              switch (st) {
                case "landImage":
                  return null;

                case "summonerOnLandImage":
                  return null;

                case "image":
                  return null;

                case "isLandPublic":
                  return (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-md px-5 pb-4 pt-3"
                    >
                      <p className="font-bold text-xl">
                        {languagePack?.stats[st]}
                      </p>
                      <p className="py-2">{stats[st] ? "Public" : "Private"}</p>
                    </div>
                  );

                case "getLandFee":
                  return (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-md px-5 pb-4 pt-3"
                    >
                      <p className="font-bold text-xl">
                        {languagePack?.stats[st]}
                      </p>
                      <p className="py-2">
                        {stats[st]
                          ? `${stats[st]} FTM`
                          : "Land is not for sale"}
                      </p>
                    </div>
                  );

                case "getLandIncome":
                  return (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-md px-5 pb-4 pt-3"
                    >
                      <p className="font-bold text-xl">
                        {languagePack?.stats[st]}
                      </p>
                      <p className="py-2">{stats[st]} FTM</p>
                    </div>
                  );

                case "isLandOwned":
                  return (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-md px-5 pb-4 pt-3"
                    >
                      <p className="font-bold text-xl">
                        {languagePack?.stats[st]}
                      </p>
                      <p className="py-2">{stats[st] && "Claimed"}</p>
                    </div>
                  );

                case "getLandSummoners":
                  return (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-md px-5 pb-4 pt-3"
                    >
                      <p className="font-bold text-xl">
                        {languagePack?.stats[st]}
                      </p>
                      <p className="py-2">{stats[st]} Summoners</p>
                    </div>
                  );

                case "summonerCoord":
                  return (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-md px-5 pb-4 pt-3"
                    >
                      <p className="font-bold text-xl">
                        {languagePack?.stats[st]}
                      </p>
                      <p className="py-2">
                        ({parseInt(stats[st].x, 10)},{" "}
                        {parseInt(stats[st].y, 10)})
                      </p>
                    </div>
                  );

                case "landCoord":
                  return (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-md px-5 pb-4 pt-3"
                    >
                      <p className="font-bold text-xl">
                        {languagePack?.stats[st]}
                      </p>
                      <p className="py-2">
                        ({parseInt(stats[st].x, 10)},{" "}
                        {parseInt(stats[st].y, 10)})
                      </p>
                    </div>
                  );

                default:
                  return (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-md px-5 pb-4 pt-3"
                    >
                      <p className="font-bold text-xl">
                        {languagePack?.stats[st]}
                      </p>
                      <p className="py-2">{stats[st]}</p>
                    </div>
                  );
              }
            })}
          </div>
        </div>
      );
  }
};

export default StatisticsCard;
