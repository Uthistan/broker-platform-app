import React, { useState, useRef } from "react";
import { useHoldings } from "../context/useHoldings";

const getFirstSymbolAlphabetically = (symbols: string[]) => {
  return symbols.length > 0 ? symbols[0] : "";
};

const getInitialPosition = () => {
  if (typeof window !== "undefined") {
    const x = window.innerWidth - 120; // Spacing from right
    const y = window.innerHeight - 110;
    return { x, y };
  }
  return { x: 20, y: 400 };
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

interface FloatingActionButtonProps {
  openModal: (action: "buy" | "sell", symbol: string) => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  openModal,
}) => {
  const { symbols } = useHoldings();
  const [position, setPosition] = useState(getInitialPosition());
  const dragRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [lastAction] = useState<"buy" | "sell">("buy");

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  React.useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (dragging) {
        const fabSize = 56; // w-14
        const minX = 8;
        const minY = 8;
        const maxX = window.innerWidth - 100;
        const maxY = window.innerHeight - fabSize - 8;
        setPosition({
          x: clamp(e.clientX - offset.x, minX, maxX),
          y: clamp(e.clientY - offset.y, minY, maxY),
        });
      }
    }
    function handleMouseUp() {
      setDragging(false);
    }
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, offset]);

  // Reposition FAB on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setPosition(getInitialPosition());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFabClick = () => {
    const symbol = getFirstSymbolAlphabetically(symbols);
    openModal(lastAction, symbol);
  };

  return (
    <div
      ref={dragRef}
      onMouseDown={handleMouseDown}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 100,
        cursor: dragging ? "grabbing" : "grab",
      }}
      className="flex flex-col items-center"
    >
      <button
        className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-lg flex items-center justify-center text-base hover:bg-blue-700"
        onClick={handleFabClick}
      >
        Select
      </button>
    </div>
  );
};

export default FloatingActionButton;
