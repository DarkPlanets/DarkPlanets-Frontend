import Footer from "../components/footer";
import NavBar from "../components/navbar";
import Carousel from "../components/carousel";

import { useState } from "react";
import { RenderProfiles, RenderStats, RenderPlayZones } from "../components/utilFunc";

const navigation = [
  { title: "About", url: "#about" },
  { title: "Team", url: "#team" },
  { title: "Roadmap", url: "#roadmap" },
  { title: "Finance", url: "https://darkplanet-finance.vercel.app/", spec: true },
];

const Index = () => {
  const [isZoneActive, setZoneActive] = useState(false);

  return (
    <div className="min-h-screen bg-gray-800">
      <div className="video-container">
        <video autoPlay muted loop>
          <source src="/planets/wallpaper.mp4" type="video/mp4" />
        </video>
        <div className="caption">
          <NavBar isZoneActive={isZoneActive} setZoneActive={setZoneActive} navigation={navigation} />

          {isZoneActive && <RenderPlayZones />}
        </div>
      </div>

      <section>
        <img src="redsmoke.png" className="relative lg:-mt-44 -mt-14 w-screen z-0" />
        <div className="container mx-auto my-24 px-10">
          <RenderStats />
        </div>
      </section>

      <section id="about" className="container mx-auto text-white my-10 flex flex-row items-center justify-center mt-52 space-x-24">
        <div className="lg:w-1/2 lg:px-0 px-10" data-aos="fade-right">
          <h2 className="font-speedfreaks text-6xl">About</h2>
          <p className="font-speedfreaks mt-2 text-2xl">So what is Darkplanet all about?</p>
          <p className="mt-5">
            DarkPlanet is an independent blockchain game based on the dark forest law based on universe exploration. The game is based on
            Fantom (other chains will be expanded later), and the game integrates Andre Cronje &apos;s Rarity contract . Players can use the
            rare hero characters they have acquired to occupy the planet. The game sets a variety of game attributes such as adventure,
            exploration, and survival strategies. It is one of the few sci-fi style macro-universe survival strategy games in the block
            chain game. In the game, players need to occupy New planet, protect your planet, and plunder the energy of other planets as much
            as possible, and constantly upgrade the energy technology level of the planet to fight against unknown high-dimensional attacks.
            The game is inspired by Chinese writer Liu Cixin Science fiction series &apos;The Three Body Problem&apos;.
          </p>
        </div>

        <img src="/planets/planet.png" className="lg:block hidden w-1/4" data-aos="fade-left" />
      </section>

      <section className="text-white pt-40">
        <Carousel />
      </section>

      <section id="team" className="text-white py-40">
        <div className="flex justify-center flex-col items-center container mx-auto z-10">
          <h2 className="font-speedfreaks text-6xl">Team</h2>
          <p className="font-speedfreaks text-xl">Come meet the members behind the scenes</p>
          <RenderProfiles />
        </div>
        <img src="/redheart.png" className="min-w-screen relative z-0 -mt-96 lg:block hidden" />
      </section>

      <section id="roadmap" className="text-white py-10 lg:px-0 px-10 items-center justify-center flex">
        <img src="/roadmap.png" className="w-2/3" />
      </section>

      <Footer />
    </div>
  );
};

export default Index;
