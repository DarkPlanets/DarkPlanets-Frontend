import Link from "next/link";
import Web3Handler from "./utils/web3";

import { useState } from "react";
import { useRouter } from "next/router";

const RenderButton = ({ setZoneActive, isZoneActive }) => {
  const router = useRouter();

  switch (router.pathname) {
    case "/":
      return (
        <button className="bg-blue-500 px-5 rounded-md py-2" onClick={() => setZoneActive(!isZoneActive)}>
          Enter App
        </button>
      );

    default:
      return <Web3Handler />;
  }
};

const RenderNavigation = ({ attributes }) => {
  const { setActive, isActive, isZoneActive, setZoneActive, navigation } = attributes;

  return (
    <div className="flex flex-row w-full justify-end">
      <div className="lg:flex hidden flex-row space-x-10 justify-items-center items-center">
        {navigation.map((nav, index) => (
          <Link href={nav.url} key={index}>
            <a style={{color: nav.spec ? "#F4D000" : ''}} className="font-bold text-lg">{nav.title}</a>
          </Link>
        ))}

        <RenderButton isZoneActive={isZoneActive} setZoneActive={setZoneActive} />
      </div>

      <div className="lg:hidden flex lg:px-0 px-3">
        <button onClick={() => setActive(!isActive)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const RenderMobileNavigation = ({ attributes }) => {
  const { isActive, isZoneActive, setZoneActive, navigation } = attributes;

  if (isActive)
    return (
      <div className="bg-gray-800 rounded-md space-y-3 py-3 px-3 lg:hidden flex-col flex">
        {navigation.map((nav, index) => (
          <Link href={nav.url} key={index}>
            <a style={{color: nav.spec ? "#F4D000" : ''}} className="text-lg">{nav.title}</a>
          </Link>
        ))}

        <RenderButton isZoneActive={isZoneActive} setZoneActive={setZoneActive} />
      </div>
    );

  return null;
};

const NavBar = ({ children, isZoneActive, setZoneActive, navigation }) => {
  const [isActive, setActive] = useState(false);

  const attributes = {
    setActive: setActive,
    isActive: isActive,
    isZoneActive: isZoneActive,
    setZoneActive: setZoneActive,
    navigation: navigation,
  };

  return (
    <nav className="container mx-auto text-white">
      <div className="flex justify-between items-center">
        <Link href="/">
          <a className="flex flex-row items-center">
            <img src="/logo.png" className="lg:w-24 w-10" />
            <h2 className="font-spacequest lg:text-2xl text-lg">Darkplanets</h2>
          </a>
        </Link>

        <RenderNavigation attributes={attributes} />
      </div>

      <RenderMobileNavigation attributes={attributes} />
      <div>{children}</div>
    </nav>
  );
};

export default NavBar;
