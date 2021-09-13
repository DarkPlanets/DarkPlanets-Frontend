import { useState, useEffect } from "react";
import { injected } from "./connectors";
import { useEagerConnect } from "./hooks/useEagerConnect";
import { useInactiveListener } from "./hooks/useInactiveListener";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";

const connectorsByName = {
  Injected: injected,
  //   Network: network,
};

function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

function Account() {
  const { account } = useWeb3React();

  return (
    <>
      <span role="img" aria-label="robot">
        🤖
      </span>
      <span>
        {account === null
          ? "-"
          : account
          ? `${account.substring(0, 6)}...${account.substring(
              account.length - 4
            )}`
          : ""}
      </span>
    </>
  );
}

function Header() {
  const { active, error } = useWeb3React();

  return (
    <div className="flex flex-row space-x-4 border border-white rounded-md px-3 py-2">
      <Account />
      <h1>{active ? "🟢" : error ? "🔴" : "🟠"}</h1>
    </div>
  );
}

const Web3Handler = () => {
  const context = useWeb3React();
  const { error, active, activate, connector, deactivate } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <>
      <div className="flex flex-row space-x-5">
        {active ? (
          <Header />
        ) : (
          <div>
            {Object.keys(connectorsByName).map((name) => {
              const currentConnector = connectorsByName[name];
              const connected = currentConnector === connector;
              const disabled =
                !triedEager || !!activatingConnector || connected || !!error;

              return (
                <button
                  className="border border-white rounded-md px-3 py-2"
                  disabled={disabled}
                  key={name}
                  onClick={() => {
                    setActivatingConnector(currentConnector);
                    activate(connectorsByName[name]);
                  }}
                >
                  Login using Metamask
                </button>
              );
            })}
          </div>
        )}
        <div className="flex justify-center">
          {(active || error) && (
            <button
              className="rounded-md px-3 bg-red-600"
              onClick={() => {
                deactivate();
              }}
            >
              Logout
            </button>
          )}

          {!!error && <h4>{getErrorMessage(error)}</h4>}
        </div>
      </div>
    </>
  );
};

export default Web3Handler;
