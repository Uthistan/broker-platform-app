import React from "react";
import { positionsData } from "../data/mockData";

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const totalPNL = positionsData.reduce((sum, pos) => sum + pos.pnl, 0);

const Positions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Positions</h2>
        <table className="min-w-full divide-y divide-gray-200 mb-4">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qty
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avg Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                PNL
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {positionsData.map((pos, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{pos.symbol}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {pos.qty}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {formatCurrency(pos.avgPrice)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {formatCurrency(pos.currentPrice)}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-right ${pos.pnl >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {formatCurrency(pos.pnl)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td
                colSpan={4}
                className="px-6 py-3 text-right font-medium text-gray-500"
              >
                Total PNL
              </td>
              <td
                className={`px-6 py-3 font-medium text-right ${totalPNL >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {formatCurrency(totalPNL)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Positions;
