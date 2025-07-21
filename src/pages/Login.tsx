import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Hardcoded broker options
const BROKERS = [
  { id: "zerodha", name: "Zerodha" },
  { id: "upstox", name: "Upstox" },
  { id: "angel", name: "Angel One" },
  { id: "icici", name: "ICICI Direct" },
];

// Simulated backend login function
function mockLogin(_broker: string, phone: string): Promise<{ status: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (phone === "500") {
        resolve({ status: 500 });
      } else if (phone === "400" || phone.length !== 10) {
        resolve({ status: 400 });
      } else {
        resolve({ status: 200 });
      }
    }, 700);
  });
}

const Login = () => {
  const [selectedBroker, setSelectedBroker] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBrokerSelect = (brokerId: string) => {
    setSelectedBroker(brokerId);
    setError("");
    setPhone("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await mockLogin(selectedBroker!, phone);
    setLoading(false);
    if (res.status === 200) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/holdings");
    } else if (res.status === 400) {
      setError(
        "Invalid credentials. Please check your phone number and try again.",
      );
    } else if (res.status === 500) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        {!selectedBroker ? (
          <>
            <h2 className="text-xl font-bold mb-4">Select Your Broker</h2>
            <div className="grid gap-3">
              {BROKERS.map((broker) => (
                <button
                  key={broker.id}
                  onClick={() => handleBrokerSelect(broker.id)}
                  className="w-full p-3 border rounded hover:bg-blue-50 text-left font-medium"
                >
                  {broker.name}
                </button>
              ))}
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <button
              type="button"
              onClick={() => setSelectedBroker(null)}
              className="text-blue-600 text-sm mb-2 hover:underline"
            >
              ← Change Broker
            </button>
            <h2 className="text-xl font-bold mb-4">
              Login to {BROKERS.find((b) => b.id === selectedBroker)?.name}
            </h2>
            <input
              type="number"
              pattern="[0-9]*"
              autoFocus
              inputMode="numeric"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full p-2 border rounded mb-4"
              disabled={loading}
            />
            {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
