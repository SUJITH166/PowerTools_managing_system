import React from "react";
import "./PowerTools.css";
import { useNavigate , Outlet, Route } from "react-router-dom";
// import InShop from "./InShop/InShop";
// import NotInShop from "./NotInShop/NotInShop";
const PowerTools = () => {
  const content = [
    {
      id: 1,
      name: "In-Shop",
      route:"InShop"
    },
    {
      id: 2,
      name: "Not-In-shop",
      route:"NotInShop"

    },
  ];
  const navigate = useNavigate();
  const handlecontent = (route) => {
   navigate(route);
  };

  return (
    <div className="power-wrapper">
      <h1>Powertools Page</h1>

      <div className="power-container">
        {content.map((item) => (
          <button
            key={item.id}
            onClick={() => handlecontent(item.route)}
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
