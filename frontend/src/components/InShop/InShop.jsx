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
  const [showModel, setShowModel] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    quantity: "1",
    extra: "",
    items: [], // initialize as empty array
  });

  const handlePlusClick = (tool) => {
    setActiveTool(tool);
    setFormData({
      name: "",
      number: "",
      quantity: "1",
      extra: "",
      items: [
        {
          product: tool.name,
          quantity: 1,
        },
      ],
    });
    setShowModel(true);
  };

  const handleCloseModal = () => {
    setShowModel(false);
    setActiveTool(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "quantity") {
      // update quantity inside items array
      setFormData((prev) => ({
        ...prev,
        quantity: value,
        items: prev.items.map((item) => ({
          ...item,
          quantity: Number(value),
        })),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(formData.number)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    const res = await fetch(`${process.env.REACT_APP_API_URL}/tool/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.success) {
      setShowModel(false);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

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

      {showModel && activeTool && (
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
              required
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
              <button type="button" className="close-btn" onClick={handleCloseModal}>
                Close
              </button>

              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}

      {showPopup && <div className="popup-class">Saved Successfully!</div>}
    </div>
  );
};

export default InShop;
