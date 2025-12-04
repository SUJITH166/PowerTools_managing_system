import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SheetJacky from "./components/SheetJacky";
import PowerTools from "./components/PowerTools";
import InShop from "./components/InShop/InShop";
import NotInShop from "./components/NotInShop/NotInShop";
import "./App.css";
import SheetShop from "./components/SheetShop/SheetShop";
import NotInSheetShop from "./components/NotInSheetShop/NotInSheetShop";

const App = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="main">
        <div className="top-buttons">
          <button onClick={() => navigate("/SheetJacky")}>Sheet & Jacky</button>
          <button onClick={() => navigate("/PowerTools")}>PowerTools</button>
        </div>
      </div>

      <div className="content">
        <Routes>
          <Route path="/SheetJacky" element={<SheetJacky />}>
            <Route index element={<SheetShop />} />
            <Route path="SheetShop" element={<SheetShop />} />
            <Route path="NotInSheetShop" element={<NotInSheetShop />} />
          </Route>
          <Route path="/PowerTools" element={<PowerTools />}>
            <Route index element={<InShop />} />
            <Route path="InShop" element={<InShop />} />
            <Route path="NotInShop" element={<NotInShop />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
