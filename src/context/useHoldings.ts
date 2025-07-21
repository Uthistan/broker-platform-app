import { useContext } from "react";
import { HoldingsContext } from "./HoldingsContext";

export const useHoldings = () => useContext(HoldingsContext); 