import Link from "next/link";

const RenderStats = () => {
  const stats = [
    { title: "1,000", subtitle: "planets" },
    { title: "Randomly", subtitle: "Generated" },
    { title: "Play", subtitle: "To Earn" },
  ];

  return (
    <div className="flex flex-row items-center space-between -mt-52">
      {stats.map((stat, index) => {
        return (
          <div key={index} className="text-white w-full text-center">
            <p className="relative font-speedfreaks text-2xl z-10 text-shadow">{stat.title}</p>
            <p className="relative font-bebasneue text-3xl z-10">{stat.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
};

const RenderProfiles = () => {
  const profiles = [
    {
      title: "Geekery_ETH",
      subtitle:
        "Geekery has led the team to work on this amazing game. He's responsible for creating the smart contract for DarkPlanets and RarityLand which is the core for this play-to-earn game",
      image: "/profiles/geek.jpg",
      twitter: "https://twitter.com/geekery_eth",
    },
    {
      title: "CodePerfect",
      subtitle:
        "CodePerfect is the main frontend developer and is responsible for creating the frontend to interact with the smart contracts.",
      image: "/profiles/codeperfect.jpg",
      twitter: "https://twitter.com/helloitsme_sl",
    },
    {
      title: "Explorer",
      subtitle:
        "Explorer is an awesome community manager who handles anything related to the community. He's responsible for engaging the community.",
      image: "/profiles/explorer.png",
      twitter: "https://twitter.com/darkplanetfans",
    },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-5 mt-10 lg:px-0 px-10" data-aos="fade-up">
      {profiles.map((profile, index) => (
        <div key={index}>
          <img src={profile.image} className="w-2/3 relative z-10" />

          <div className="flex flex-row items-center space-x-2 mt-4 mb-2">
            <p className="font-speedfreaks text-2xl relative z-10">{profile.title}</p>
            <a href={profile.twitter} className={`${profile.twitter || "hidden"}`}>
              <img src="/socials/twitter.svg" className="w-10 relative z-10" />
            </a>
          </div>

          <p className="relative z-10">{profile.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

const RenderPlayZones = () => {
  const playzones = [
    { title: "Dark Planet", description: "Enter dark planet zones", image: "/Frame_1.png", url: "/darkplanet" },
    {
      title: "Rarity Land",
      description: "This will redirect you to the old UI. New UI is currently being developed",
      image: "/Frame_2.png",
      url: "https://darkplanets.vercel.app/rarityland",
    },
    { title: "Rarity", description: "Enter Rarity zones", image: "/Frame_3.png", url: "/rarity" },
    { title: "The DXP", description: "Enter Rarity zones", image: "/Frame_4.png", url: "https://darkplanet-dxp.vercel.app/" },
  ];

  return (
    <div className="flex justify-center">
      <div className="text-white lg:mt-40 mt-10 grid lg:grid-cols-4 grid-cols-1 lg:gap-5 gap-14 md:w-4/5 w-3/5">
        {playzones.map((zone, index) => (
          <Link href={zone.url} key={index}>
            <a className="flex flex-col items-center justify-center">
              <img src={zone.image} className={`lg:w-40 w-40 lg:h-40 h-20 ${zone.title === "Dark Planet" && "darkplanet_image"}`} />
              <p className="font-bebasneue lg:text-5xl text-4xl mt-5">{zone.title}</p>
              <p className="text-md h-20">{zone.description}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { RenderProfiles, RenderStats, RenderPlayZones };
