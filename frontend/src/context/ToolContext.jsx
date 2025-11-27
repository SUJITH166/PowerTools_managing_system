import React, { createContext, useState, useEffect } from "react";

export const ToolContext = createContext();

export const ToolProvider = ({ children }) => {

  // Load saved data from localStorage (if available)
  const [notInShopData, setNotInShopData] = useState(() => {
    const saved = localStorage.getItem("notInShopData");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("notInShopData", JSON.stringify(notInShopData));
  }, [notInShopData]);
   
  const deleteItem = (index) => {
    setNotInShopData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ToolContext.Provider value={{ notInShopData, setNotInShopData,deleteItem }}>
      {children}
    </ToolContext.Provider>
  );
};
