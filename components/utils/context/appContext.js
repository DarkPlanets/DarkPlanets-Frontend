import React, { useState, createContext, useEffect } from "react";
import { useContract } from "../hooks/useContract";
import {
  LAND_NAME,
  RARITY_GOLD,
  RARITY,
  RARITY_LAND_TICKET,
  DARK_PLANET,
  RARITY_LAND,
  RARITY_LAND_STORAGE,
  DARK_PLANET_DXP,
} from "../constants";

import * as LanguagePack from "../languages";
import RARITY_ABI from "../abis/rarity.json";
import RARITY_GOLD_ABI from "../abis/raritygold.json";
import LAND_NAME_ABI from "../abis/landnames.json";
import DARK_PLANET_ABI from "../abis/darkplanet.json";
import RARITY_LAND_ABI from "../abis/rarityland.json";
import RARITY_LAND_TICKET_ABI from "../abis/landtickets.json";
import DARK_PLANET_DXP_ABI from "../abis/darkplanet_dxp.json";
import RARITY_LAND_STORAGE_ABI from "../abis/raritylandstorage.json";

export const AppContext = createContext({});
export const AppProvider = (props) => {
  const contracts = {
    rarity: useContract(RARITY, RARITY_ABI),
    rarity_gold: useContract(RARITY_GOLD, RARITY_GOLD_ABI),
    dark_planet: useContract(DARK_PLANET, DARK_PLANET_ABI),
    dark_planet_dxp: useContract(DARK_PLANET_DXP, DARK_PLANET_DXP_ABI),
    rarity_land: useContract(RARITY_LAND, RARITY_LAND_ABI),
    land_name: useContract(LAND_NAME, LAND_NAME_ABI),
    land_ticket: useContract(RARITY_LAND_TICKET, RARITY_LAND_TICKET_ABI),
    land_storage: useContract(RARITY_LAND_STORAGE, RARITY_LAND_STORAGE_ABI),
  };

  const [appState, setAppState] = useState({
    user: { summonerID: "" },
    language: "en",
  });

  return (
    <AppContext.Provider
      value={{
        currentLang: appState?.language,
        languagePack: LanguagePack.default[appState?.language].default,
        appState,
        contracts,
        setAppState,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
