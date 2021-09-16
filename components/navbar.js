import { useContext, useState } from "react";
import { AppContext } from "./utils/context/appContext";

import Link from "next/link";
import Web3Handler from "./utils/web3";

const MobileNav = ({ isActive, setActive }) => {
  return (
    <div className="flex flex-col lg:hidden">
      <button onClick={() => setActive(!isActive)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
};

const Navbar = ({ children }) => {
  const [isActive, setActive] = useState(false);
  const { languagePack, setAppState, appState } = useContext(AppContext);

  return (
    <div className="bg-gray-900 text-white lg:px-0 px-5">
      <div className="mx-auto container">
        <nav className="py-5 flex flex-row justify-between items-center">
          <Link href="/">
            <a className="font-bold text-xl">{languagePack?.navbar?.title}</a>
          </Link>
          <div className="hidden lg:flex items-center justify-end space-x-6 w-2/3">
            {languagePack?.navbar?.pages?.map((pageLink, index) => {
              const { title, url } = pageLink;

              return (
                <Link href={url} key={index}>
                  <a>{title}</a>
                </Link>
              );
            })}
            <Web3Handler />
            <select
              name="language"
              onChange={(e) =>
                setAppState({ ...appState, language: e.target.value })
              }
              className="text-black w-1/8 rounded-md py-2 px-2 outline-none"
            >
              <option value="en">English</option>
              <option value="cn">Chinese</option>
              <option value="kr">Korean</option>
              <option value="jp">Japanese</option>
            </select>
          </div>
          <MobileNav setActive={setActive} isActive={isActive} />
        </nav>

        {isActive && (
          <div className="flex flex-col space-y-2 bg-gray-600 p-3 pb-4 lg:hidden">
            {languagePack?.navbar?.pages?.map((pageLink, index) => {
              const { title, url } = pageLink;

              return (
                <Link href={url} key={index}>
                  <a>{title}</a>
                </Link>
              );
            })}

            <div className="pt-5">
              <select
                name="language"
                onChange={(e) =>
                  setAppState({ ...appState, language: e.target.value })
                }
                className="text-black w-2/3 mb-5 rounded-md py-2 px-2"
              >
                <option value="en">English</option>
                <option value="cn">Chinese</option>
                <option value="kr">Korean</option>
                <option value="jp">Japanese</option>
              </select>

              <Web3Handler />
            </div>
          </div>
        )}
        <div className="min-h-screen">{children}</div>
      </div>
    </div>
  );
};

export default Navbar;
