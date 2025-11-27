import React from "react";
import "./PowerTools.css";
import { useNavigate , Outlet } from "react-router-dom";
// import InShop from "./InShop/InShop";
// import NotInShop from "./NotInShop/NotInShop";
const PowerTools = () => {
  const content = [
    {
      id: 1,
      name: "In-Shop",
    },
    {
      id: 2,
      name: "Not-In-shop",
    },
  ];
  const navigate = useNavigate();
  const handlecontent = (id) => {
    if (id === 1) {
      navigate("InShop");
    } else if (id === 2) {
      navigate("NotInShop");
    }
  };

  return (
    <div className="power-wrapper">
      <h1>Powertools page</h1>

      <div className="power-container">
        {content.map((item) => (
          <button
            key={item.id}
            onClick={() => handlecontent(item.id)}
            className="powertoolbtn"
          >
            {item.name}
          </button>
        ))}
      </div>
    <Outlet />
    </div>
  );
};

export default PowerTools;
