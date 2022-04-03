import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

// Page Option between COINS & STOCKS (Set Default as COINS)
const CryptoContext = ({ children }) => {
  const [tablePage, setPage] = useState("COINS");
  const [symbol, setSymbol] = useState("COINS");

  useEffect(() => {
    if (tablePage === "COINS") setSymbol("COINS");
    else if (tablePage === "STOCKS") setSymbol("STOCKS");
  }, [tablePage]);

  return (
    <Crypto.Provider value={{ tablePage, setPage, symbol }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
