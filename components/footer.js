const socials = [
  { title: "Twitter", url: "https://twitter.com/darkplanet_x_y", image: "/socials/twitter.svg" },
  { title: "Github", url: "https://github.com/DarkPlanets", image: "/socials/github.svg" },
  { title: "Discord", url: "https://discord.gg/2QZx3FBZfX", image: "/socials/discord.svg" },
  { title: "Telegram", url: "#", image: "/socials/telegram.svg" },
  { title: "Medium", url: "https://medium.com/@geekery_eth", image: "/socials/medium.png" },
];

// TEST
const RenderSocials = () => {
  return (
    <div className="flex flex-row space-x-3">
      {socials.map((social, index) => {
        return (
          <a href={social.url} key={index}>
            <img src={social.image} />
          </a>
        );
      })}
    </div>
  );
};

const RenderContact = () => {
  const contacts = ["0x.geekery@darkplanets.world", "codeperfect@darkplanets.world"];

  return (
    <div className="flex flex-col mt-3">
      {contacts.map((contact) => {
        return (
          <div className="flex flex-row space-x-2 mb-2">
            <img src="./socials/hello.svg" className="w-7" />
            <p className="w-1/2 text-white">{contact}</p>
          </div>
        );
      })}
    </div>
  );
};

const Footer = () => {
  return (
    <div className="container mx-auto pt-16">
      <div className="flex lg:flex-row flex-col lg:px-0 px-10 my-10 items-center">
        <div className="lg:w-2/3">
          <img src="./logo.png" className="w-28 -ml-4" />
          <p className="text-white lg:w-1/2">
            DarkPlanet is an independent blockchain game based on the dark forest law based on universe exploration.
          </p>
        </div>

        <section className="lg:space-x-32 w-full lg:w-1/2 flex lg:flex-row flex-col">
          <div className="lg:py-0 py-10">
            <p className="font-bold text-lg" style={{ color: "#85BFD1" }}>
              Contact
            </p>

            <RenderContact />
          </div>

          <div>
            <p className="font-bold text-lg" style={{ color: "#85BFD1" }}>
              Socials
            </p>
            <RenderSocials />
          </div>
        </section>
      </div>

      <footer className="border-t border-gray-700 text-white py-4 text-sm flex justify-between lg:px-0 px-5">
        <p>
          &#169; 2021 <span className="font-spacequest">DARKPLANETS</span>
        </p>
        <p>
          Made with ♥{" "}
          <a href="https://github.com/helloitsm3" className="text-blue-400">
            helloitsm3
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
