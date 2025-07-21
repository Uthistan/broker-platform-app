import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Holdings from "./Holdings";
import Login from "./Login";
import BottomNav from "../components/BottomNav";
import Orderbook from "./Orderbook";
import Positions from "./Positions";
import FloatingActionButton from "../components/FloatingActionButton";
import OrderPadModal from "../components/OrderPadModal";
import { useHoldings } from "../context/useHoldings";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isLoginPage = location.pathname === "/";
  const [modalState, setModalState] = useState({
    isOpen: false,
    action: "buy" as "buy" | "sell",
    symbol: "",
  });
  const openModal = (action: "buy" | "sell", symbol: string) => {
    setModalState({ isOpen: true, action, symbol });
  };
  const closeModal = () => {
    setModalState((prevState) => ({ ...prevState, isOpen: false }));
  };
  const handleSymbolChange = (symbol: string) => {
    setModalState((prevState) => ({ ...prevState, symbol }));
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/holdings"
          element={
            <ProtectedRoute>
              <Holdings openModal={openModal} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orderbook"
          element={
            <ProtectedRoute>
              <Orderbook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/positions"
          element={
            <ProtectedRoute>
              <Positions />
            </ProtectedRoute>
          }
        />
      </Routes>
      {isLoggedIn && !isLoginPage && <BottomNav />}
      {isLoggedIn && !isLoginPage && !modalState.isOpen && (
        <FloatingActionButton openModal={openModal} />
      )}
      <OrderPadModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        action={modalState.action}
        symbol={modalState.symbol}
        symbols={useHoldings().symbols}
        onSymbolChange={handleSymbolChange}
        onActionChange={(a) =>
          setModalState((prev) => ({ ...prev, action: a }))
        }
      />
    </>
  );
};

export default AppRoutes; 