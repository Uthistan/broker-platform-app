import React, { createContext, useState, useEffect } from "react";

export interface Holding {
  name: string;
  symbol?: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  buyPrice?: number;
}

type HoldingsContextType = {
  holdings: Holding[];
  symbols: string[];
  updateHolding: (
    symbol: string,
    action: "buy" | "sell",
    quantity: number,
    price: number
  ) => void;
};

const HoldingsContext = createContext<HoldingsContextType>({
  holdings: [],
  symbols: [],
  updateHolding: () => {},
});

export { HoldingsContext };

export const HoldingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [symbols, setSymbols] = useState<string[]>([]);

  useEffect(() => {
    fetch("/holdings.json")
      .then((res) => res.json())
      .then((data) => {
        setHoldings(data);
        setSymbols(
          Array.from(new Set(data.map((h: Holding) => h.symbol || h.name) as string[])).sort()
        );
      });
  }, []);

  const updateHolding = (
    symbol: string,
    action: "buy" | "sell",
    quantity: number,
    price: number
  ) => {
    setHoldings((prev) =>
      prev.map((h) => {
        if ((h.symbol || h.name) === symbol) {
          if (action === "buy") {
            const newQty = h.quantity + quantity;
            const newAvgPrice =
              newQty > 0 ? (h.avgPrice * h.quantity + price * quantity) / newQty : h.avgPrice;
            return { ...h, quantity: newQty, avgPrice: newAvgPrice };
          } else {
            const newQty = Math.max(h.quantity - quantity, 0);
            return { ...h, quantity: newQty };
          }
        }
        return h;
      })
    );
  };

  return (
    <HoldingsContext.Provider value={{ holdings, symbols, updateHolding }}>
      {children}
    </HoldingsContext.Provider>
  );
}; 