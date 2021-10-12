/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { utils } from "ethers";
import { useContract } from "../utils/hooks/useContract";
import {
  RARITY_LAND_CONTRACT,
  TICKET_CONTRACT,
  base64ToJson,
} from "../utils/constants";

import Web3 from "web3";
import RARITY_LAND_ABI from "../utils/abis/rarityland.json";
import RARITY_LAND_TICKET_ABI from "../utils/abis/landtickets.json";

const RarityLand = ({
  image,
  landOwn,
  appState,
  landStats,
  summonerId,
  setAppState,
}) => {
  const web3 = new Web3(Web3.givenProvider);
  const sumId = parseInt(summonerId, 10);
  const rarity_land = useContract(RARITY_LAND_CONTRACT, RARITY_LAND_ABI);
  const ticket_contract = useContract(TICKET_CONTRACT, RARITY_LAND_TICKET_ABI);

  useEffect(async () => {
    setAppState({
      ...appState,
      rarityLand: {
        ...appState?.rarityLand,
        isMoveDisabled: true,
        isLandSetDisabled: true,
        isLandPublic: landStats?.isLandPublic,
      },
    });
  }, []);

  const _setLandFee = async () => {
    const landFee = utils.parseUnits(appState?.rarityLand?.landFee);

    try {
      const estimateClaim = await rarity_land.estimateGas.setLandFee(
        sumId,
        landFee
      );

      await rarity_land.setLandFee(sumId, landFee, {
        gasLimit: parseInt(estimateClaim, 16) + 200000,
      });
    } catch (err) {
      if (err?.data?.message?.includes("no owner")) {
        setAppState({
          ...appState,
          errorMsg: "You are not the owner of this land!",
        });
      }
    }
  };

  const _setLandstate = async () => {
    const states = {
      ...appState?.rarityLand,
      isLandPublic: !appState?.rarityLand?.isLandPublic,
    };

    const estimateClaim = await rarity_land.estimateGas.setLandState(
      sumId,
      !appState?.rarityLand?.isLandPublic
    );

    await rarity_land.setLandState(sumId, !appState?.rarityLand?.isLandPublic, {
      gasLimit: parseInt(estimateClaim, 16) + 200000,
    });

    setAppState({ ...appState, rarityLand: states });
  };

  const _setNewLandImage = async () => {
    const { tokenURI, getSummonerCoordinates } = rarity_land;
    const _getSummonerCoord = await getSummonerCoordinates(summonerId);
    const _summonerOnLandTokenId = Math.floor(
      parseInt(_getSummonerCoord["x"], 10) / 1000
    );
    const stats = {
      ...appState?.stats,
      summonerCoord: _getSummonerCoord,
      summonerOnLandImage: base64ToJson(await tokenURI(_summonerOnLandTokenId))[
        "image"
      ],
    };

    if (_getSummonerCoord[0]) {
      setAppState({
        ...appState,
        stats,

        errorMsg: "Sorry, you've already claimed a land!",
      });
    } else {
      setAppState({
        ...appState,
        stats,

        errorMsg: "",
      });
    }
  };

  const _move = async () => {
    const { moveCoordX, moveCoordY } = appState?.rarityLand;

    if (moveCoordX && moveCoordY) {
      const ticketCost = await ticket_contract.getMoveTickets(
        parseInt(summonerId, 10),
        moveCoordX,
        moveCoordY
      );

      const formatedPrice = utils.formatEther(
        parseInt(ticketCost, 10).toString()
      );

      const estimateGas = await rarity_land.provider.estimateGas(
        summonerId,
        moveCoordX,
        moveCoordY,
        { value: utils.parseEther(formatedPrice) }
      );

      return await rarity_land
        .move(summonerId, moveCoordX, moveCoordY, {
          gasLimit: parseInt(estimateGas, 16) + 200000,
          value: utils.parseEther(formatedPrice),
        })
        .then(async ({ hash }) => {
          setAppState({ ...appState, isMoveLoading: true });
          const transactionReceiptAsync = function (resolve, reject) {
            web3.eth.getTransactionReceipt(hash, (error, receipt) => {
              if (error) {
                reject(error);
              } else if (receipt == null) {
                setTimeout(
                  () => transactionReceiptAsync(resolve, reject),
                  1000
                );
              } else {
                resolve(receipt);
              }
            });
          };

          return new Promise(transactionReceiptAsync);
        })
        .then(() => {
          setTimeout(async () => {
            _setNewLandImage();
            setAppState({
              ...appState,
              isMoveLoading: false,
              rarityLand: {
                ...appState?.rarityLand,
                moveErrorMsg: "",
              },
            });
          }, 30000);
        })
        .catch((err) =>
          setAppState({
            ...appState,
            isMoveLoading: false,
            rarityLand: {
              ...appState?.rarityLand,
              moveErrorMsg: "",
            },
          })
        );
    } else {
      setAppState({
        ...appState,
        isMoveLoading: false,
        rarityLand: {
          ...appState?.rarityLand,
          moveErrorMsg: "Land is currently not available for sale!",
        },
      });
    }
  };

  return (
    <div className="w-full lg:mt-0 mt-10">
      {/* <h3 className="text-4xl font-bold">Rarity Land</h3> */}
      {image && landOwn && (
        <div className="flex flex-row space-x-5 mt-10 w-full justify-between lg:px-0 px-10">
          <p className="text-2xl">Land State: </p>

          <div className="flex flex-row items-center space-x-5">
            <p>Private</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={appState?.rarityLand?.isLandPublic || false}
                onChange={(e) => {
                  _setLandstate().then(() => {
                    setAppState({
                      ...appState,
                      isMoveLoading: false,
                      rarityLand: {
                        ...appState?.rarityLand,
                        isLandPublic: e.target.checked,
                      },
                    });
                  });
                }}
              />
              <span className="slider round"></span>
            </label>
            <p>Public</p>
          </div>
        </div>
      )}

      {/* SET LAND FEE INPUT */}
      {image && landOwn && (
        <div className="mt-5 lg:px-0 px-10 pb-5 lg:pb-0">
          <div className="flex lg:space-x-5 lg:flex-row flex-col">
            <input
              value={appState?.rarityLand?.landFee || ""}
              className="text-black w-full rounded-md py-2 px-3 lg:my-0 my-3"
              name="setLandfee"
              placeholder="Set Land Fee..."
              onChange={(e) => {
                let state = {};
                var regex = /^(0|[1-9]\d*)(\.\d+)?$/gm;

                if (regex.test(e.target.value)) {
                  state = {
                    ...appState?.rarityLand,
                    landFee: e.target.value,
                    isLandSetDisabled: false,
                  };

                  setAppState({
                    ...appState,
                    landFeeerrorMsg: "",
                    rarityLand: state,
                  });
                } else {
                  state = {
                    ...appState?.rarityLand,
                    landFee: e.target.value,
                    isLandSetDisabled: true,
                  };
                  setAppState({
                    ...appState,
                    landFeeerrorMsg: "Please input a numeric value",
                    rarityLand: state,
                  });
                }
              }}
            />
            <button
              onClick={_setLandFee}
              disabled={appState?.rarityLand?.isLandSetDisabled}
              className={`py-2 px-4 lg:w-1/3 w-full ${
                appState?.rarityLand?.isLandSetDisabled
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-500"
              } rounded-md`}
            >
              Set Land Fee
            </button>
          </div>
          <p className="text-left text-red-500 mt-2 mb-3">
            {appState?.landFeeerrorMsg}
          </p>
        </div>
      )}

      {/* MOVE INPUT */}
      <div className="mt-5 lg:px-0 px-10">
        <div className="flex lg:space-x-5 lg:flex-row flex-col space-y-3 lg:space-y-0">
          <input
            value={appState?.rarityLand?.moveCoordX || ""}
            className="text-black w-full rounded-md py-2 px-3"
            name="moveCoordX"
            placeholder="X coordinate..."
            onChange={(e) => {
              let state = {};
              const trimmed_val = e.target.value.replace(/[^0-9]/g, "");
              const isLandDis = !(
                appState?.rarityLand?.moveCoordY && trimmed_val !== ""
              );

              if (e.target.value.length === trimmed_val.length) {
                state = {
                  ...appState.rarityLand,
                  isMoveDisabled: isLandDis,
                  moveCoordX: trimmed_val,
                  moveErrorMsg: "",
                };

                setAppState({ ...appState, rarityLand: state });
              } else {
                state = {
                  ...appState.rarityLand,
                  isMoveDisabled: isLandDis,
                  moveErrorMsg: "Please input a numeric value",
                };

                setAppState({ ...appState, rarityLand: state });
              }
            }}
          />

          <input
            value={appState?.rarityLand?.moveCoordY || ""}
            className="text-black w-full rounded-md py-2 px-3"
            name="moveCoordY"
            placeholder="Y coordinate..."
            onChange={(e) => {
              let state = {};
              const trimmed_val = e.target.value.replace(/[^0-9]/g, "");
              const isLandDis = !(
                appState?.rarityLand?.moveCoordX && trimmed_val !== ""
              );

              if (e.target.value.length === trimmed_val.length) {
                state = {
                  ...appState?.rarityLand,
                  isMoveDisabled: isLandDis,
                  moveCoordY: trimmed_val,
                  moveErrorMsg: "",
                };

                setAppState({ ...appState, rarityLand: state });
              } else {
                state = {
                  ...appState?.rarityLand,
                  isMoveDisabled: isLandDis,
                  moveErrorMsg: "Please input a numeric value",
                };

                setAppState({ ...appState, rarityLand: state });
              }
            }}
          />
          <button
            onClick={_move}
            disabled={appState?.rarityLand?.isMoveDisabled}
            className={`py-2 px-4 lg:w-1/3 w-full ${
              appState?.rarityLand?.isMoveDisabled
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-500"
            } rounded-md`}
          >
            Move
          </button>
        </div>
        <p className="text-left text-red-500 mt-2 mb-3">
          {appState?.rarityLand?.moveErrorMsg}
        </p>

        <div className="flex lg:space-x-5 lg:flex-row flex-col space-y-3 lg:space-y-0 items-center pt-5">
          <p>Summoner Current Position: </p>
          <p className="bg-gray-600 px-5 rounded-md py-2">
            X: {parseInt(appState?.stats?.summonerCoord.x, 10)}
          </p>
          <p className="bg-gray-600 px-5 rounded-md py-2">
            Y: {parseInt(appState?.stats?.summonerCoord.y, 10)}
          </p>
        </div>
      </div>
      <style global jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        /* Hide default HTML checkbox */
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        /* The slider */
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        input:checked + .slider {
          background-color: #2196f3;
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #2196f3;
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(26px);
          -ms-transform: translateX(26px);
          transform: translateX(26px);
        }

        /* Rounded sliders */
        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default RarityLand;
