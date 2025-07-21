import React from "react";

interface Holding {
  name: string;
  symbol?: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
}

interface Props {
  holdingsData: Holding[];
}
const HoldingsTable = ({ holdingsData }: Props) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const totalValue = React.useMemo(() => {
    return holdingsData.reduce(
      (sum, stock) => sum + stock.quantity * stock.currentPrice,
      0
    );
  }, [holdingsData]);

  return (
    <div
      style={{
        maxHeight: "440px",
        overflowY: "auto",
        border: "1px solid #ddd",
        borderRadius: "4px",
        marginTop: "20px",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead
          style={{
            position: "sticky",
            top: 0,
            background: "#f8f9fa",
            zIndex: 1,
          }}
        >
          <tr>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                borderBottom: "1px solid #ddd",
              }}
            >
              Name
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "center",
                borderBottom: "1px solid #ddd",
              }}
            >
              Quantity
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "right",
                borderBottom: "1px solid #ddd",
              }}
            >
              Avg Price
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "right",
                borderBottom: "1px solid #ddd",
              }}
            >
              Current Price
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "right",
                borderBottom: "1px solid #ddd",
              }}
            >
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {holdingsData.map((holding, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "12px" }}>{holding.name}</td>
              <td style={{ padding: "12px", textAlign: "right" }}>
                {holding.quantity.toLocaleString()}
              </td>
              <td style={{ padding: "12px", textAlign: "right" }}>
                {formatCurrency(holding.avgPrice)}
              </td>
              <td style={{ padding: "12px", textAlign: "right" }}>
                {formatCurrency(holding.currentPrice)}
              </td>
              <td style={{ padding: "12px", textAlign: "right" }}>
                {formatCurrency(holding.quantity * holding.currentPrice)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50 sticky bottom-0 ">
          <tr>
            <td
              colSpan={4}
              className="px-6 py-3 text-right font-medium text-gray-500"
            >
              Total Value
            </td>
            <td className="px-6 py-3 font-medium text-gray-900">
              {formatCurrency(totalValue)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default HoldingsTable;
