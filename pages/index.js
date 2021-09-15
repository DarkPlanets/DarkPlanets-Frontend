/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import { AppContext } from "../components/utils/context/appContext";

import Head from "next/head";
import Particles from "react-particles-js";
import StatisticsCard from "../components/StatisticsCard";
import GetGlobalStats from "../components/getGlobalStats";
import SummonerIDInput from "../components/SummonerIDInput";

const RenderParticle = ({ children }) => (
  <div className="relative w-full h-full z-0">
    <Particles
      params={{
        particles: {
          number: {
            value: 10,
            density: {
              enable: true,
              value_area: 1000,
            },
          },
          line_linked: {
            enable: false,
          },
          move: {
            speed: 0.5,
          },
          shape: {
            type: ["image"],
            image: [
              {
                src: "/planets/planet01.png",
                height: 20,
                width: 20,
              },
              {
                src: "/planets/planet02.png",
                height: 20,
                width: 20,
              },
              {
                src: "/planets/planet03.png",
                height: 20,
                width: 20,
              },
              {
                src: "/planets/planet04.png",
                height: 20,
                width: 20,
              },
              {
                src: "/planets/planet05.png",
                height: 20,
                width: 20,
              },
              {
                src: "/planets/planet06.png",
                height: 20,
                width: 20,
              },
              {
                src: "/planets/planet07.png",
                height: 20,
                width: 20,
              },
              {
                src: "/planets/planet08.png",
                height: 20,
                width: 20,
              },
            ],
          },
          color: {
            value: "#CCC",
          },
          size: {
            value: 20,
            random: false,
          },
        },
        retina_detect: false,
      }}
      className="absolute w-full h-2/3 z-0"
    />
    {children}
  </div>
);

const Home = () => {
  const { languagePack } = useContext(AppContext);

  return (
    <div>
      <Head>
        <title>Dark Planets</title>
      </Head>

      <RenderParticle>
        <div className="flex flex-col justify-center items-center h-full py-16">
          <div className="py-14 pb-20 z-50">
            <h1 className="font-extrabold text-6xl text-center">
              {languagePack?.indexPage?.title}
            </h1>

            <GetGlobalStats />
          </div>

          <SummonerIDInput>
            <StatisticsCard />
          </SummonerIDInput>
        </div>
      </RenderParticle>
    </div>
  );
};

export default Home;
