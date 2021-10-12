const Footer = () => {
  return (
    <footer className="py-5 bg-gray-900 text-white flex flex-row justify-center z-50">
      <div className="flex flex-row">
        Made with ❤️
        <div className="px-1 space-x-3">
          <a href="https://twitter.com/helloitsme_sl" className="text-blue-400">
            @helloitsme_sl
          </a>
          <a href="https://twitter.com/geekery_eth" className="text-blue-400">
            @geekery_eth
          </a>
        </div>
      </div>

      <div className="flex flex-row space-x-3 ml-3">
        <p>|</p>
        <p>
          Artwork by
          <a
            href="https://twitter.com/somniumwave"
            className="text-blue-400 ml-2"
          >
            @somniumwave
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
