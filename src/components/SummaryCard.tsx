import React from "react";

interface Holding {
  name: string;
  symbol?: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  buyPrice?: number;
}

interface SummaryCardProps {
  data: Holding[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({ data }) => {
  const totalInvestment = data.reduce(
    (sum, h) => sum + h.quantity * (h.buyPrice ?? h.avgPrice),
    0,
  );
  const currentValue = data.reduce(
    (sum, h) => sum + h.quantity * h.currentPrice,
    0,
  );
  const profitLoss = currentValue - totalInvestment;
  const profitLossPercent =
    totalInvestment > 0 ? (profitLoss / totalInvestment) * 100 : 0;
  const isProfit = profitLoss > 0;

  return (
    <div className="bg-white w-xl rounded-lg shadow p-6 mb-6 mx-auto">
      <div className="text-lg font-bold mb-2">Portfolio Summary</div>
      <div className="flex justify-between">
        <div>Total Investment:</div>
        <div className="font-semibold">₹{totalInvestment.toLocaleString()}</div>
      </div>
      <div className="flex justify-between mt-2">
        <div>Current Value:</div>
        <div className="font-semibold">₹{currentValue.toLocaleString()}</div>
      </div>
      <div className="flex justify-between mt-2">
        <div
          className={
            isProfit
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }
        >
          {isProfit ? "Profit:" : "Loss:"}
        </div>
        <div
          className={
            isProfit
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }
        >
          {isProfit ? "+" : "-"}₹{Math.abs(profitLoss).toLocaleString()} (
          {isProfit ? "+" : "-"}
          {Math.abs(profitLossPercent).toFixed(2)}%)
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
