import { useLocation, useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navItems = [
    { label: "Holdings", path: "/holdings" },
    { label: "Orderbook", path: "/orderbook" },
    { label: "Positions", path: "/positions" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md flex justify-around py-2 z-50">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center text-xs ${
            pathname === item.path
              ? "text-blue-600 font-medium"
              : "text-gray-500"
          }`}
        >
          <span className="mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
