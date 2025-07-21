import React, { useState } from "react";
import { useHoldings } from "../context/useHoldings";

interface OrderPadModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: "buy" | "sell";
  symbol?: string;
  symbols?: string[];
  onSymbolChange?: (symbol: string) => void;
  onActionChange?: (action: "buy" | "sell") => void;
}

const OrderPadModal: React.FC<OrderPadModalProps> = ({
  isOpen,
  onClose,
  action: initialAction = "buy",
  symbol = "",
  symbols = [],
  onSymbolChange,
  onActionChange,
}) => {
  const [selectedSymbol, setSelectedSymbol] = useState(symbol);
  const [selectedAction, setSelectedAction] = useState<"buy" | "sell">(
    initialAction
  );
  const { updateHolding } = useHoldings();
  const [quantity, setQuantity] = useState(1);
  const [price] = useState(0);

  React.useEffect(() => {
    setSelectedSymbol(symbol);
  }, [symbol]);

  React.useEffect(() => {
    setSelectedAction(initialAction);
  }, [initialAction]);

  if (!isOpen) return null;
  const actionColor = selectedAction === "buy" ? "bg-green-600" : "bg-red-600";
  const actionText = selectedAction === "buy" ? "Buy" : "Sell";

  const handleSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSymbol(e.target.value);
    if (onSymbolChange) onSymbolChange(e.target.value);
  };

  const handleActionChange = (action: "buy" | "sell") => {
    setSelectedAction(action);
    if (onActionChange) onActionChange(action);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-3xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2
          className={`text-xl font-bold mb-4 ${
            selectedAction === "buy" ? "text-green-700" : "text-red-700"
          }`}
        >
          {actionText} Order
        </h2>
        <div className="mb-4 flex gap-2 items-center">
          <div className="flex w-full bg-gray-200 rounded-xl p-1.5 gap-2">
            <button
              type="button"
              className={`px-5 py-2 w-full rounded-lg focus:outline-none transition font-semibold ${
                selectedAction === "buy"
                  ? "bg-blue-500 text-white"
                  : "bg-transparent text-gray-800"
              }`}
              onClick={() => handleActionChange("buy")}
            >
              Buy
            </button>
            <button
              type="button"
              className={`px-5 py-2 w-full rounded-lg focus:outline-none transition font-semibold ${
                selectedAction === "sell"
                  ? "bg-blue-500 text-white"
                  : "bg-transparent text-gray-800"
              }`}
              onClick={() => handleActionChange("sell")}
            >
              Sell
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Stocks</label>
          <select
            className="w-full p-2 border rounded bg-gray-100"
            value={selectedSymbol}
            onChange={handleSymbolChange}
          >
            {symbols.map((sym) => (
              <option key={sym} value={sym}>
                {sym}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Quantity</label>
          <input
            type="number"
            min={1}
            className="w-full p-2 border rounded"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700 mb-1">Price</label>
          <input
            type="number"
            min={0}
            className="w-full p-2 border rounded"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div> */}
        <button
          className={`w-full ${actionColor} text-white p-2 rounded hover:opacity-90 font-semibold`}
          onClick={() => {
            updateHolding(
              selectedSymbol,
              selectedAction,
              Number(quantity),
              Number(price)
            );
            onClose();
          }}
        >
          {actionText}
        </button>
      </div>
    </div>
  );
};

export default OrderPadModal;
