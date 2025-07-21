import React from "react";

interface Holding {
  name: string;
  symbol?: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  buyPrice?: number;
}

interface YourHoldingsProps {
  data: Holding[];
  openModal: (action: "buy" | "sell", symbol: string) => void;
}

const YourHoldings: React.FC<YourHoldingsProps> = ({ data, openModal }) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const totalValue = React.useMemo(() => {
    return data.reduce(
      (sum, stock) => sum + stock.quantity * stock.currentPrice,
      0,
    );
  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden pb-8 mt-8">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stock
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Qty
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Avg Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Current Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Value
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((stock, index) => {
              const value = stock.quantity * stock.currentPrice;
              const profitLoss = value - stock.quantity * stock.avgPrice;
              const isProfit = profitLoss >= 0;

              return (
                <tr
                  key={`${stock.symbol || stock.name}-${index}`}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {stock.name}
                    </div>
                    {stock.symbol && (
                      <div className="text-gray-500 text-sm">
                        {stock.symbol}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {stock.quantity.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {formatCurrency(stock.avgPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {formatCurrency(stock.currentPrice)}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap ${
                      isProfit ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {formatCurrency(value)}
                    <div className="text-xs mt-1">
                      {isProfit ? "+" : ""}
                      {formatCurrency(profitLoss)} ({isProfit ? "+" : ""}
                      {(
                        (profitLoss / (stock.quantity * stock.avgPrice)) *
                        100
                      ).toFixed(2)}
                      %)
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          openModal("buy", stock.symbol || stock.name)
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-green-600 mr-2"
                      >
                        Buy
                      </button>
                      <button
                        onClick={() =>
                          openModal("sell", stock.symbol || stock.name)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-red-600"
                      >
                        Sell
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td
                colSpan={5}
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Value
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                {formatCurrency(totalValue)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default YourHoldings;
