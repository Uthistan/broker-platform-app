import React from "react";
import { orderbookData } from "../data/mockData";

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const totalPNL = orderbookData.reduce((sum, order) => sum + order.pnl, 0);

const Orderbook: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Orderbook</h2>
        <table className="min-w-full divide-y divide-gray-200 mb-4">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Side
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qty
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                PNL
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orderbookData.map((order, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{order.symbol}</td>
                <td
                  className={`px-6 py-4 whitespace-nowrap font-semibold ${order.side === "Buy" ? "text-green-600" : "text-red-600"}`}
                >
                  {order.side}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {order.qty}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {formatCurrency(order.price)}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-right ${order.pnl >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {formatCurrency(order.pnl)}
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

export default Orderbook;
