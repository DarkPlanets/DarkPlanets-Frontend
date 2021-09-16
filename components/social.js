/* eslint-disable @next/next/no-img-element */
const Social = () => {
  return (
    <div className="absolute flex flex-col text-white bottom-0 right-0 p-8 space-y-3 w-28">
      <a href="https://discord.gg/2QZx3FBZfX" target="_blank" rel="noreferrer">
        <img src="/socials/discord.svg" alt="discord" />
      </a>

      <a
        href="https://twitter.com/helloitsme_sl"
        target="_blank"
        rel="noreferrer"
      >
        <img src="/socials/twitter.svg" alt="twitter" />
      </a>

      <a href="https://github.com/DarkPlanets" target="_blank" rel="noreferrer">
        <img src="/socials/github.svg" alt="github" />
      </a>
    </div>
  );
};

export default Social;
