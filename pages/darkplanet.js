import axios from "axios";
import Footer from "../components/footer";

import { formatEther, parseUnits } from "ethers/lib/utils";
import { useWeb3React } from "@web3-react/core";
import { Loader } from "../components/loadingscreen";
import { useEffect, useState, useContext } from "react";
import { base64ToJson } from "../components/utils/constants";
import { AppContext } from "../components/utils/context/appContext";

const RenderPlanetImage = ({ all_data }) => {
  const [isLoaded, setLoaded] = useState(false);

  const handleOnLoad = () => {
    setLoaded(true);
  };

  const handleOnError = (e) => {
    e.target.onerror = null;
    e.target.src = all_data.image;
  };

  return (
    <div>
      {!isLoaded && <Loader />}
      <img src={all_data.image} className="w-40" onLoad={handleOnLoad} onError={handleOnError} />
    </div>
  );
};

const RenderPlanet = ({ stats, dark_planet }) => {
  const { account } = useWeb3React();
  const planetArray = stats?.planet;
  const statistics = stats?.stats;
  const claimFee = statistics?.getClaimFee;

  const _mint = async () => {
    const estimateClaim = await dark_planet.provider.estimateGas({
      value: parseUnits(claimFee),
    });

    return await dark_planet.claim({
      value: parseUnits(claimFee),
      gasLimit: parseInt(estimateClaim, 10) + 500000,
    });
  };

  if (account) {
    if (planetArray?.length > 0) {
      return (
        <div>
          <button onClick={_mint} className="mt-5 bg-blue-500 px-10 py-3 rounded-md">
            Mint a planet
          </button>

          {planetArray.map((stat, index) => {
            const [all_data] = stat;

            return (
              <div key={index} className="flex flex-row space-x-5 my-5">
                <RenderPlanetImage all_data={all_data} />
                <div>
                  <p className="text-xl font-bold capitalize">{all_data.name}</p>
                  <p className="mt-3 w-1/2">{all_data.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (statistics?.getCurrentSupply && statistics?.getMaxPlanet) {
      if (statistics?.getCurrentSupply <= statistics?.getMaxPlanet) {
        return (
          <div className="text-white flex justify-center mt-40 flex-col items-center">
            <p className="text-xl">You do not seem to have minted any planet. You can claim a planet by clicking on the button below.</p>
            <button onClick={_mint} className="mt-5 bg-blue-500 px-10 py-3 rounded-md">
              Mint a planet
            </button>
          </div>
        );
      } else {
        return (
          <div className="text-white flex justify-center mt-40 flex-col items-center">
            <p className="text-xl">Unfortunately, all planets have been minted! Do follow us on social media to keep a look out for v3</p>
          </div>
        );
      }
    } else {
      return (
        <div className="text-white flex justify-center mt-40 flex-col items-center">
          <p className="text-xl">Loading...</p>
        </div>
      );
    }
  } else {
    return (
      <div className="text-white flex justify-center mt-40 flex-col items-center">
        <p className="text-xl">Please login to your metamask to start playing</p>
      </div>
    );
  }
};

const RenderStats = ({ stats }) => {
  const statistics = stats?.stats;
  if (stats) {
    return (
      <div>
        <p>
          Minted: {statistics?.getCurrentSupply} / {statistics?.getMaxPlanet}
        </p>
        <p>Claim Fee: {statistics?.getClaimFee} FTM</p>
      </div>
    );
  }

  return null;
};

const DarkPlanet = ({ transactions }) => {
  const { account } = useWeb3React();
  const { contracts } = useContext(AppContext);
  const { dark_planet } = contracts;
  const [userData, setUserData] = useState({});

  useEffect(async () => {
    if (dark_planet) {
      // This will fetch all statistics from Dark Planet contract
      const stats = {
        getMaxPlanet: parseInt(await dark_planet.maxPlanets(), 10),
        getClaimFee: formatEther(await dark_planet.getClaimFee(), 10),
        getCurrentSupply: parseInt(await dark_planet.totalSupply(), 10),
      };

      let user_planets = await Promise.all(
        transactions
          ?.filter(
            (transaction) =>
              transaction.to.toLowerCase() === account.toLowerCase() &&
              transaction.contractAddress.toLowerCase() === dark_planet.address.toLowerCase() &&
              transaction.from.toLowerCase() === "0x0000000000000000000000000000000000000000".toLowerCase()
          )
          .map(async (transaction) => {
            let temp_data = [];
            return [...temp_data, base64ToJson(await dark_planet.tokenURI(transaction.tokenID))];
          })
      );

      setUserData({ ...userData, stats, planet: user_planets });
    }
  }, [dark_planet]);

  return (
    <div>
      <div className="container mx-auto text-white min-h-screen">
        <RenderStats stats={userData} dark_planet={dark_planet} />
        <RenderPlanet stats={userData} dark_planet={dark_planet} />
      </div>

      <Footer />
    </div>
  );
};

export default DarkPlanet;
export async function getServerSideProps() {
  return axios
    .get("https://api.ftmscan.com/api", {
      params: {
        module: "account",
        action: "tokennfttx",
        contractaddress: "0x959cE21bCA24De6Ae331c95f6a9B459173CB69F4",
        page: 1,
        offset: 10000,
        sort: "desc",
        apikey: process.env.DP_FTMSCAN_API,
      },
    })
    .then(function (response) {
      return { props: { transactions: response.data.result } };
    });
}
