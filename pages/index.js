/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect } from "react";
import toast, { useToasterStore, Toaster } from "react-hot-toast";
import { AppContext } from "../components/utils/context/appContext";

import Head from "next/head";
import Particles from "react-particles-js";
import PlayButton from "../components/playbtn";
import SaveImage from "../components/saveImage";
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

const RenderData = ({ stats, getDarkPlanet }) => {
  const { languagePack } = useContext(AppContext);
  if (stats?.image && stats?.points > 0)
    return (
      <div className="py-10 w-full items-center flex flex-col">
        <SaveImage key="save_image" imageUrl={stats?.image} />
        <PlayButton key="1" stats={stats} getDarkPlanet={getDarkPlanet} />
        <StatisticsCard key="2" stats={stats} />
      </div>
    );
  else if (stats?.points <= 0 && stats?.status < 3)
    return <p className="text-lg">{languagePack?.error?.not_registered}</p>;
  else if (stats?.points <= 0 && stats?.status == 3)
    return <p className="text-lg">{languagePack?.error?.user_eliminated}</p>;

  return null;
};

const Home = () => {
  const { toasts } = useToasterStore();
  const { languagePack } = useContext(AppContext);

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= 3) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

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

          <SummonerIDInput placeholder={languagePack?.indexPage?.input_id}>
            <RenderData />
          </SummonerIDInput>
        </div>

        <Toaster />
      </RenderParticle>
    </div>
  );
};

export default Home;
