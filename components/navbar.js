import Web3Handler from "./utils/web3";

function Navbar({ children }) {
  return (
    <div className="bg-gray-900 text-white lg:px-0 px-5">
      <div className="mx-auto container">
        <nav className="py-5 flex flex-row justify-between">
          <p className="font-bold text-xl">Dark Planet</p>
          <div>
            <Web3Handler />
          </div>
        </nav>

        <div>{children}</div>
      </div>
    </div>
  );
}

export default Navbar;
