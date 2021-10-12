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

        <div className="lg:w-1/2 w-full">
          <StatisticsCard key="2" stats={stats} />
        </div>
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
    <div className="bg-gray-900">
      <Head>
        <title>Dark Planets</title>
      </Head>

      <div
        className="flex bg-blue-100 rounded-lg p-4 mb-4 my-5 text-sm text-blue-700"
        role="alert"
      >
        <svg
          className="w-5 h-5 inline mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div>
          <span className="font-medium">Please Read!</span> All planet has been
          successfully claimed. If you would like to play, please head over to
          RarityLand. Thank you!
        </div>
      </div>

      <RenderParticle>
        <div className="flex flex-col justify-center items-center h-full py-16">
          <div className="py-14 z-50 bg-gray-900">
            {/* <h1 className="font-extrabold text-6xl text-center">
              {languagePack?.indexPage?.title}
            </h1> */}

            <div className="w-full flex flex-col items-center">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="mix-blend-lighten w-8/12 -mt-14"
              >
                <source src="/planets/newplanet.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div className="w-full -mt-16 z-50 items-center flex flex-col">
            <GetGlobalStats />

            <SummonerIDInput placeholder={languagePack?.indexPage?.input_id}>
              <RenderData />
            </SummonerIDInput>
          </div>
        </div>

        <Toaster />
      </RenderParticle>
    </div>
  );
};

export default Home;
