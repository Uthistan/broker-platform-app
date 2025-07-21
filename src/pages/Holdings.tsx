// import React from "react";
import SummaryCard from "../components/SummaryCard";
import YourHoldings from "../components/YourHoldings";
import { useHoldings } from "../context/useHoldings";

interface HoldingsPageProps {
  openModal: (action: "buy" | "sell", symbol: string) => void;
}

const Holdings = ({ openModal }: HoldingsPageProps) => {
  const { holdings } = useHoldings();

  if (!holdings.length)
    return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <SummaryCard data={holdings} />
      <YourHoldings data={holdings} openModal={openModal} />
    </div>
  );
};

export default Holdings;
