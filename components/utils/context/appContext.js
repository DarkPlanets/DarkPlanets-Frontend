import React, { useState, createContext } from "react";
import * as LanguagePack from "../languages";

export const AppContext = createContext({});
export const AppProvider = (props) => {
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
        setAppState,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
