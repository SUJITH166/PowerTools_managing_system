import React, { useState, useContext } from "react";
import "./InShop.css";
import Modal from "../Modal/Modal";
import { ToolContext } from "../../context/ToolContext";
import { useNavigate } from "react-router-dom";

const InShop = () => {
  const [tools, setTools] = useState([
    { id: 1, name: "Hammer", quantity: 5, total: 20 },
    { id: 2, name: "Screwdriver", quantity: 10, total: 20 },
    { id: 3, name: "Wrench", quantity: 7, total: 20 },
  ]);
  const { setNotInShopData } = useContext(ToolContext);
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    quantity: "",
    extra: "",
    item:"",
  });

  const handlePlusClick = (tool) => {
    setActiveTool(tool);
    setFormData({ name: "", number: "", quantity: "1", extra: "" ,item:tool.name});
  };

  const handleCloseModal = () => {
    setActiveTool(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newData = {
      name: formData.name,
      number: formData.number,
      quantity: formData.quantity,
      extra: formData.extra,
      item:formData.item,
    };

    setNotInShopData((prev) => [...prev, newData]);

    navigate("/PowerTools/NotInShop");
  };
  //   console.log("Form submitted for tool:", activeTool.name, formData);
  //   handleCloseModal();
  // };

  return (
    <div className="in-shop-wrapper">
      <h1>IN SHOP</h1>
      <div className="in-shop-main">
        {tools.map((item) => (
          <div className="in-shop-tool" key={item.id}>
            <span className="tool-name">{item.name}</span>
            <span className="tool-quantity">
              {item.quantity}/{item.total}
            </span>
            <button className="tool-btn" onClick={() => handlePlusClick(item)}>
              +
            </button>
          </div>
        ))}
      </div>

      {activeTool && (
        <Modal onClose={handleCloseModal}>
          <h2>Add Info for {activeTool.name}</h2>
          <form className="tool-form" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="number"
              placeholder="Phone Number"
              value={formData.number}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="extra"
              placeholder="Extra info"
              value={formData.extra}
              onChange={handleInputChange}
            />
            <div className="button-row">
              <button
                type="button"
                className="close-btn"
                onClick={handleCloseModal}
              >
                Close
              </button>

              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default InShop;
